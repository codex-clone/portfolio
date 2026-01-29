import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/blog/utils';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: Props) {
    try {
        const { slug } = await params;
        const post = await getPostBySlug(slug);

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json(
            { error: 'Failed to fetch post' },
            { status: 500 }
        );
    }
}
