"use client";

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
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertCircle,
	CheckCircle,
	Download,
	ExternalLink,
	Share2,
	User2Icon,
} from "lucide-react";
import { useState } from "react";

// Mock data for certificates
const certificates = [
	{
		id: 1,
		name: "React Developer",
		issueDate: "2023-06-15",
		issuer: "Web Dev Academy",
		verified: true,
		imageUrl:
			"https://logos-world.net/wp-content/uploads/2023/08/React-Symbol.png",
		tokenId: "0x1234...5678",
		transactionHistory: [
			{ date: "2023-06-15", action: "Minted", hash: "0xabcd...efgh" },
			{ date: "2023-06-16", action: "Transferred", hash: "0xijkl...mnop" },
		],
	},
	{
		id: 2,
		name: "Machine Learning Specialist",
		issueDate: "2023-05-20",
		issuer: "AI Institute",
		verified: true,
		imageUrl:
			"https://intellectualpoint.com/wp-content/uploads/2020/02/AI_Logo.png",
		tokenId: "0x9876...5432",
		transactionHistory: [
			{ date: "2023-05-20", action: "Minted", hash: "0xqrst...uvwx" },
		],
	},
	{
		id: 3,
		name: "UX Design Professional",
		issueDate: "2023-04-10",
		issuer: "Design School",
		verified: false,
		imageUrl:
			"https://www.simplihire.com/wp-content/uploads/2023/09/ux-ui-logo.png",
		tokenId: "0xabcd...9876",
		transactionHistory: [
			{ date: "2023-04-10", action: "Minted", hash: "0xyzab...cdef" },
			{ date: "2023-04-11", action: "Transferred", hash: "0xghij...klmn" },
		],
	},
];

export default function CertificateManagementPage() {
	const [selectedCertificate, setSelectedCertificate] = useState(
		certificates[0],
	);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleShare = (certificate: any) => {
		// Implement sharing functionality
		console.log("Sharing certificate:", certificate.name);
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleDownload = (certificate: any) => {
		// Implement download functionality
		console.log("Downloading certificate:", certificate.name);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Certificate Management</h1>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>NFT Certificate Showcase</CardTitle>
						<CardDescription>Your earned certificates</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{certificates.map((cert) => (
								<Card
									key={cert.id}
									className="cursor-pointer hover:bg-muted"
									onClick={() => setSelectedCertificate(cert)}
								>
									<CardContent className="p-4">
										<img
											src={cert.imageUrl}
											alt={cert.name}
											width={200}
											height={150}
											className="rounded-lg mb-2"
										/>
										<h3 className="font-semibold truncate">{cert.name}</h3>
										<p className="text-sm text-muted-foreground">
											{cert.issuer}
										</p>
										<div className="mt-2">
											{cert.verified ? (
												<Badge variant="default">
													<CheckCircle className="w-3 h-3 mr-1" />
													Verified
												</Badge>
											) : (
												<Badge variant="default">
													<AlertCircle className="w-3 h-3 mr-1" />
													Unverified
												</Badge>
											)}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Certificate Details</CardTitle>
						<CardDescription>
							Metadata and verification information
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="aspect-video relative rounded-lg overflow-hidden">
							<img
								src={selectedCertificate.imageUrl}
								alt={selectedCertificate.name}
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div>
							<h3 className="text-xl font-semibold">
								{selectedCertificate.name}
							</h3>
							<p className="text-muted-foreground">
								Issued by {selectedCertificate.issuer}
							</p>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm font-medium">Issue Date</p>
								<p className="text-sm text-muted-foreground">
									{selectedCertificate.issueDate}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium">Token ID</p>
								<p className="text-sm text-muted-foreground">
									{selectedCertificate.tokenId}
								</p>
							</div>
						</div>
						<div>
							<p className="text-sm font-medium">Verification Status</p>
							{selectedCertificate.verified ? (
								<Badge variant="default">
									<CheckCircle className="w-3 h-3 mr-1" />
									Verified
								</Badge>
							) : (
								<Badge variant="default">
									<AlertCircle className="w-3 h-3 mr-1" />
									Unverified
								</Badge>
							)}
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button
							variant="outline"
							onClick={() => handleShare(selectedCertificate)}
						>
							<Share2 className="w-4 h-4 mr-2" />
							Share
						</Button>
						<a href="/profile">
							<Button
								variant="outline"
								onClick={() => handleDownload(selectedCertificate)}
							>
								<User2Icon className="w-4 h-4 mr-2" />
								Profile
							</Button>
						</a>
						<Button
							variant="outline"
							onClick={() => handleDownload(selectedCertificate)}
						>
							<Download className="w-4 h-4 mr-2" />
							Download
						</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline">
									<ExternalLink className="w-4 h-4 mr-2" />
									Blockchain
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Transaction History</DialogTitle>
									<DialogDescription>
										View the blockchain transaction history for this certificate
									</DialogDescription>
								</DialogHeader>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Date</TableHead>
											<TableHead>Action</TableHead>
											<TableHead>Transaction Hash</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{selectedCertificate.transactionHistory.map((tx, index) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<TableRow key={index}>
												<TableCell>{tx.date}</TableCell>
												<TableCell>{tx.action}</TableCell>
												<TableCell>
													<a
														href={`https://etherscan.io/tx/${tx.hash}`}
														target="_blank"
														rel="noopener noreferrer"
														className="text-blue-500 hover:underline"
													>
														{tx.hash}
													</a>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</DialogContent>
						</Dialog>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
