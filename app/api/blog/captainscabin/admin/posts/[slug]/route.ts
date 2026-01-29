import { NextResponse } from 'next/server';
import { getPostBySlug, deletePost, getRawPostContent } from '@/lib/blog/utils';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: Props) {
    try {
        const { slug } = await params;
        const content = getRawPostContent(slug) || getRawPostContent(slug, true);

        if (!content) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ slug, content });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json(
            { error: 'Failed to fetch post' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: Props) {
    try {
        const { slug } = await params;
        const success = deletePost(slug);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            throw new Error('Failed to delete post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { error: 'Failed to delete post' },
            { status: 500 }
        );
    }
}
