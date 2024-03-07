"use client"

import { Web3Provider } from "./Web3Provider"
import { optimismSepolia } from "viem/chains"
import { Address, createPublicClient, encodeFunctionData, erc20Abi, Hex, http } from "viem"
import { CreateKernelAccountClientReturnType, ZeroDevClient } from "@/app/ZeroDevClient"
import { big2Bigint } from "@/app/bn"
import Big from "big.js"
import { useState } from "react"
import { toMerklePolicy, toSignaturePolicy } from "@zerodev/modular-permission/policies"
import { WebAuthnMode } from "@zerodev/modular-permission/signers"


export default function Home() {
    const [address, setAddress] = useState<Address>()
    const [userOpHash, setUserOpHash] = useState<Hex>()

    const createPolicies = async (collateralTokenAddress: Address, orderGatewayV2Address: Address) => {
        return [
            await toMerklePolicy({
                permissions: [
                    {
                        target: collateralTokenAddress,
                        valueLimit: BigInt(0),
                        abi: erc20Abi,
                        functionName: "approve",
                        args: [null, null],
                    },
                ],
            }),
            await toSignaturePolicy({
                allowedRequestors: [orderGatewayV2Address],
            }),
        ]
    }

    const sendUserOps = async () => {
        const zeroDevProjectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID!
        const USDT_ADDRESS = "0xA8Eba06366A8ad5E59Ef29477E7a4B384ea648Bf" as Address
        const VAULT_ADDRESS = "0xF1D51901302EaF6027BeA4a7D666a1BE337ca6bb" as Address
        const CLEARING_HOUSE_ADDRESS = "0x2000d0a1c77fC54EDA12C3ae564d760F7ac7ebf2" as Address
        const ORDER_GATEWAY_V2_ADDRESS = "0xCb134B6101494b46506578324EbCbaefcAcFCE20" as Address
        const chain = optimismSepolia
        const sessionPrivateKey = "0xe9f1d966dba41273a50181fc3c43d739c2b8585653c12a878bb63e161c45e910"
        const isSerialized = false
        const isUsingSessionKey = true

        const zeroDevClient = new ZeroDevClient(
            `https://passkeys.zerodev.app/api/v2/${zeroDevProjectId}`,
            `https://rpc.zerodev.app/api/v2/bundler/${zeroDevProjectId}`,
            `https://rpc.zerodev.app/api/v2/paymaster/${zeroDevProjectId}`,
        )

        const publicClient = createPublicClient({
            chain,
            transport: http(),
        })

        let kernelClient: CreateKernelAccountClientReturnType
        if (isUsingSessionKey) {
            const policies = await createPolicies(USDT_ADDRESS, ORDER_GATEWAY_V2_ADDRESS)
            const kernelAccount = await zeroDevClient.createPasskeySessionKeyKernelAccount(publicClient, "tempo", WebAuthnMode.Login, policies, sessionPrivateKey)
            if (isSerialized) {
                const serializedSessionKeyAccount = await zeroDevClient.serializeSessionKeyKernelClient(
                    kernelAccount,
                    sessionPrivateKey,
                )
                kernelClient = await zeroDevClient.deserializeSessionKeyKernelClient(publicClient, serializedSessionKeyAccount, chain)
                console.log("using serialized session key")
            } else {
                kernelClient = zeroDevClient.createKernelClient(chain, kernelAccount)
                console.log("using session key")
            }
        } else {
            const kernelAccount = await zeroDevClient.createPasskeyKernelAccount(publicClient, "tempo", WebAuthnMode.Login)
            kernelClient = zeroDevClient.createKernelClient(chain, kernelAccount)
            console.log("not using session key")
        }

        setAddress(kernelClient.account?.address)

        const approveCallData = {
            to: USDT_ADDRESS,
            value: 0n,
            data: encodeFunctionData({
                abi: erc20Abi,
                functionName: "approve",
                args: [VAULT_ADDRESS, big2Bigint(Big(10), 6)],
            }),
        }

        // Doesn't work
        const userOperation = await zeroDevClient.prepareUserOperationRequest(kernelClient, [approveCallData])
        // It works
        // const userOperation = await zeroDevClient.prepareUserOperationRequest(kernelClient, approveCallData)
        const userOpHash = await zeroDevClient.sendSimulatedUserOperation(kernelClient, userOperation)
        console.log("userOpHash", userOpHash)
        setUserOpHash(userOpHash)

        const receipt = await zeroDevClient.waitForUserOperationReceipt(kernelClient, userOpHash)
        console.log("receipt", receipt)
    }

    return (
        <Web3Provider>
            <div className="z-10 w-full items-center justify-between font-mono text-lg lg:flex pt-3 pb-3">
                <h1 className="underline">Clean example</h1>
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
