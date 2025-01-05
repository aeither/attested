import { CourseSidebar } from "@/components/course-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Providers } from "@/lib/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "AttestED",
	description: "Community lead learning platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<SidebarProvider>
						<CourseSidebar />
						<SidebarInset>
							<NuqsAdapter>{children}</NuqsAdapter>
						</SidebarInset>
						<footer className="mt-auto">
							<p>&copy; {new Date().getFullYear()} AttestED. All rights reserved.</p>
						</footer>
					</SidebarProvider>
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}
