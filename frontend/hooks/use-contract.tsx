import { useReadContract, useReadContracts, useWriteContract } from "wagmi";

const ATTESTED_ADDRESS: `0x${string}` =
	"0xf100032eb2f43D570Fa613c430deE1303514594A";

const ATTESTED_ABI = [
	// Read functions
	{
		inputs: [],
		name: "skillCount",
		outputs: [{ type: "uint256", name: "" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ type: "uint256", name: "" }],
		name: "skills",
		outputs: [
			{ type: "string", name: "name" },
			{ type: "string", name: "description" },
			{ type: "string", name: "evidenceUri" },
			{ type: "uint256", name: "requiredAttestations" },
			{ type: "bool", name: "isActive" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ type: "address", name: "learner" },
			{ type: "uint256", name: "skillId" },
		],
		name: "getAttestationStatus",
		outputs: [
			{ type: "uint256", name: "attestationCount" },
			{ type: "bool", name: "isCertified" },
			{ type: "uint256", name: "tokenId" },
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ type: "address", name: "" }],
		name: "communityReviewers",
		outputs: [{ type: "bool", name: "" }],
		stateMutability: "view",
		type: "function",
	},
	// Write functions
	{
		inputs: [
			{ type: "string", name: "name" },
			{ type: "string", name: "description" },
			{ type: "uint256", name: "requiredAttestations" },
		],
		name: "createSkill",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ type: "uint256", name: "skillId" },
			{ type: "string", name: "evidenceUri" },
		],
		name: "requestAttestation",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ type: "address", name: "learner" },
			{ type: "uint256", name: "skillId" },
		],
		name: "provideAttestation",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ type: "address", name: "reviewer" }],
		name: "addReviewer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
] as const;

// Read Hooks
export function useSkillCount() {
	return useReadContract({
		address: ATTESTED_ADDRESS,
		abi: ATTESTED_ABI,
		functionName: "skillCount",
	});
}

export function useSkill(skillId: bigint) {
	return useReadContract({
		address: ATTESTED_ADDRESS,
		abi: ATTESTED_ABI,
		functionName: "skills",
		args: [skillId],
	});
}

export function useAttestationStatus(params: {
	learner: `0x${string}`;
	skillId: bigint;
	enabled?: boolean;
}) {
	const { learner, skillId, enabled } = params;
	return useReadContract({
		address: ATTESTED_ADDRESS,
		abi: ATTESTED_ABI,
		functionName: "getAttestationStatus",
		args: [learner, skillId],
		query: {
			enabled: enabled ?? !!learner,
		},
	});
}

export function useMultipleSkills(skillIds: bigint[]) {
	return useReadContracts({
		contracts: skillIds.map((id) => ({
			address: ATTESTED_ADDRESS,
			abi: ATTESTED_ABI,
			functionName: "skills",
			args: [id],
		})),
	});
}

// Write Hooks
export function useCreateSkill() {
	const { writeContract, writeContractAsync, ...rest } = useWriteContract();

	const createSkill = (params: {
		name: string;
		description: string;
		requiredAttestations: bigint;
	}) => {
		return writeContract({
			address: ATTESTED_ADDRESS,
			abi: ATTESTED_ABI,
			functionName: "createSkill",
			args: [params.name, params.description, params.requiredAttestations],
		});
	};

	const createSkillAsync = async (params: {
		name: string;
		description: string;
		requiredAttestations: bigint;
	}) => {
		return writeContractAsync({
			address: ATTESTED_ADDRESS,
			abi: ATTESTED_ABI,
			functionName: "createSkill",
			args: [params.name, params.description, params.requiredAttestations],
		});
	};

	return {
		createSkill,
		createSkillAsync,
		...rest,
	};
}

export function useRequestAttestation() {
	const { writeContract, writeContractAsync, ...rest } = useWriteContract();

	const requestAttestation = (params: {
		skillId: bigint;
		evidenceUri: string;
	}) => {
		return writeContract({
			address: ATTESTED_ADDRESS,
			abi: ATTESTED_ABI,
			functionName: "requestAttestation",
			args: [params.skillId, params.evidenceUri],
		});
	};

	const requestAttestationAsync = async (params: {
		skillId: bigint;
		evidenceUri: string;
	}) => {
		return writeContractAsync({
			address: ATTESTED_ADDRESS,
			abi: ATTESTED_ABI,
			functionName: "requestAttestation",
			args: [params.skillId, params.evidenceUri],
		});
	};

	return {
		requestAttestation,
		requestAttestationAsync,
		...rest,
	};
}

