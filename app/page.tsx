"use client"

import { Web3Provider } from "./Web3Provider"
import { optimismSepolia } from "viem/chains"
import { Address, createPublicClient, encodeFunctionData, erc20Abi, Hex, http } from "viem"
import { ZeroDevClient } from "@/app/ZeroDevClient"
import { big2Bigint } from "@/app/bn"
import Big from "big.js"
import { useState } from "react"


export default function Home() {
    const [address, setAddress] = useState<Address>()
    const [userOpHash, setUserOpHash] = useState<Hex>()

    const sendUserOps = async () => {
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
        setAddress(kernelClient.account.address)

        const approveCallData = {
            to: USDT_ADDRESS,
            value: 0n,
            data: encodeFunctionData({
                abi: erc20Abi,
                functionName: "approve",
                args: [kernelClient.account.address, big2Bigint(Big(10), 6)],
            }),
        }

        // Doesn't work
        const hash = await zeroDevClient.sendUserOperation(kernelClient, [approveCallData])
        // It works
        // const hash = await zeroDevClient.sendUserOperation(kernelClient, approveCallData)
        console.log("hash", hash)
        setUserOpHash(hash)
    }

    return (
        <Web3Provider>
            <div className="z-10 w-full items-center justify-between font-mono text-lg lg:flex pt-3 pb-3">
                <h1 className="underline">EOA smart wallet without session key</h1>
            </div>
            <div className="w-full">
                <p>wallet: {address}</p>
                <p>userOpHash: {userOpHash}</p>
            </div>
            <button
                className="m-2 p-2 border-2 border-gray-300 rounded-sm"
                onClick={sendUserOps}>
                Send User Ops
            </button>
        </Web3Provider>
    )
}
