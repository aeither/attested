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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const questions = [
	{
		id: 1,
		question:
			"What makes the ERC-1155 token standard unique compared to ERC-20 and ERC-721?",
		options: [
			"It only allows non-fungible tokens.",
			"It only allows fungible tokens.",
			"It supports both fungible and non-fungible tokens in a single contract.",
			"It requires multiple smart contracts for each token type.",
		],
		correctAnswer: 2,
	},
	{
		id: 2,
		question:
			'In the ERC-1155 example, what type of token is the "Thor\'s hammer"?',
		options: [
			"A fungible token",
			"A non-fungible token (NFT)",
			"A batch token",
			"A fungible and non-fungible hybrid",
		],
		correctAnswer: 1,
	},
	{
		id: 3,
		question: "What service was used in the example to host metadata on IPFS?",
		options: ["Infura", "MetaMask", "Pinata", "OpenZeppelin"],
		correctAnswer: 2,
	},
	{
		id: 4,
		question:
			'What does it mean for a token to be "soulbound" in this context?',
		options: [
			"It can only be transferred to specific addresses.",
			"It is tied to the recipient and cannot be transferred.",
			"It can be burned by any user.",
			"It has a limited lifespan and will expire.",
		],
		correctAnswer: 1,
	},
	{
		id: 5,
		question:
			"What benefit does ERC-1155 provide by supporting batch transfer and batch burning?",
		options: [
			"It allows tokens to be transferred without gas fees.",
			"It reduces the code size of the contract.",
			"It allows multiple tokens to be managed in one transaction, saving on gas fees.",
			"It increases token security during transfers.",
		],
		correctAnswer: 2,
	},
];

export default function Quiz() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showResult, setShowResult] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswer = (answerIndex: number) => {
		setSelectedAnswer(answerIndex);
		if (answerIndex === questions[currentQuestion].correctAnswer) {
			setScore(score + 1);
		}
	};

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			setSelectedAnswer(null);
		} else {
			setShowResult(true);
		}
	};

	const resetQuiz = () => {
		setCurrentQuestion(0);
		setSelectedAnswer(null);
		setShowResult(false);
		setScore(0);
	};

	return (
		<div className="container max-w-3xl mx-auto px-4 py-8">
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

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Knowledge Check</CardTitle>
							<CardDescription>
								Test your understanding of ERC-1155 tokens
							</CardDescription>
						</div>
						<div className="text-right">
							<p className="text-sm text-muted-foreground">
								Question {currentQuestion + 1} of {questions.length}
							</p>
							<Progress
								value={(currentQuestion / questions.length) * 100}
								className="w-[200px]"
							/>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{!showResult ? (
						<div className="space-y-4">
							<p className="text-lg font-medium">
								{questions[currentQuestion].question}
							</p>
							<RadioGroup
								onValueChange={(value) => handleAnswer(Number.parseInt(value))}
							>
								{questions[currentQuestion].options.map((option, index) => (
									<div key={index} className="flex items-center space-x-2">
										<RadioGroupItem
											value={index.toString()}
											id={`option-${index}`}
											checked={selectedAnswer === index}
										/>
										<Label
											htmlFor={`option-${index}`}
											className="flex-grow p-4 cursor-pointer"
										>
											{option}
										</Label>
										{selectedAnswer === index &&
											(index === questions[currentQuestion].correctAnswer ? (
												<CheckCircle className="w-5 h-5 text-green-500" />
											) : (
												<XCircle className="w-5 h-5 text-red-500" />
											))}
									</div>
								))}
							</RadioGroup>
						</div>
					) : (
						<div className="text-center space-y-4">
							<h3 className="text-2xl font-bold">Quiz Complete!</h3>
							<p className="text-xl">
								Your score: {score} out of {questions.length}
							</p>
							<p className="text-muted-foreground">
								{score === questions.length
									? "Perfect score! Great job!"
									: "Keep learning and try again!"}
							</p>
						</div>
					)}
				</CardContent>
				<CardFooter className="flex justify-end">
					{!showResult ? (
						<Button onClick={handleNext} disabled={selectedAnswer === null}>
							{currentQuestion === questions.length - 1 ? "Finish" : "Next"}
							<ArrowRight className="ml-2 w-4 h-4" />
						</Button>
					) : (
						<>
							<div className="flex flex-row gap-2">
								<a href="/attest">
									<Button>Open Review</Button>
								</a>

								<Button onClick={resetQuiz}>Try Again</Button>
							</div>
						</>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
