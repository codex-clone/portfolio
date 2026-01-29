import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import type { BlogPost, BlogPostMeta, BlogFrontmatter, TableOfContentsItem } from './types';

const postsDirectory = path.join(process.cwd(), 'data/posts');
const draftsDirectory = path.join(process.cwd(), 'data/drafts');

// Ensure directories exist
function ensureDirectoryExists(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Get all published blog posts
export async function getAllPosts(): Promise<BlogPostMeta[]> {
    ensureDirectoryExists(postsDirectory);

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = await Promise.all(
        fileNames
            .filter((fileName) => fileName.endsWith('.md'))
            .map(async (fileName) => {
                const slug = fileName.replace(/\.md$/, '');
                const post = await getPostBySlug(slug);
                return post;
            })
    );

    // Filter published posts and sort by date
    return posts
        .filter((post): post is BlogPost => {
            if (!post || !post.published) return false;
            // Check if post is scheduled for future
            const postDate = new Date(post.date);
            const now = new Date();
            return postDate <= now;
        })
        .map(({ content, ...meta }) => meta)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get all posts including drafts (for admin)
export async function getAllPostsWithDrafts(): Promise<BlogPostMeta[]> {
    ensureDirectoryExists(postsDirectory);
    ensureDirectoryExists(draftsDirectory);

    const publishedFiles = fs.existsSync(postsDirectory)
        ? fs.readdirSync(postsDirectory).map(f => ({ file: f, isDraft: false }))
        : [];

    const draftFiles = fs.existsSync(draftsDirectory)
        ? fs.readdirSync(draftsDirectory).map(f => ({ file: f, isDraft: true }))
        : [];

    const allFiles = [...publishedFiles, ...draftFiles];

    const posts = await Promise.all(
        allFiles
            .filter(({ file }) => file.endsWith('.md'))
            .map(async ({ file, isDraft }) => {
                const slug = file.replace(/\.md$/, '');
                const post = await getPostBySlug(slug, isDraft);
                return post;
            })
    );

    return posts
        .filter((post): post is BlogPost => post !== null)
        .map(({ content, ...meta }) => meta)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single post by slug
export async function getPostBySlug(slug: string, isDraft = false): Promise<BlogPost | null> {
    try {
        const directory = isDraft ? draftsDirectory : postsDirectory;
        const fullPath = path.join(directory, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            // Try the other directory if not found
            const altDirectory = isDraft ? postsDirectory : draftsDirectory;
            const altPath = path.join(altDirectory, `${slug}.md`);
            if (fs.existsSync(altPath)) {
                return getPostBySlug(slug, !isDraft);
            }
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const frontmatter = data as BlogFrontmatter;

        // Calculate reading time if not provided
        const readingTime = frontmatter.readingTime || calculateReadingTime(content);

        // Process markdown to HTML
        const processedContent = await remark()
            .use(remarkGfm)
            .use(html, { sanitize: false })
            .process(content);

        return {
            slug,
            title: frontmatter.title,
            date: frontmatter.date,
            author: frontmatter.author,
            excerpt: frontmatter.excerpt,
            tags: frontmatter.tags || [],
            published: frontmatter.published,
            image: frontmatter.image,
            readingTime,
            content: processedContent.toString(),
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

// Get raw markdown content (for editor)
export function getRawPostContent(slug: string, isDraft = false): string | null {
    try {
        const directory = isDraft ? draftsDirectory : postsDirectory;
        const fullPath = path.join(directory, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            const altDirectory = isDraft ? postsDirectory : draftsDirectory;
            const altPath = path.join(altDirectory, `${slug}.md`);
            if (fs.existsSync(altPath)) {
                return fs.readFileSync(altPath, 'utf8');
            }
            return null;
        }

        return fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
        console.error(`Error reading raw post ${slug}:`, error);
        return null;
    }
}

// Save a post
export function savePost(slug: string, content: string, isDraft = false): boolean {
    try {
        const directory = isDraft ? draftsDirectory : postsDirectory;
        ensureDirectoryExists(directory);

        const fullPath = path.join(directory, `${slug}.md`);
        fs.writeFileSync(fullPath, content, 'utf8');

        // If publishing, remove from drafts
        if (!isDraft) {
            const draftPath = path.join(draftsDirectory, `${slug}.md`);
            if (fs.existsSync(draftPath)) {
                fs.unlinkSync(draftPath);
            }
        }

        return true;
    } catch (error) {
        console.error(`Error saving post ${slug}:`, error);
        return false;
    }
}

// Delete a post
export function deletePost(slug: string): boolean {
    try {
        const postPath = path.join(postsDirectory, `${slug}.md`);
        const draftPath = path.join(draftsDirectory, `${slug}.md`);

        if (fs.existsSync(postPath)) {
            fs.unlinkSync(postPath);
        }
        if (fs.existsSync(draftPath)) {
            fs.unlinkSync(draftPath);
        }

        return true;
    } catch (error) {
        console.error(`Error deleting post ${slug}:`, error);
        return false;
    }
}

// Calculate reading time
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

// Extract table of contents from HTML content
export function extractTableOfContents(htmlContent: string): TableOfContentsItem[] {
    const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[1-6]>/g;
    const toc: TableOfContentsItem[] = [];

    let match;
    while ((match = headingRegex.exec(htmlContent)) !== null) {
        toc.push({
            level: parseInt(match[1]),
            id: match[2],
            text: match[3],
        });
    }

    return toc;
}

// Generate slug from title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
    const posts = await getAllPosts();
    const tags = new Set<string>();

    posts.forEach((post) => {
        post.tags.forEach((tag) => tags.add(tag));
    });

    return Array.from(tags).sort();
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
    const posts = await getAllPosts();
    return posts.filter((post) => post.tags.includes(tag));
}

// Format date for display
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Get adjacent posts (previous and next)
export async function getAdjacentPosts(slug: string): Promise<{
    previous: BlogPostMeta | null;
    next: BlogPostMeta | null;
}> {
    const posts = await getAllPosts();
    const currentIndex = posts.findIndex((post) => post.slug === slug);

    return {
        previous: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
        next: currentIndex > 0 ? posts[currentIndex - 1] : null,
    };
}
