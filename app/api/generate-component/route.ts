// @ts-nocheck
import { createOpenAI } from "@ai-sdk/openai";
import { streamObject } from 'ai';
import { z } from 'zod';

const openai = createOpenAI({
    apiKey: "",
});

export const artifactResponseSchema = z.object({
    artifact: z.string().describe('Only the react code for the artifact, no other text or comments, include imports, use inline styles and generate mock data'),
    message: z.string().describe('Message describing the artifact and the user\'s request as well as the reasoning behind the artifact. Do not use emojis or links.'),
})

const systemPrompt = `You are an expert UI developer specializing in React, TypeScript, and Tailwind CSS. 
When asked to create components or pages:
1. Generate clean, modern, and accessible code
2. Use TypeScript for type safety
3. Implement responsive design using Tailwind CSS
4. Follow React best practices and hooks
5. Include proper prop types and interfaces
6. Add helpful comments for complex logic
7. Ensure components are reusable and maintainable

Always structure your response as valid TypeScript/React code that can be directly used.`;

export async function POST(req: Request) {
    const context = await req.json();

    const result = streamObject({
        model: openai('gpt-4-turbo'),
        schema: artifactResponseSchema,
        prompt: `Generate 3 notifications for a messages app in this context: ${context}`,
    });

    return result.toTextStreamResponse();
}