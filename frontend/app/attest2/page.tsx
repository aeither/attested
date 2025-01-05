"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
	useAddReviewer,
	useAttestationStatus,
	useCreateSkill,
	useMultipleSkills,
	useProvideAttestation,
	useRequestAttestation,
	useSkillCount
} from "@/hooks/use-contract";
import {
	CheckCircle,
	Loader2,
	MessageSquare,
	Plus
} from "lucide-react";
import { useState } from "react";
import type { BaseError } from "viem";
import { useAccount } from "wagmi";

// Utility Components
function ErrorAlert({ error }: { error: BaseError }) {
	return (
		<Alert variant="destructive">
			<AlertDescription>{error.shortMessage}</AlertDescription>
		</Alert>
	);
}

function LoadingSkeleton() {
	return (
		<div className="space-y-2">
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-3/4" />
		</div>
	);
}

// Types
interface Skill {
	id: bigint;
	name: string;
	description: string;
	evidenceUri: string;
	requiredAttestations: bigint;
	isActive: boolean;
}

interface AttestationRequest {
	learner: `0x${string}`;
	skillId: bigint;
	attestationCount: bigint;
	isCertified: boolean;
	tokenId?: bigint;
}

// Skill Management Components
function CreateSkillForm() {
	const [skillData, setSkillData] = useState({
		name: "",
		description: "",
		requiredAttestations: "3",
	});
	const { createSkill, isPending } = useCreateSkill();

	const handleSubmit = async () => {
		try {
			await createSkill({
				name: skillData.name,
				description: skillData.description,
				requiredAttestations: BigInt(skillData.requiredAttestations),
			});
			setSkillData({ name: "", description: "", requiredAttestations: "3" });
		} catch (error) {
			console.error("Failed to create skill:", error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create New Skill</CardTitle>
				<CardDescription>Define a new skill for attestation</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<Input
					placeholder="Skill Name"
					value={skillData.name}
					onChange={(e) =>
						setSkillData((prev) => ({ ...prev, name: e.target.value }))
					}
				/>
				<Textarea
					placeholder="Skill Description"
					value={skillData.description}
					onChange={(e) =>
						setSkillData((prev) => ({ ...prev, description: e.target.value }))
					}
				/>
				<Input
					type="number"
					placeholder="Required Attestations"
					value={skillData.requiredAttestations}
					onChange={(e) =>
						setSkillData((prev) => ({
							...prev,
							requiredAttestations: e.target.value,
						}))
					}
				/>
				<Button onClick={handleSubmit} disabled={isPending} className="w-full">
					{isPending ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<Plus className="mr-2 h-4 w-4" />
					)}
					Create Skill
				</Button>
			</CardContent>
		</Card>
	);
}

function SkillList() {
	const { data: skillCount, isPending: isLoadingCount } = useSkillCount();
	const skillIds = skillCount
		? Array.from({ length: Number(skillCount) }, (_, i) => BigInt(i))
		: [];
	const { data: skills, isPending: isLoadingSkills } =
		useMultipleSkills(skillIds);

	if (isLoadingCount || isLoadingSkills) return <LoadingSkeleton />;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Available Skills</CardTitle>
				<CardDescription>
					Total Skills: {skillCount?.toString() || "0"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div>
					{" "}
				</div>
				{/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{skills?.map((skill, index) => (
						<Card key={index}>
							<CardHeader>
								<CardTitle className="text-lg">{skill[0]}</CardTitle>
								<Badge variant={skill[4] ? "default" : "secondary"}>
									{skill[4] ? "Active" : "Inactive"}
								</Badge>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">{skill[1]}</p>
								<p className="text-sm mt-2">
									Required Attestations: {skill[3].toString()}
								</p>
							</CardContent>
						</Card>
					))}
				</div> */}
			</CardContent>
		</Card>
	);
}

function ReviewerManagement() {
	const [reviewerAddress, setReviewerAddress] = useState<string>("");
	const { addReviewer, isPending } = useAddReviewer();

	const handleAddReviewer = async () => {
		try {
			await addReviewer({
				reviewer: reviewerAddress as `0x${string}`,
			});
			setReviewerAddress("");
		} catch (error) {
			console.error("Failed to add reviewer:", error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Manage Reviewers</CardTitle>
				<CardDescription>Add trusted community reviewers</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-2">
					<Input
						placeholder="Reviewer Address (0x...)"
						value={reviewerAddress}
						onChange={(e) => setReviewerAddress(e.target.value)}
					/>
					<Button
						onClick={handleAddReviewer}
						disabled={isPending || !reviewerAddress}
					>
						{isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

function AttestationManagement({ skillId }: { skillId: bigint }) {
	const { address } = useAccount();
	const [learnerAddress, setLearnerAddress] = useState<string>("");
	const { data: status, isPending: isLoadingStatus } = useAttestationStatus({
		learner: address!,
		skillId,
		enabled: !!address,
	});
	const { requestAttestation, isPending: isRequesting } =
		useRequestAttestation();
	const { provideAttestation, isPending: isProviding } =
		useProvideAttestation();

	if (!address) return <Alert>Please connect your wallet</Alert>;
	if (isLoadingStatus) return <LoadingSkeleton />;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Attestation Management</CardTitle>
				<CardDescription>Request or provide attestations</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<h3 className="font-medium">Your Status</h3>
					<div className="flex gap-2">
						<Badge variant={status?.[1] ? "default" : "secondary"}>
							{status?.[1] ? "Certified" : "Not Certified"}
						</Badge>
						<Badge variant="outline">
							Attestations: {status?.[0].toString() || "0"}
						</Badge>
					</div>
				</div>
				<div className="space-y-2">
					<Button
						onClick={() =>
							requestAttestation({
								skillId,
								evidenceUri: "ipfs://example",
							})
						}
						disabled={isRequesting}
						className="w-full"
					>
						{isRequesting ? "Requesting..." : "Request Attestation"}
					</Button>
				</div>
				<div className="space-y-2">
					<h3 className="font-medium">Provide Attestation</h3>
					<Input
						placeholder="Learner Address (0x...)"
						value={learnerAddress}
						onChange={(e) => setLearnerAddress(e.target.value)}
					/>
					<Button
						onClick={() =>
							provideAttestation({
								learner: learnerAddress as `0x${string}`,
								skillId,
							})
						}
						disabled={isProviding || !learnerAddress}
						className="w-full"
					>
						{isProviding ? "Processing..." : "Provide Attestation"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

export default function CommunityReviewPage() {
	const { address } = useAccount();
	const { data: skillCount, isPending: isLoadingSkillCount } = useSkillCount();
	const [selectedSkillId, setSelectedSkillId] = useState<bigint | null>(null);

	if (!address) {
		return (
			<div className="container mx-auto p-4">
				<Alert>
					<AlertDescription>
						Please connect your wallet to access the attestation platform
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4 space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">AttestEd Platform</h1>
				<Badge variant="outline" className="px-4 py-2">
					{address.slice(0, 6)}...{address.slice(-4)}
				</Badge>
			</div>

			{/* Admin Section */}
			<div className="grid gap-6 md:grid-cols-2">
				<CreateSkillForm />
				<ReviewerManagement />
			</div>

			{/* Skills Overview */}
			<SkillList />

			{/* Active Skill Management */}
			{skillCount && Number(skillCount) > 0 && (
				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Select Active Skill</CardTitle>
							<CardDescription>
								Choose a skill to manage attestations
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{Array.from({ length: Number(skillCount) }, (_, i) =>
									BigInt(i),
								).map((id) => (
									<Button
										key={id.toString()}
										variant={selectedSkillId === id ? "default" : "outline"}
										className="w-full"
										onClick={() => setSelectedSkillId(id)}
									>
										Skill #{id.toString()}
									</Button>
								))}
							</div>
						</CardContent>
					</Card>
					{selectedSkillId !== null && (
						<AttestationManagement skillId={selectedSkillId} />
					)}
				</div>
			)}

			{/* Recent Activity */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
					<CardDescription>Latest attestation activities</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-start gap-4">
							<CheckCircle className="text-green-500 mt-1" />
							<div>
								<p className="font-medium">New Attestation Provided</p>
								<p className="text-sm text-muted-foreground">For Skill #1</p>
								<p className="text-sm text-muted-foreground">2 minutes ago</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<Plus className="text-blue-500 mt-1" />
							<div>
								<p className="font-medium">New Skill Created</p>
								<p className="text-sm text-muted-foreground">
									Solidity Development
								</p>
								<p className="text-sm text-muted-foreground">1 hour ago</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<MessageSquare className="text-purple-500 mt-1" />
							<div>
								<p className="font-medium">New Attestation Request</p>
								<p className="text-sm text-muted-foreground">For Skill #2</p>
								<p className="text-sm text-muted-foreground">3 hours ago</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
