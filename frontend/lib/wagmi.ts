import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bscTestnet, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
	appName: "RainbowKit App",
	projectId: "YOUR_PROJECT_ID",
	chains: [sepolia, bscTestnet],
	ssr: true,
});
