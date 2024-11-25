"use server";

import { YoutubeTranscript } from "youtube-transcript";

export async function getYoutubeTranscript(url: string) {
	try {
		const transcript = await YoutubeTranscript.fetchTranscript(url);
		return transcript;
	} catch (error) {
		throw new Error("Failed to fetch transcript");
	}
}
