import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import styles from "../styles/Home.module.css";
import { abiAttestEd } from "../utils/abiAttestEd";
import { replaceBigInts } from "../utils/helpers";

const addressAttestEd = "0xA6bF4Ac0fe7d17B21beDa3BB4aE38CB83Cb31d6E";

const Home: NextPage = () => {
	const [skillId, setSkillId] = useState("1");
	const [learnerAddress, setLearnerAddress] = useState("");
	const [reviewerAddress, setReviewerAddress] = useState("");
	const [evidenceUri, setEvidenceUri] = useState("");
	const [skillName, setSkillName] = useState("");
	const [skillDescription, setSkillDescription] = useState("");
	const [requiredAttestations, setRequiredAttestations] = useState("3");

	const { data: skillData } = useReadContract({
		abi: abiAttestEd,
		address: addressAttestEd,
		functionName: "skills",
		args: [BigInt(skillId)],
	});

	const { data: attestationStatus } = useReadContract({
		abi: abiAttestEd,
		address: addressAttestEd,
		functionName: "getAttestationStatus",
		args: [
			learnerAddress || "0x0000000000000000000000000000000000000000",
			BigInt(skillId),
		],
	});

	const { writeContract } = useWriteContract({
		mutation: {
			onError: (error) => {
				console.log(error.message);
			},
		},
	});

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className="text-2xl font-bold mb-8">AttestEd Platform</h1>
				<ConnectButton />

				<div className="space-y-8 mt-8">
					{/* Admin Controls */}
					<div className="p-4 border rounded-lg space-y-4 bg-gray-50">
						<h2 className="text-xl font-bold">Admin Controls</h2>
						<div className="space-y-4">
							<div className="flex gap-2">
								<input
									type="text"
									value={reviewerAddress}
									onChange={(e) => setReviewerAddress(e.target.value)}
									placeholder="Reviewer Address"
									className="border p-2 rounded flex-1"
								/>
								<button
									type="button"
									className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
									onClick={() =>
										writeContract({
											abi: abiAttestEd,
											address: addressAttestEd,
											functionName: "addReviewer",
											args: [reviewerAddress as `0x${string}`],
										})
									}
								>
									Add Reviewer
								</button>
								<button
									type="button"
									className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
									onClick={() =>
										writeContract({
											abi: abiAttestEd,
											address: addressAttestEd,
											functionName: "removeReviewer",
											args: [reviewerAddress as `0x${string}`],
										})
									}
								>
									Remove Reviewer
								</button>
							</div>
						</div>
					</div>

					{/* Skill Management */}
					<div className="p-4 border rounded-lg space-y-4">
						<h2 className="text-xl font-bold">Skill Management</h2>
						<div className="space-y-4">
							<div className="grid grid-cols-3 gap-2">
								<input
									type="text"
									value={skillName}
									onChange={(e) => setSkillName(e.target.value)}
									placeholder="Skill Name"
									className="border p-2 rounded"
								/>
								<input
									type="text"
									value={skillDescription}
									onChange={(e) => setSkillDescription(e.target.value)}
									placeholder="Skill Description"
									className="border p-2 rounded"
								/>
								<input
									type="number"
									value={requiredAttestations}
									onChange={(e) => setRequiredAttestations(e.target.value)}
									placeholder="Required Attestations"
									className="border p-2 rounded"
								/>
							</div>
							<button
								type="button"
								className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
								onClick={() =>
									writeContract({
										abi: abiAttestEd,
										address: addressAttestEd,
										functionName: "createSkill",
										args: [
											skillName,
											skillDescription,
											BigInt(requiredAttestations),
										],
									})
								}
							>
								Create Skill
							</button>

							<div className="flex gap-2">
								<input
									type="text"
									value={skillId}
									onChange={(e) => setSkillId(e.target.value)}
									placeholder="Skill ID"
									className="border p-2 rounded"
								/>
								<div className="bg-gray-100 p-2 rounded flex-1">
									<p className="font-semibold">Skill Details:</p>
									<pre>
										{JSON.stringify(replaceBigInts(skillData), null, 2)}
									</pre>
								</div>
							</div>
						</div>
					</div>

					{/* Attestation Request */}
					<div className="p-4 border rounded-lg space-y-4">
						<h2 className="text-xl font-bold">Request Attestation</h2>
						<div className="flex gap-2">
							<input
								type="text"
								value={skillId}
								onChange={(e) => setSkillId(e.target.value)}
								placeholder="Skill ID"
								className="border p-2 rounded"
							/>
							<input
								type="text"
								value={evidenceUri}
								onChange={(e) => setEvidenceUri(e.target.value)}
								placeholder="Evidence URI"
								className="border p-2 rounded flex-1"
							/>
							<button
								type="button"
								className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
								onClick={() =>
									writeContract({
										abi: abiAttestEd,
										address: addressAttestEd,
										functionName: "requestAttestation",
										args: [BigInt(skillId), evidenceUri],
									})
								}
							>
								Request Attestation
							</button>
						</div>
					</div>

					{/* Provide Attestation */}
					<div className="p-4 border rounded-lg space-y-4">
						<h2 className="text-xl font-bold">Provide Attestation</h2>
						<div className="flex gap-2">
							<input
								type="text"
								value={learnerAddress}
								onChange={(e) => setLearnerAddress(e.target.value)}
								placeholder="Learner Address"
								className="border p-2 rounded flex-1"
							/>
							<input
								type="text"
								value={skillId}
								onChange={(e) => setSkillId(e.target.value)}
								placeholder="Skill ID"
								className="border p-2 rounded"
							/>
							<button
								type="button"
								className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
								onClick={() =>
									writeContract({
										abi: abiAttestEd,
										address: addressAttestEd,
										functionName: "provideAttestation",
										args: [learnerAddress as `0x${string}`, BigInt(skillId)],
									})
								}
							>
								Provide Attestation
							</button>
						</div>
					</div>

					{/* View Attestation Status */}
					<div className="p-4 border rounded-lg space-y-4">
						<h2 className="text-xl font-bold">Attestation Status</h2>
						<div className="flex gap-2">
							<input
								type="text"
								value={learnerAddress}
								onChange={(e) => setLearnerAddress(e.target.value)}
								placeholder="Learner Address"
								className="border p-2 rounded flex-1"
							/>
							<div className="bg-gray-100 p-2 rounded flex-1">
								<p className="font-semibold">Status:</p>
								<pre>
									{JSON.stringify(replaceBigInts(attestationStatus), null, 2)}
								</pre>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;