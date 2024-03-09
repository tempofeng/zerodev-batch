import Big from "big.js"
import { Address, createPublicClient, encodeFunctionData, erc20Abi, http } from "viem"
import { optimismSepolia } from "viem/chains"
import { describe, test } from "vitest"
import { ZeroDevClient } from "@/app/ZeroDevClient"
import { big2Bigint } from "@/app/bn"
import * as dotenv from "dotenv"

describe("OrderGatewayProxyV2 test", () => {
    test("test user op", async () => {
        dotenv.config({ path: ".env.local" })
        const zeroDevProjectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID!
        const USDT_ADDRESS = "0xA8Eba06366A8ad5E59Ef29477E7a4B384ea648Bf" as Address
        const chain = optimismSepolia
        const serializedSessionKeyAccount = process.env.NEXT_PUBLIC_SERIALIZED_SESSION_KEY_ACCOUNT!

        const zeroDevClient = new ZeroDevClient(
            `https://passkeys.zerodev.app/api/v2/${zeroDevProjectId}`,
            `https://rpc.zerodev.app/api/v2/bundler/${zeroDevProjectId}`,
            `https://rpc.zerodev.app/api/v2/paymaster/${zeroDevProjectId}`,
        )

        const publicClient = createPublicClient({
            chain,
            transport: http(),
        })

        const kernelClient = await zeroDevClient.deserializeSessionKeyKernelClient(
            publicClient,
            serializedSessionKeyAccount,
            chain,
        )

        const approveCallData = {
            to: USDT_ADDRESS,
            value: 0n,
            data: encodeFunctionData({
                abi: erc20Abi,
                functionName: "approve",
                args: [kernelClient.account.address, big2Bigint(Big(10), 6)],
            }),
        }

        const hash = await zeroDevClient.sendUserOperation(kernelClient, [approveCallData])
        console.log("hash", hash)
    })
})
