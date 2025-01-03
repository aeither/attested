"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SearchInput from "./search-input";

interface MobileMenuProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
}

export default function MobileMenu({
	searchTerm,
	onSearchChange,
}: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Button
				variant="ghost"
				className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="sr-only">Open main menu</span>
				{isOpen ? (
					<X className="block h-6 w-6" aria-hidden="true" />
				) : (
					<Menu className="block h-6 w-6" aria-hidden="true" />
				)}
			</Button>

			{isOpen && (
				<div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
					<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
						<div className="pt-5 pb-6 px-5">
							<div className="flex items-center justify-between">
								<div className="text-2xl font-bold text-primary">AttestEd</div>
								<div className="-mr-2">
									<Button
										variant="ghost"
										className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
										onClick={() => setIsOpen(false)}
									>
										<span className="sr-only">Close menu</span>
										<X className="h-6 w-6" aria-hidden="true" />
									</Button>
								</div>
							</div>
							<div className="mt-6">
								<div className="relative w-full">
									<SearchInput
										searchTerm={searchTerm}
										onSearchChange={onSearchChange}
										className="w-full"
									/>
								</div>
							</div>
						</div>
						<div className="py-6 px-5">
							<Button className="w-full">Connect Wallet</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

