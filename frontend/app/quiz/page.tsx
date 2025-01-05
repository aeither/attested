"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import type { questionsSchema } from "@/lib/schemas";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { generateQuizTitle } from "../actions/ai";

const Quiz = dynamic(() => import("@/components/quiz"), {
	ssr: false,
});

export default function Page() {
  return (
    <Suspense>
      <SearchParamsComponent />
    </Suspense>
  )
}

function SearchParamsComponent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const initialDescription = searchParams.get("description") ?? "";

	const [text, setText] = useState<string>(initialDescription);
	const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>(
		[],
	);
	const [title, setTitle] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [partialQuestions, setPartialQuestions] = useState<
		z.infer<typeof questionsSchema>
	>([]);

	// Update URL when text changes
	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (text) {
			params.set("description", text);
		} else {
			params.delete("description");
		}
		router.replace(`?${params.toString()}`);
	}, [text, router, searchParams]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!text.trim()) {
			toast.error("Please enter some text");
			return;
		}

		setIsLoading(true);
		try {
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text }),
			};

			const response = await fetch("/api/generate-quiz", options);
			if (!response.ok) throw new Error("Failed to generate quiz");

			const data = await response.json();
			setQuestions(data);

			const generatedTitle = await generateQuizTitle("Custom Quiz");
			setTitle(generatedTitle);
		} catch (error) {
			console.error(error);
			toast.error("Failed to generate quiz. Please try again.");
			setText("");
		} finally {
			setIsLoading(false);
		}
	};

	const clearText = () => {
		setText("");
		setQuestions([]);
		setProgress(0);
		setPartialQuestions([]);
		router.replace(""); // Clear URL params
	};

	return (
		<div className="container max-w-3xl mx-auto px-4 py-8">
			{/* YouTube Section */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>How To Create an ERC-1155 Contract</CardTitle>
					<CardDescription>
						The Swiss Army Knife of Ethereum Tokens
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="aspect-video rounded-lg overflow-hidden bg-muted">
						<iframe
							width="100%"
							height="100%"
							src="https://www.youtube.com/embed/mM77Ta-g7Hs"
							title="How To Create an ERC-1155 Contract"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="border-0"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Quiz Section */}
			{questions.length > 0 ? (
				<Quiz
					title={title ?? "Quiz"}
					questions={questions}
					clearPDF={clearText}
				/>
			) : (
				<Card>
					<CardHeader>
						<CardTitle>Knowledge Check</CardTitle>
						<CardDescription>Test your knowledge</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<Textarea
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder="Enter your text here..."
								className="min-h-[200px] resize-none"
							/>
							<Button type="submit" className="w-full" disabled={!text.trim()}>
								{isLoading ? (
									<span className="flex items-center space-x-2">
										<Loader2 className="h-4 w-4 animate-spin" />
										<span>Generating Quiz...</span>
									</span>
								) : (
									"Generate Quiz"
								)}
							</Button>
						</form>
					</CardContent>
					{isLoading && (
						<CardFooter className="flex flex-col space-y-4">
							<div className="w-full space-y-1">
								<div className="flex justify-between text-sm text-muted-foreground">
									<span>Progress</span>
									<span>{Math.round(progress)}%</span>
								</div>
								<Progress value={progress} className="h-2" />
							</div>
							<div className="w-full space-y-2">
								<div className="grid grid-cols-6 sm:grid-cols-4 items-center space-x-2 text-sm">
									<div
										className={`h-2 w-2 rounded-full ${
											isLoading ? "bg-yellow-500/50 animate-pulse" : "bg-muted"
										}`}
									/>
									<span className="text-muted-foreground text-center col-span-4 sm:col-span-2">
										{partialQuestions
											? `Generating question ${partialQuestions.length + 1} of 4`
											: "Analyzing text content"}
									</span>
								</div>
							</div>
						</CardFooter>
					)}
				</Card>
			)}
		</div>
	);
}
