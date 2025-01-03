// app/providers.tsx
"use client";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defineChain } from "viem";
import { WagmiProvider } from "wagmi";

export const openCampusCodex = defineChain({
	id: 656476,
	testnet: true,
	name: "Open Campus Codex",
	nativeCurrency: {
		decimals: 18,
		name: "EDU",
		symbol: "EDU",
	},
	rpcUrls: {
		public: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
		default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
	},
	blockExplorers: {
		default: {
			name: "Blockscout",
			url: "https://edu-chain-testnet.blockscout.com",
		},
	},
});


const config = getDefaultConfig({
	appName: "My RainbowKit App",
	projectId: "YOUR_PROJECT_ID",
	chains: [openCampusCodex],
	ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
