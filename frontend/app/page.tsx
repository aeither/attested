"use client";

import { CourseSidebar } from "@/components/course-sidebar";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { SidebarInset } from "@/components/ui/sidebar";
import { Progress } from "@radix-ui/react-progress";
import { Badge, BookOpen, Youtube } from "lucide-react";
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
		<>
			<CourseSidebar />
			{/* Rest of your component remains the same */}

			<SidebarInset>
				<Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

				{/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Building Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header> */}
				<div className="flex flex-1">
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
			</SidebarInset>
		</>
	);
}