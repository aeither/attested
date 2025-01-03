"use client";

import { Book, BookOpen, Gauge, Layout } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const categories = [
	{
		name: "Web Development",
		icon: Layout,
	},
	{
		name: "Data Science",
		icon: Gauge,
	},
	{
		name: "Design",
		icon: Book,
	},
	{
		name: "DevOps",
		icon: BookOpen,
	},
];

const difficulties = ["Beginner", "Intermediate", "Advanced"];

export function CourseSidebar() {
	return (
		<Sidebar className="border-r-0 bg-blue-50 dark:bg-blue-950">
			<SidebarHeader className="border-b border-blue-100 dark:border-blue-900">
				<div className="px-2 py-4">
					<h2 className="px-4 text-lg font-semibold tracking-tight text-blue-900 dark:text-blue-50">
                        AttestEd
					</h2>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-blue-900 dark:text-blue-100">
						Categories
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{categories.map((category) => (
								<SidebarMenuItem key={category.name}>
									<SidebarMenuButton className="w-full text-blue-800 hover:bg-blue-100 hover:text-blue-900 dark:text-blue-100 dark:hover:bg-blue-900 dark:hover:text-blue-50">
										<category.icon className="h-4 w-4" />
										<span>{category.name}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel className="text-blue-900 dark:text-blue-100">
						Difficulty
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{difficulties.map((difficulty) => (
								<SidebarMenuItem key={difficulty}>
									<SidebarMenuButton className="w-full text-blue-800 hover:bg-blue-100 hover:text-blue-900 dark:text-blue-100 dark:hover:bg-blue-900 dark:hover:text-blue-50">
										<span>{difficulty}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}

