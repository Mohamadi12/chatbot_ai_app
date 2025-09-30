import { convertToModelMessages, streamText, UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      messages: convertToModelMessages(messages),
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
