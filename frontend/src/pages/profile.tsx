"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Book, Clock, Paperclip, Users, Wallet } from "lucide-react";
import { useState } from "react";

// Mock data
const user = {
	name: "Alice Johnson",
	email: "alice@example.com",
	avatar: "/placeholder.svg?height=100&width=100",
	learningProgress: 65,
	earnedCertificates: 3,
	pendingAttestations: 2,
	communityContributions: 15,
	walletConnected: true,
	walletAddress: "0x1234...5678",
};

const certificates = [
	{
		id: 1,
		name: "React Developer",
		issueDate: "2023-06-15",
		issuer: "Web Dev Academy",
	},
	{
		id: 2,
		name: "Machine Learning Specialist",
		issueDate: "2023-05-20",
		issuer: "AI Institute",
	},
	{
		id: 3,
		name: "UX Design Professional",
		issueDate: "2023-04-10",
		issuer: "Design School",
	},
];

const pendingAttestations = [
	{
		id: 1,
		skill: "Advanced JavaScript",
		submitted: "2023-06-20",
		progress: 3,
		required: 5,
	},
	{
		id: 2,
		skill: "Cloud Computing Essentials",
		submitted: "2023-06-18",
		progress: 2,
		required: 5,
	},
];

const activityHistory = [
	{
		id: 1,
		action: "Completed course",
		item: "Advanced React Patterns",
		date: "2023-06-22",
	},
	{
		id: 2,
		action: "Earned certificate",
		item: "React Developer",
		date: "2023-06-15",
	},
	{
		id: 3,
		action: "Submitted attestation",
		item: "Advanced JavaScript",
		date: "2023-06-20",
	},
	{
		id: 4,
		action: "Reviewed submission",
		item: "UX Design Principles",
		date: "2023-06-19",
	},
];

export default function PersonalDashboard() {
	const [activeTab, setActiveTab] = useState("overview");

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<div className="flex items-center mb-4 md:mb-0">
					<Avatar className="h-20 w-20 mr-4">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback>
							{user.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
					<div>
						<h1 className="text-3xl font-bold">{user.name}</h1>
						<p className="text-muted-foreground">{user.email}</p>
					</div>
				</div>
				<div className="flex items-center">
					<Badge
						variant={user.walletConnected ? "default" : "secondary"}
						className="mr-2"
					>
						<Wallet className="w-4 h-4 mr-1" />
						{user.walletConnected ? "Connected" : "Not Connected"}
					</Badge>
					{user.walletConnected && (
						<span className="text-sm text-muted-foreground">
							{user.walletAddress}
						</span>
					)}
				</div>
			</div>

			<div className="flex space-x-2 mb-6">
				<Button
					variant={activeTab === "overview" ? "default" : "outline"}
					onClick={() => setActiveTab("overview")}
				>
					Overview
				</Button>
				<Button
					variant={activeTab === "certificates" ? "default" : "outline"}
					onClick={() => setActiveTab("certificates")}
				>
					Certificates
				</Button>
				<Button
					variant={activeTab === "attestations" ? "default" : "outline"}
					onClick={() => setActiveTab("attestations")}
				>
					Attestations
				</Button>
				<Button
					variant={activeTab === "activity" ? "default" : "outline"}
					onClick={() => setActiveTab("activity")}
				>
					Activity
				</Button>
				<a href="/community">
					<Button
						variant={activeTab === "attestations" ? "default" : "outline"}
						onClick={() => setActiveTab("attestations")}
					>
						Community
					</Button>
				</a>
			</div>

			{activeTab === "overview" && (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Learning Progress
							</CardTitle>
							<Book className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{user.learningProgress}%</div>
							<Progress value={user.learningProgress} className="mt-2" />
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Earned Certificates
							</CardTitle>
							<Paperclip className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{user.earnedCertificates}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Pending Attestations
							</CardTitle>
							<Clock className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{user.pendingAttestations}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Community Contributions
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{user.communityContributions}
							</div>
						</CardContent>
					</Card>
				</div>
			)}

			{activeTab === "certificates" && (
				<Card>
					<CardHeader>
						<CardTitle>Earned Certificates</CardTitle>
						<CardDescription>
							Your achievements and recognitions
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Certificate</TableHead>
									<TableHead>Issuer</TableHead>
									<TableHead>Issue Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{certificates.map((cert) => (
									<TableRow key={cert.id}>
										<TableCell className="font-medium">{cert.name}</TableCell>
										<TableCell>{cert.issuer}</TableCell>
										<TableCell>{cert.issueDate}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}

			{activeTab === "attestations" && (
				<Card>
					<CardHeader>
						<CardTitle>Pending Attestations</CardTitle>
						<CardDescription>
							Skills awaiting community validation
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Skill</TableHead>
									<TableHead>Submitted</TableHead>
									<TableHead>Progress</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{pendingAttestations.map((attestation) => (
									<TableRow key={attestation.id}>
										<TableCell className="font-medium">
											{attestation.skill}
										</TableCell>
										<TableCell>{attestation.submitted}</TableCell>
										<TableCell>
											<div className="flex items-center">
												<Progress
													value={
														(attestation.progress / attestation.required) * 100
													}
													className="w-full max-w-xs"
												/>
												<span className="ml-2 text-sm text-muted-foreground">
													{attestation.progress}/{attestation.required}
												</span>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}

			{activeTab === "activity" && (
				<Card>
					<CardHeader>
						<CardTitle>Activity History</CardTitle>
						<CardDescription>
							Your recent actions and achievements
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Action</TableHead>
									<TableHead>Item</TableHead>
									<TableHead>Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{activityHistory.map((activity) => (
									<TableRow key={activity.id}>
										<TableCell className="font-medium">
											{activity.action}
										</TableCell>
										<TableCell>{activity.item}</TableCell>
										<TableCell>{activity.date}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
