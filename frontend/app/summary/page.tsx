"use client";

import Quiz from "@/components/quiz";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { questionsSchema } from "@/lib/schemas";
import { experimental_useObject } from "ai/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { generateQuizTitle } from "../actions/ai";

export default function ChatWithText() {
	const [text, setText] = useState<string>("");
	const [questions, setQuestions] = useState<z.infer<typeof questionsSchema>>(
		[],
	);
	const [title, setTitle] = useState<string>();

	const {
		submit,
		object: partialQuestions,
		isLoading,
	} = experimental_useObject({
		api: "/api/generate-quiz",
		schema: questionsSchema,
		initialValue: undefined,
		onError: (error) => {
			toast.error("Failed to generate quiz. Please try again.");
			setText("");
		},
		onFinish: ({ object }) => {
			setQuestions(object ?? []);
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!text.trim()) {
			toast.error("Please enter some text");
			return;
		}
		submit({ text });
		const generatedTitle = await generateQuizTitle("Custom Quiz");
		setTitle(generatedTitle);
	};

	const clearText = () => {
		setText("");
		setQuestions([]);
	};

	const progress = partialQuestions ? (partialQuestions.length / 4) * 100 : 0;

	if (questions.length === 4) {
		return (
			<Quiz
				title={title ?? "Quiz"}
				questions={questions}
				clearPDF={clearText}
			/>
		);
	}

	return (
		<div className="min-h-[100dvh] w-full flex justify-center">
			<Card className="w-full max-w-md h-full border-0 sm:border sm:h-fit mt-12">
				<CardHeader className="text-center space-y-6">
					<div className="mx-auto flex items-center justify-center space-x-2 text-muted-foreground">
						Lesson
					</div>
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
		</div>
	);
}