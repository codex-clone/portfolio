import { NextResponse } from 'next/server';
import { deletePost, getRawPostContent } from '@/lib/blog/utils';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: Props) {
    try {
        const { slug } = await params;
        // Try getting content, checking both drafts and published
        const content = getRawPostContent(slug) || getRawPostContent(slug, true);

        if (!content) {
            return NextResponse.json(
                { error: 'Log entry not found in the archives.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ slug, content });
    } catch (error) {
        console.error('Error retrieving log entry:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve the log entry.' },
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
            throw new Error('Failed to eject log entry.');
        }
    } catch (error) {
        console.error('Error ejecting log entry:', error);
        return NextResponse.json(
            { error: 'Failed to eject the log entry.' },
            { status: 500 }
        );
    }
}
