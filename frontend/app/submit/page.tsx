"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Eye, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock data for skills
const skills = [
	{ id: 1, name: "React Basics" },
	{ id: 2, name: "Machine Learning Fundamentals" },
	{ id: 3, name: "Advanced JavaScript" },
	{ id: 4, name: "UX Design Principles" },
	{ id: 5, name: "Cloud Computing Essentials" },
];

// Extracted SubmissionForm component
const SubmissionForm = ({
	selectedSkill,
	setSelectedSkill,
	description,
	setDescription,
	link,
	setLink,
	file,
	setFile,
	setPreviewMode,
	handleSubmit,
}: {
	selectedSkill: string;
	setSelectedSkill: (skill: string) => void;
	description: string;
	setDescription: (desc: string) => void;
	link: string;
	setLink: (link: string) => void;
	file: File | null;
	setFile: (file: File | null) => void;
	setPreviewMode: (mode: boolean) => void;
	handleSubmit: (event: React.FormEvent) => void;
}) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.[0]) {
			setFile(event.target.files[0]);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="skill">Skill</Label>
				<Select value={selectedSkill} onValueChange={setSelectedSkill}>
					<SelectTrigger id="skill">
						<SelectValue placeholder="Select a skill" />
					</SelectTrigger>
					<SelectContent>
						{skills.map((skill) => (
							<SelectItem key={skill.id} value={skill.name}>
								{skill.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-2">
				<Label htmlFor="description">Description of Achievement/Learning</Label>
				<Textarea
					id="description"
					placeholder="Describe what you've learned and how you've applied it..."
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="min-h-[100px]"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="file">Upload File (Project/Code/Demo)</Label>
				<Input
					id="file"
					type="file"
					onChange={handleFileChange}
					className="cursor-pointer"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="link">Link to Project/Demo</Label>
				<Input
					id="link"
					type="url"
					placeholder="https://example.com/your-project"
					value={link}
					onChange={(e) => setLink(e.target.value)}
				/>
			</div>

			<div className="flex justify-between">
				<Button
					type="button"
					variant="outline"
					onClick={() => setPreviewMode(true)}
				>
					<Eye className="mr-2 h-4 w-4" />
					Preview
				</Button>
				<Button type="submit">
					<CheckCircle className="mr-2 h-4 w-4" />
					Submit
				</Button>
			</div>
		</form>
	);
};

// Extracted SubmissionPreview component
const SubmissionPreview = ({
	selectedSkill,
	description,
	file,
	link,
	setPreviewMode,
	handleSubmit,
}: {
	selectedSkill: string;
	description: string;
	file: File | null;
	link: string;
	setPreviewMode: (mode: boolean) => void;
	handleSubmit: (event: React.FormEvent) => void;
}) => (
	<Card>
		<CardHeader>
			<CardTitle>Submission Preview</CardTitle>
			<CardDescription>Review your submission before sending</CardDescription>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<span className="font-semibold">Skill:</span> {selectedSkill}
			</div>
			<div>
				<span className="font-semibold">Description:</span>
				<p className="mt-1">{description}</p>
			</div>
			<div>
				<span className="font-semibold">File:</span>{" "}
				{file ? file.name : "No file uploaded"}
			</div>
			<div>
				<span className="font-semibold">Link:</span>{" "}
				{link || "No link provided"}
			</div>
		</CardContent>
		<CardFooter className="justify-between">
			<Button variant="outline" onClick={() => setPreviewMode(false)}>
				<X className="mr-2 h-4 w-4" />
				Edit
			</Button>
			<Button onClick={handleSubmit}>
				<CheckCircle className="mr-2 h-4 w-4" />
				Confirm & Submit
			</Button>
		</CardFooter>
	</Card>
);

export default function SkillSubmissionPage() {
	const [selectedSkill, setSelectedSkill] = useState("");
	const [description, setDescription] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [link, setLink] = useState("");
	const [previewMode, setPreviewMode] = useState(false);
	const router = useRouter();

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const params = new URLSearchParams({
			skill: selectedSkill,
			description: description,
		});
		router.push(`/quiz?${params.toString()}`);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Submit Your Skill Achievement</h1>

			<Alert className="mb-6">
				<Upload className="h-4 w-4" />
				<AlertTitle>Submission Guidelines</AlertTitle>
				<AlertDescription>
					<ul className="list-disc list-inside">
						<li>Choose the skill you want to submit proof for</li>
						<li>
							Provide a detailed description of what you've learned and how
							you've applied it
						</li>
						<li>
							Upload relevant files (code, projects, or demos) or provide a link
							to your work
						</li>
						<li>
							Ensure your submission clearly demonstrates your proficiency in
							the chosen skill
						</li>
						<li>
							Review your submission in the preview before final submission
						</li>
					</ul>
				</AlertDescription>
			</Alert>

			{previewMode ? (
				<SubmissionPreview
					selectedSkill={selectedSkill}
					description={description}
					file={file}
					link={link}
					setPreviewMode={setPreviewMode}
					handleSubmit={handleSubmit}
				/>
			) : (
				<SubmissionForm
					selectedSkill={selectedSkill}
					setSelectedSkill={setSelectedSkill}
					description={description}
					setDescription={setDescription}
					link={link}
					setLink={setLink}
					file={file}
					setFile={setFile}
					setPreviewMode={setPreviewMode}
					handleSubmit={handleSubmit}
				/>
			)}
		</div>
	);
}
