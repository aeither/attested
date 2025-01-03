"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HeaderProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
	return (
		<header className="bg-[#151BEA] text-primary-foreground p-4">
			<div className="container mx-auto flex items-center justify-between">
				<h1 className="text-2xl font-bold text-[#00EEBD]">AttestEd</h1>

				<div className="flex flex-row gap-2">
					<div className="relative w-1/3">
						<Input
							type="search"
							placeholder="Search skills..."
							className="pl-10 text-white"
							value={searchTerm}
							onChange={(e) => onSearchChange(e.target.value)}
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
					</div>
					<Button>Connect Wallet</Button>
				</div>
			</div>
		</header>
	);
}
