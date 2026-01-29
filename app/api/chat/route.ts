import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    // Get API key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'GROQ_API_KEY not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const groq = createGroq({ apiKey });

    // Load system prompt
    let systemPromptContent = 'You are a helpful AI assistant for Prashant Choudhary\'s portfolio.';
    try {
      const promptPath = path.join(process.cwd(), 'data', 'system_prompt.json');
      const promptData = await fs.readFile(promptPath, 'utf8');
      const systemPrompt = JSON.parse(promptData);
      systemPromptContent = systemPrompt.content;
    } catch {
      // Use default prompt if file not found
    }

    // Format messages - handle both AI SDK 5.0 parts format and legacy content format
    const formattedMessages = (messages || []).map((msg: any) => {
      let content = '';

      // AI SDK 5.0 uses 'parts' array
      if (msg.parts && Array.isArray(msg.parts)) {
        content = msg.parts
          .filter((part: any) => part.type === 'text')
          .map((part: any) => part.text)
          .join('');
      } else if (typeof msg.content === 'string') {
        // Legacy format
        content = msg.content;
      }

      return {
        role: msg.role as 'user' | 'assistant' | 'system',
        content,
      };
    });

    // Use model from request body or default to llama-3.3-70b-versatile
    const modelId = body.model || 'llama-3.3-70b-versatile';

    const result = await streamText({
      model: groq(modelId),
      system: systemPromptContent,
      messages: formattedMessages,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
