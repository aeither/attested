"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	className?: string;
}

export default function SearchInput({
	searchTerm,
	onSearchChange,
	className = "",
}: SearchInputProps) {
	return (
		<div className={`relative ${className}`}>
			<Input
				type="search"
				placeholder="Search..."
				className="pl-10 pr-4 py-2 w-full"
				value={searchTerm}
				onChange={(e) => onSearchChange(e.target.value)}
			/>
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<Search className="h-5 w-5 text-gray-400" />
			</div>
		</div>
	);
}

