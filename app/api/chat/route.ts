import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: groq('mixtral-8x7b-32768'),
      system: `You are Prashant's AI assistant. You are knowledgeable about his portfolio, projects, skills, and experience. 
      You help visitors learn about Prashant's work as an AI/ML Engineer and Full Stack Developer.
      Be friendly, professional, and provide detailed information about his projects and expertise.
      If asked about something not in your knowledge, politely let them know and suggest they contact Prashant directly.`,
      messages,
      temperature: 0.7,
      maxTokens: 1024,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

