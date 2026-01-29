import { NextResponse } from 'next/server';
import { savePost, getAllPostsWithDrafts } from '@/lib/blog/utils';

export async function GET() {
    try {
        const posts = await getAllPostsWithDrafts();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { slug, content, isDraft } = await req.json();

        if (!slug || !content) {
            return NextResponse.json(
                { error: 'Slug and content are required' },
                { status: 400 }
            );
        }

        const success = savePost(slug, content, isDraft);

        if (success) {
            return NextResponse.json({ success: true, slug });
        } else {
            throw new Error('Failed to save post');
        }
    } catch (error) {
        console.error('Error saving post:', error);
        return NextResponse.json(
            { error: 'Failed to save post' },
            { status: 500 }
        );
    }
}
