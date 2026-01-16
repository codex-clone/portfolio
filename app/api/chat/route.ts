import { streamText, convertToCoreMessages } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const groq = createGroq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json();

    const promptPath = path.join(process.cwd(), 'data', 'system_prompt.json');
    const promptData = await fs.readFile(promptPath, 'utf8');
    const systemPrompt = JSON.parse(promptData);

    // convertToCoreMessages is still the correct utility for now, ignoring deprecation warning unless build fails
    const coreMessages = convertToCoreMessages(messages);

    const result = streamText({
      model: groq(model || 'llama-3.3-70b-versatile'),
      system: systemPrompt.content,
      messages: coreMessages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

