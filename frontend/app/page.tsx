"use client";

import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@radix-ui/react-progress";
import { BookOpen, Youtube } from "lucide-react";
import { useState } from "react";

const skills = [
	{
		id: 1,
		name: "React Basics",
		category: "Web Development",
		difficulty: "Beginner",
		progress: 30,
		youtubeUrl: "https://www.youtube.com/watch?v=sa8iNdA_5OU",
	},
	{
		id: 2,
		name: "Machine Learning Fundamentals",
		category: "Data Science",
		difficulty: "Intermediate",
		progress: 50,
		youtubeUrl: "https://www.youtube.com/watch?v=i_LwzRVP7bg",
	},
	{
		id: 3,
		name: "Advanced JavaScript",
		category: "Web Development",
		difficulty: "Advanced",
		progress: 70,
		youtubeUrl: "https://www.youtube.com/watch?v=EgDmCbhmstU",
	},
	{
		id: 4,
		name: "UX Design Principles",
		category: "Design",
		difficulty: "Beginner",
		progress: 20,
		youtubeUrl: "https://www.youtube.com/watch?v=IPdsFaM7HCs",
	},
	{
		id: 5,
		name: "Cloud Computing Essentials",
		category: "DevOps",
		difficulty: "Intermediate",
		progress: 40,
		youtubeUrl: "https://www.youtube.com/watch?v=FjKBzaOgriA",
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
            <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <div className="flex flex-1">
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredSkills.map((skill) => (
                            <div
                                key={skill.id}
                                className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                            >
                                <div className="p-4 flex flex-col h-full">
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="secondary">{skill.category}</Badge>
                                            <Badge variant="outline">{skill.difficulty}</Badge>
                                        </div>
                                        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-amarilloMostaza"
                                                style={{ width: `${skill.progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {skill.progress}% complete
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-auto">
                                        <a
                                            href={`/submit?course=${encodeURIComponent(skill.name)}`}
                                        >
                                            <Button variant="outline" className="w-full">
                                                <BookOpen className="mr-2 h-4 w-4" />
                                                Start Learning
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}