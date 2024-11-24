"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BookOpen, Search, Youtube } from "lucide-react";
import { useState } from "react";

// Mock data for skills
const skills = [
	{
		id: 1,
		name: "React Basics",
		category: "Web Development",
		difficulty: "Beginner",
		progress: 30,
		youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
	{
		id: 2,
		name: "Machine Learning Fundamentals",
		category: "Data Science",
		difficulty: "Intermediate",
		progress: 50,
		youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
	{
		id: 3,
		name: "Advanced JavaScript",
		category: "Web Development",
		difficulty: "Advanced",
		progress: 70,
		youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
	{
		id: 4,
		name: "UX Design Principles",
		category: "Design",
		difficulty: "Beginner",
		progress: 20,
		youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
	{
		id: 5,
		name: "Cloud Computing Essentials",
		category: "DevOps",
		difficulty: "Intermediate",
		progress: 40,
		youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
];

export default function SkillsDiscoveryPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedDifficulty, setSelectedDifficulty] = useState("all");

	const filteredSkills = skills.filter(
		(skill) =>
			skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(selectedCategory === "all" ||
				skill.category.toLowerCase().replace(" ", "-") === selectedCategory) &&
			(selectedDifficulty === "all" ||
				skill.difficulty.toLowerCase() === selectedDifficulty),
	);

	return (
		<div className="flex flex-col h-screen">
			<header className="bg-[#151BEA] text-primary-foreground p-4">
				<div className="container mx-auto flex items-center justify-between">
					<h1 className="text-2xl font-bold text-[#00EEBD]">AttestEd</h1>

					<div className="flex flex-row gap-2">
						<div className="relative w-1/3">
							<Input
								type="search"
								placeholder="Search skills..."
								className="pl-10 text-white"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
						</div>
						<Button>Connect Wallet</Button>
					</div>
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden">
				<aside className="w-64 bg-muted p-4 overflow-y-auto">
					<h2 className="font-semibold mb-2">Categories</h2>
					<Select onValueChange={setSelectedCategory} value={selectedCategory}>
						<SelectTrigger>
							<SelectValue placeholder="Select category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							<SelectItem value="web-development">Web Development</SelectItem>
							<SelectItem value="data-science">Data Science</SelectItem>
							<SelectItem value="design">Design</SelectItem>
							<SelectItem value="devops">DevOps</SelectItem>
						</SelectContent>
					</Select>

					<h2 className="font-semibold mt-4 mb-2">Difficulty</h2>
					<Select
						onValueChange={setSelectedDifficulty}
						value={selectedDifficulty}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select difficulty" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Levels</SelectItem>
							<SelectItem value="beginner">Beginner</SelectItem>
							<SelectItem value="intermediate">Intermediate</SelectItem>
							<SelectItem value="advanced">Advanced</SelectItem>
						</SelectContent>
					</Select>
				</aside>

				<main className="flex-1 p-6 overflow-y-auto">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredSkills.map((skill) => (
							<div
								key={skill.id}
								className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden"
							>
								<div className="p-4">
									<h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
									<div className="flex items-center gap-2 mb-2">
										<Badge variant="secondary">{skill.category}</Badge>
										<Badge variant="outline">{skill.difficulty}</Badge>
									</div>
									<Progress value={skill.progress} className="mb-2" />
									<p className="text-sm text-muted-foreground mb-4">
										{skill.progress}% complete
									</p>
									<div className="flex items-center gap-2">
										<a href="/submit">
											<Button variant="outline" className="w-full">
												<BookOpen className="mr-2 h-4 w-4" />
												Start Learning
											</Button>
										</a>
										<Button variant="outline" size="icon" asChild>
											<a
												href={skill.youtubeUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Youtube className="h-4 w-4" />
												<span className="sr-only">Watch on YouTube</span>
											</a>
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
