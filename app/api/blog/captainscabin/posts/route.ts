import { NextResponse } from 'next/server';
import { savePost, getAllPostsWithDrafts } from '@/lib/blog/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const posts = await getAllPostsWithDrafts();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching captain logs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch the logs, Captain.' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { slug, content, isDraft } = await req.json();

        if (!slug || !content) {
            return NextResponse.json(
                { error: 'Coordinates (slug) and Log Data (content) are required!' },
                { status: 400 }
            );
        }

        const success = savePost(slug, content, isDraft);

        if (success) {
            return NextResponse.json({ success: true, slug });
        } else {
            throw new Error('Failed to save to the archives.');
        }
    } catch (error) {
        console.error('Error recording log entry:', error);
        return NextResponse.json(
            { error: 'Failed to record the log entry.' },
            { status: 500 }
        );
    }
}
