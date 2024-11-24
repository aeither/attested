"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
    Star,
    UserPlus
} from "lucide-react";
import { useState } from "react";

// Mock data
const reviewers = [
	{
		id: 1,
		name: "Alice Johnson",
		avatar: "/placeholder.svg?height=40&width=40",
		rating: 4.8,
		reviews: 152,
		expertise: ["React", "JavaScript"],
	},
	{
		id: 2,
		name: "Bob Smith",
		avatar: "/placeholder.svg?height=40&width=40",
		rating: 4.6,
		reviews: 98,
		expertise: ["Python", "Machine Learning"],
	},
	{
		id: 3,
		name: "Charlie Brown",
		avatar: "/placeholder.svg?height=40&width=40",
		rating: 4.9,
		reviews: 201,
		expertise: ["UX Design", "Figma"],
	},
];

const forumTopics = [
	{
		id: 1,
		title: "Best practices for React Hooks",
		author: "Alice Johnson",
		replies: 23,
		lastActivity: "2 hours ago",
	},
	{
		id: 2,
		title: "Machine Learning project ideas for beginners",
		author: "Bob Smith",
		replies: 15,
		lastActivity: "1 day ago",
	},
	{
		id: 3,
		title: "How to prepare for UX Design interviews",
		author: "Charlie Brown",
		replies: 31,
		lastActivity: "3 hours ago",
	},
];

const attestationRequests = [
	{
		id: 1,
		skill: "Advanced React",
		requester: "David Lee",
		submitted: "2023-06-25",
		reviewers: 2,
		required: 5,
	},
	{
		id: 2,
		skill: "Python for Data Science",
		requester: "Emma Watson",
		submitted: "2023-06-24",
		reviewers: 4,
		required: 5,
	},
	{
		id: 3,
		skill: "UI/UX Fundamentals",
		requester: "Frank Castle",
		submitted: "2023-06-23",
		reviewers: 1,
		required: 5,
	},
];

const leaderboard = [
	{
		rank: 1,
		name: "Alice Johnson",
		avatar: "/placeholder.svg?height=40&width=40",
		points: 1250,
	},
	{
		rank: 2,
		name: "Bob Smith",
		avatar: "/placeholder.svg?height=40&width=40",
		points: 1100,
	},
	{
		rank: 3,
		name: "Charlie Brown",
		avatar: "/placeholder.svg?height=40&width=40",
		points: 950,
	},
	{
		rank: 4,
		name: "David Lee",
		avatar: "/placeholder.svg?height=40&width=40",
		points: 800,
	},
	{
		rank: 5,
		name: "Emma Watson",
		avatar: "/placeholder.svg?height=40&width=40",
		points: 750,
	},
];

