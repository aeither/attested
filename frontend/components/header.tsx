import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import SearchInput from "./search-input";
import { SidebarTrigger } from "./ui/sidebar";

interface HeaderProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
	return (
		<header className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Link href="/" className="text-2xl font-bold text-primary">
							Learn
						</Link>
					</div>
					<div className="-mr-2 -my-2 md:hidden">
						<MobileMenu
							searchTerm={searchTerm}
							onSearchChange={onSearchChange}
						/>
					</div>
					<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
						<SearchInput
							searchTerm={searchTerm}
							onSearchChange={onSearchChange}
							className="w-full max-w-xs"
						/>
						<Button>Connect Wallet</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
