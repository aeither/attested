import { questionSchema } from "@/lib/schemas";
import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";

export const maxDuration = 60;

const groq = createGroq({
	baseURL: "https://api.groq.com/openai/v1",
	apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
	const { text } = await req.json();

	const result = await generateObject({
		model: groq("llama-3.3-70b-versatile"),
		messages: [
			{
				role: "system",
				content:
					"You are a teacher. Your job is to take a document, and create a multiple choice test (with 4 questions) based on the content of the document. Each option should be roughly equal in length. Create Array of 3",
			},
			{
				role: "user",
				content: [
					{
						type: "text",
						text: `Create a multiple choice test based on this text:\n\n${text}`,
					},
				],
			},
		],
		output: 'array',
		schema: questionSchema,
	});

	return result.toJsonResponse();
}
