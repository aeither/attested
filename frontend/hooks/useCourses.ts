// hooks/useCourses.ts
import { useReadContract } from 'wagmi';
import { ethers } from 'ethers';

const contractAddress = '0x693e77f81fc8A743E00190f362b8b253f6666dA0';
const contractABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "getCourse",
        "outputs": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "category",
                "type": "string"
            },
            {
                "name": "difficulty",
                "type": "string"
            },
            {
                "name": "progress",
                "type": "uint256"
            },
            {
                "name": "youtubeUrl",
                "type": "string"
            }
        ],
        "payable": false,
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
