import { createConfig, WagmiProvider } from "wagmi"
import { ReactNode } from "react"
import { polygonMumbai } from "viem/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { injected } from "@wagmi/connectors"
import { fallback, http } from "viem"

const wagmiConfig = createConfig({
    chains: [polygonMumbai],
    ssr: true,
    connectors: [injected()],
    transports: {
        [polygonMumbai.id]: fallback([http()]),
    },
})

const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: ReactNode }) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}