export default function CommunityConnection() {
	const [activeTab, setActiveTab] = useState("reviewers");

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Community Connection</h1>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="space-y-4"
			>
				<TabsList>
					<TabsTrigger value="reviewers">Reviewers</TabsTrigger>
					<TabsTrigger value="forums">Forums</TabsTrigger>
					<TabsTrigger value="attestations">Attestations</TabsTrigger>
					<TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
				</TabsList>

				<TabsContent value="reviewers">
					<Card>
						<CardHeader>
							<CardTitle>Top Reviewers</CardTitle>
							<CardDescription>
								Connect with our community experts
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{reviewers.map((reviewer) => (
									<div
										key={reviewer.id}
										className="flex items-center justify-between"
									>
										<div className="flex items-center space-x-4">
											<Avatar>
												<AvatarImage
													src={reviewer.avatar}
													alt={reviewer.name}
												/>
												<AvatarFallback>
													{reviewer.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div>
												<p className="font-medium">{reviewer.name}</p>
												<div className="flex items-center text-sm text-muted-foreground">
													<Star className="w-4 h-4 mr-1 fill-yellow-400 stroke-yellow-400" />
													{reviewer.rating} ({reviewer.reviews} reviews)
												</div>
											</div>
										</div>
										<div>
											{reviewer.expertise.map((skill) => (
												<Badge key={skill} variant="secondary" className="mr-1">
													{skill}
												</Badge>
											))}
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="forums">
					<Card>
						<CardHeader>
							<CardTitle>Discussion Forums</CardTitle>
							<CardDescription>
								Engage with the community on various topics
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Topic</TableHead>
										<TableHead>Author</TableHead>
										<TableHead>Replies</TableHead>
										<TableHead>Last Activity</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{forumTopics.map((topic) => (
										<TableRow key={topic.id}>
											<TableCell className="font-medium">
												{topic.title}
											</TableCell>
											<TableCell>{topic.author}</TableCell>
											<TableCell>{topic.replies}</TableCell>
											<TableCell>{topic.lastActivity}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter>
							<Button>Start a New Topic</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="attestations">
					<Card>
						<CardHeader>
							<CardTitle>Attestation Requests</CardTitle>
							<CardDescription>
								Help validate skills of your peers
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Skill</TableHead>
										<TableHead>Requester</TableHead>
										<TableHead>Submitted</TableHead>
										<TableHead>Progress</TableHead>
										<TableHead></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{attestationRequests.map((request) => (
										<TableRow key={request.id}>
											<TableCell className="font-medium">
												{request.skill}
											</TableCell>
											<TableCell>{request.requester}</TableCell>
											<TableCell>{request.submitted}</TableCell>
											<TableCell>
												{request.reviewers}/{request.required} reviewers
											</TableCell>
											<TableCell>
												<Button size="sm">Review</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="leaderboard">
					<Card>
						<CardHeader>
							<CardTitle>Community Leaderboard</CardTitle>
							<CardDescription>
								Top contributors in our community
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Rank</TableHead>
										<TableHead>User</TableHead>
										<TableHead>Points</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{leaderboard.map((user) => (
										<TableRow key={user.rank}>
											<TableCell>{user.rank}</TableCell>
											<TableCell>
												<div className="flex items-center space-x-2">
													<Avatar>
														<AvatarImage src={user.avatar} alt={user.name} />
														<AvatarFallback>
															{user.name
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<span>{user.name}</span>
												</div>
											</TableCell>
											<TableCell>{user.points}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<Card className="mt-8">
				<CardHeader>
					<CardTitle>Community Guidelines</CardTitle>
					<CardDescription>
						Please follow these rules to maintain a positive community
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="list-disc pl-6 space-y-2">
						<li>Be respectful and inclusive to all community members</li>
						<li>Provide constructive feedback when reviewing attestations</li>
						<li>Do not share personal information in public forums</li>
						<li>Report any inappropriate behavior to the moderators</li>
						<li>
							Contribute actively and help others to foster a learning
							environment
						</li>
					</ul>
				</CardContent>
			</Card>

			<Dialog>
				<DialogTrigger asChild>
					<Button className="mt-8">
						<UserPlus className="w-4 h-4 mr-2" />
						Apply to Become a Reviewer
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Reviewer Application</DialogTitle>
						<DialogDescription>
							Share your expertise and help others in their learning journey
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="expertise"
								className="block text-sm font-medium mb-1"
							>
								Areas of Expertise
							</label>
							<Input
								id="expertise"
								placeholder="e.g., React, Machine Learning, UX Design"
							/>
						</div>
						<div>
							<label
								htmlFor="experience"
								className="block text-sm font-medium mb-1"
							>
								Relevant Experience
							</label>
							<Textarea
								id="experience"
								placeholder="Describe your experience in these areas"
							/>
						</div>
						<div>
							<label
								htmlFor="motivation"
								className="block text-sm font-medium mb-1"
							>
								Motivation to Become a Reviewer
							</label>
							<Textarea
								id="motivation"
								placeholder="Why do you want to be a community reviewer?"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Submit Application</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}