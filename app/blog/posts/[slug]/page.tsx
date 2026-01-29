import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/blog/utils";
import BlogPostClient from "./BlogPostClient";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: `${post.title} | Prashant Choudhary`,
        description: post.excerpt,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            url: `/blog/posts/${slug}`,
            publishedTime: post.date,
            authors: [post.author],
            images: post.image ? [{ url: post.image }] : [],
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.image ? [post.image] : [],
        },
        keywords: post.tags,
    };
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post || !post.published) {
        notFound();
    }

    const adjacentPosts = await getAdjacentPosts(slug);

    return (
        <BlogPostClient
            post={post}
            previousPost={adjacentPosts.previous}
            nextPost={adjacentPosts.next}
        />
    );
}
