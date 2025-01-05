"use client";

import { Header } from "@/components/header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    useAttestationStatus,
    useCreateSkill,
    useMultipleSkills,
    useRequestAttestation,
    useSkill,
    useSkillCount,
} from "@/hooks/use-contract";
import { useState } from "react";
import type { BaseError } from "viem";
import { useAccount } from "wagmi";

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

function SkillComponent() {
	const { data: skillCount, isPending, error } = useSkillCount();
	const { createSkill, isPending: isCreating } = useCreateSkill();

	if (isPending) return <LoadingSkeleton />;
	if (error) return <ErrorAlert error={error as BaseError} />;

	const handleCreateSkill = async () => {
		try {
			await createSkill({
				name: "Solidity Development",
				description: "Advanced smart contract development",
				requiredAttestations: BigInt(1),
			});
		} catch (error) {
			console.error("Failed to create skill:", error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Skills Overview</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<p className="text-sm">Total Skills: {skillCount?.toString()}</p>
					<Button
						onClick={handleCreateSkill}
						disabled={isCreating}
						variant="outline"
					>
						{isCreating ? "Creating..." : "Create Skill"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

function SingleSkillComponent({ skillId }: { skillId: bigint }) {
	const { data: skill, isPending, error } = useSkill(skillId);

	if (isPending) return <LoadingSkeleton />;
	if (error) return <ErrorAlert error={error as BaseError} />;

	const [name, description, evidenceUri, requiredAttestations, isActive] =
		skill || [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<Badge variant={isActive ? "default" : "secondary"}>
					{isActive ? "Active" : "Inactive"}
				</Badge>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="text-sm text-muted-foreground">{description}</p>
				<p className="text-sm">
					Required Attestations: {requiredAttestations?.toString()}
				</p>
				{evidenceUri && (
					<p className="text-sm text-muted-foreground">
						Evidence URI: {evidenceUri}
					</p>
				)}
			</CardContent>
		</Card>
	);
}

function MultipleSkillsComponent({ skillIds }: { skillIds: bigint[] }) {
	const { data: skills, isPending, error } = useMultipleSkills(skillIds);

	if (isPending) return <LoadingSkeleton />;
	if (error) return <ErrorAlert error={error as BaseError} />;

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{skills?.map((skill, index) => (
				<SingleSkillComponent
					key={skillIds[index].toString()}
					skillId={skillIds[index]}
				/>
			))}
		</div>
	);
}

function AttestationComponent({ skillId }: { skillId: bigint }) {
	const { address } = useAccount();
	const { data, isPending, error } = useAttestationStatus({
		learner: address!,
		skillId,
		enabled: !!address,
	});
	const { requestAttestation, isPending: isRequesting } =
		useRequestAttestation();

	if (!address) return <Alert>Please connect your wallet</Alert>;
	if (isPending) return <LoadingSkeleton />;
	if (error) return <ErrorAlert error={error as BaseError} />;

	const [attestationCount, isCertified, tokenId] = data || [];

	const handleRequestAttestation = async () => {
		try {
			await requestAttestation({
				skillId,
				evidenceUri: "ipfs://QmExample...",
			});
		} catch (error) {
			console.error("Failed to request attestation:", error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Attestation Status</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<p className="text-sm">
						Attestation Count: {attestationCount?.toString()}
					</p>
					<Badge variant={isCertified ? "success" : "secondary"}>
						{isCertified ? "Certified" : "Not Certified"}
					</Badge>
					{isCertified && (
						<p className="text-sm">Token ID: {tokenId?.toString()}</p>
					)}
				</div>
				<Button
					onClick={handleRequestAttestation}
					disabled={isRequesting}
					variant="outline"
					className="w-full"
				>
					{isRequesting ? "Requesting..." : "Request Attestation"}
				</Button>
			</CardContent>
		</Card>
	);
}

export default function ContractPage() {
	const { address } = useAccount();
	const { data: skillCount } = useSkillCount();
	const [searchTerm, setSearchTerm] = useState("");

	if (!address)
		return (
			<>
				<Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
				<Alert>Please connect your wallet</Alert>
			</>
		);
	if (!skillCount) return <LoadingSkeleton />;

	const skillIds = Array.from({ length: Number(skillCount) }, (_, i) =>
		BigInt(i + 1),
	);

	return (
		<>
			<Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

			<div className="container mx-auto p-4 space-y-8">
				<h1 className="text-3xl font-bold">AttestEd Dashboard</h1>
				<SkillComponent />
				<h2 className="text-2xl font-semibold">All Skills</h2>
				<MultipleSkillsComponent skillIds={skillIds} />
				{skillCount.toString() > BigInt(0).toString() && (
					<>
						<h2 className="text-2xl font-semibold">Latest Skill</h2>
						<div className="grid gap-4 md:grid-cols-2">
							<SingleSkillComponent skillId={skillCount} />
							<AttestationComponent skillId={skillCount} />
						</div>
					</>
				)}
			</div>
		</>
	);
}
