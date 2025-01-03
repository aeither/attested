"use server";

import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { z } from "zod";

const groq = createGroq({
	baseURL: "https://api.groq.com/openai/v1",
	apiKey: process.env.GROQ_API_KEY,
});

export const generateQuizTitle = async (file: string) => {
	const result = await generateObject({
		model: groq("llama-3.3-70b-versatile"),
		schema: z.object({
			title: z
				.string()
				.describe(
					"A max three word title for the quiz based on the file provided as context",
				),
		}),
		prompt: `Generate a title for a quiz based on the following (PDF) file name. Try and extract as much info from the file name as possible. If the file name is just numbers or incoherent, just return quiz.\n\n ${file}`,
	});
	return result.object.title;
};
