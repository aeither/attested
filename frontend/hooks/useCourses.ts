// hooks/useCourses.ts
import { useReadContract } from 'wagmi';

const contractAddress = '0x693e77f81fc8A743E00190f362b8b253f6666dA0';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_difficulty",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_progress",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_youtubeUrl",
				"type": "string"
			}
		],
		"name": "addCourse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "difficulty",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "progress",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "youtubeUrl",
				"type": "string"
			}
		],
		"name": "CourseAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "CourseDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "difficulty",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "progress",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "youtubeUrl",
				"type": "string"
			}
		],
		"name": "CourseUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_courseId",
				"type": "uint256"
			}
		],
		"name": "deleteCourse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_courseId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_difficulty",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_progress",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_youtubeUrl",
				"type": "string"
			}
		],
		"name": "updateCourse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_courseId",
				"type": "uint256"
			}
		],
		"name": "getCourse",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "difficulty",
						"type": "string"
					},
					{
						"internalType": "uint8",
						"name": "progress",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "youtubeUrl",
						"type": "string"
					}
				],
				"internalType": "struct EducationPlatform.Course",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			}
		],
		"name": "getCoursesByCategory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "difficulty",
						"type": "string"
					},
					{
						"internalType": "uint8",
						"name": "progress",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "youtubeUrl",
						"type": "string"
					}
				],
				"internalType": "struct EducationPlatform.Course[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export function useCourses() {
    const { data: course1 } = useReadContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'getCourse',
        args: [1],
    });
    console.log("🚀 ~ useCourses ~ course1:", course1)
    
    const { data: course2 } = useReadContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'getCourse',
        args: [2],
    });
    const { data: course3 } = useReadContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'getCourse',
        args: [3],
    });
    const { data: course4 } = useReadContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'getCourse',
        args: [4],
    });
    const { data: course5 } = useReadContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'getCourse',
        args: [5],
    });

    return {
        courses: [course1, course2, course3, course4, course5],
    };
}
