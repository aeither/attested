"use client";

import { useState } from "react";
import type { TranscriptResponse } from "youtube-transcript";
import { getYoutubeTranscript } from "../actions/youtube";

export default function TranscriptForm() {
	const [url, setUrl] = useState("https://www.youtube.com/watch?v=PZ8svp68NXM");
	const [transcript, setTranscript] = useState<TranscriptResponse[]>([]);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);

		try {
			const result = await getYoutubeTranscript(url);
			setTranscript(result);
		} catch (error) {
			console.error("Failed to get transcript");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="max-w-2xl mx-auto p-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder="Enter YouTube URL"
					className="w-full p-2 border rounded"
					required
				/>
				<button
					type="submit"
					disabled={loading}
					className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
				>
					{loading ? "Loading..." : "Get Transcript"}
				</button>
			</form>

			{transcript.length > 0 && (
				<div className="mt-8 space-y-2">
					{transcript.map((entry, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={i} className="p-2 bg-gray-50 rounded">
							<p>{entry.text}</p>
							<span className="text-sm text-gray-500">
								{entry.offset}s - {entry.offset + entry.duration}s
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
