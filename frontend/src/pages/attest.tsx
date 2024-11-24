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
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
    CheckCircle,
    MessageSquare,
    ThumbsDown,
    ThumbsUp,
    User,
    XCircle,
} from "lucide-react";
import { useState } from "react";

// Mock data for pending attestation requests
const pendingRequests = [
	{
		id: 1,
		user: "Alice Johnson",
		skill: "React Basics",
		submittedAt: "2023-06-15",
		attestations: 2,
		required: 5,
	},
	{
		id: 2,
		user: "Bob Smith",
		skill: "Machine Learning Fundamentals",
		submittedAt: "2023-06-14",
		attestations: 3,
		required: 5,
	},
	{
		id: 3,
		user: "Charlie Brown",
		skill: "Advanced JavaScript",
		submittedAt: "2023-06-13",
		attestations: 1,
		required: 5,
	},
	{
		id: 4,
		user: "Diana Prince",
		skill: "UX Design Principles",
		submittedAt: "2023-06-12",
		attestations: 4,
		required: 5,
	},
	{
		id: 5,
		user: "Ethan Hunt",
		skill: "Cloud Computing Essentials",
		submittedAt: "2023-06-11",
		attestations: 0,
		required: 5,
	},
];

export default function CommunityReviewPage() {
	const [selectedRequest, setSelectedRequest] = useState(pendingRequests[0]);
	const [reviewComment, setReviewComment] = useState("");

	const handleAttestation = (isPositive: boolean) => {
		// Here you would typically send the attestation to your backend
		console.log("Attestation:", {
			requestId: selectedRequest.id,
			isPositive,
			comment: reviewComment,
		});
		// Update the UI optimistically
		setSelectedRequest((prev) => ({
			...prev,
			attestations: prev.attestations + 1,
		}));
		setReviewComment("");
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">
				Community Review and Validation
			</h1>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Pending Attestation Requests</CardTitle>
						<CardDescription>
							Review and validate community submissions
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>User</TableHead>
									<TableHead>Skill</TableHead>
									<TableHead>Submitted</TableHead>
									<TableHead>Progress</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{pendingRequests.map((request) => (
									<TableRow
										key={request.id}
										className="cursor-pointer hover:bg-muted"
										onClick={() => setSelectedRequest(request)}
									>
										<TableCell>{request.user}</TableCell>
										<TableCell>{request.skill}</TableCell>
										<TableCell>{request.submittedAt}</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Progress
													value={
														(request.attestations / request.required) * 100
													}
													className="w-[60px]"
												/>
												<span className="text-sm text-muted-foreground">
													{request.attestations}/{request.required}
												</span>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Review Interface</CardTitle>
						<CardDescription>
							Provide your attestation for the selected submission
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-4">
							<Avatar>
								<AvatarImage
									src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedRequest.user}`}
								/>
								<AvatarFallback>
									<User />
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-semibold">{selectedRequest.user}</h3>
								<p className="text-sm text-muted-foreground">
									{selectedRequest.skill}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="outline">
								Submitted: {selectedRequest.submittedAt}
							</Badge>
							<Badge variant="outline">
								Progress: {selectedRequest.attestations}/
								{selectedRequest.required}
							</Badge>
						</div>
						<div className="space-y-2">
							<label htmlFor="comment" className="text-sm font-medium">
								Your Review Comment
							</label>
							<Textarea
								id="comment"
								placeholder="Provide your feedback here..."
								value={reviewComment}
								onChange={(e) => setReviewComment(e.target.value)}
							/>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button variant="outline" onClick={() => handleAttestation(false)}>
							<ThumbsDown className="mr-2 h-4 w-4" />
							Reject
						</Button>
						<a href="/certificate">
							<Button onClick={() => handleAttestation(true)}>
								<ThumbsUp className="mr-2 h-4 w-4" />
								Approve
							</Button>
						</a>
					</CardFooter>
				</Card>
			</div>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Verification Status Updates</CardTitle>
					<CardDescription>Recent activity for this submission</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-start gap-4">
							<CheckCircle className="text-green-500 mt-1" />
							<div>
								<p className="font-medium">Attestation Approved</p>
								<p className="text-sm text-muted-foreground">
									Jane Doe attested to this skill submission
								</p>
								<p className="text-sm text-muted-foreground">2 hours ago</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<MessageSquare className="text-blue-500 mt-1" />
							<div>
								<p className="font-medium">Review Comment Added</p>
								<p className="text-sm text-muted-foreground">
									John Smith left a comment on this submission
								</p>
								<p className="text-sm text-muted-foreground">5 hours ago</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<XCircle className="text-red-500 mt-1" />
							<div>
								<p className="font-medium">Attestation Rejected</p>
								<p className="text-sm text-muted-foreground">
									Alice Johnson rejected this skill submission
								</p>
								<p className="text-sm text-muted-foreground">1 day ago</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
