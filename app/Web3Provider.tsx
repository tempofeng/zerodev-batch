import { createConfig, WagmiProvider } from "wagmi"
import { ReactNode } from "react"
import { optimismSepolia } from "viem/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { injected } from "@wagmi/connectors"
import { fallback, http } from "viem"

const wagmiConfig = createConfig({
    chains: [optimismSepolia],
    ssr: true,
    connectors: [injected()],
    transports: {
        [optimismSepolia.id]: fallback([http()]),
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