"use client"

import { Web3Provider } from "./Web3Provider"
import { optimismSepolia } from "viem/chains"
import { Address, createPublicClient, encodeFunctionData, erc20Abi, Hex, http, PublicClient } from "viem"
import { ZeroDevClient } from "@/app/ZeroDevClient"
import { big2Bigint } from "@/app/bn"
import Big from "big.js"
import { useState } from "react"
import { toMerklePolicy, toSignaturePolicy } from "@zerodev/modular-permission/policies"
import { WebAuthnMode } from "@zerodev/modular-permission/signers"
import { clearingHouseABI, vaultABI } from "@/app/types/wagmi/generated"

const zeroDevProjectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID!
const USDT_ADDRESS = "0xA8Eba06366A8ad5E59Ef29477E7a4B384ea648Bf" as Address
const VAULT_ADDRESS = "0xF1D51901302EaF6027BeA4a7D666a1BE337ca6bb" as Address
const CLEARING_HOUSE_ADDRESS = "0x2000d0a1c77fC54EDA12C3ae564d760F7ac7ebf2" as Address
const ORDER_GATEWAY_V2_ADDRESS = "0xCb134B6101494b46506578324EbCbaefcAcFCE20" as Address
const chain = optimismSepolia
const sessionPrivateKey = "0xe9f1d966dba41273a50181fc3c43d739c2b8585653c12a878bb63e161c45e910"
const isSerialized = false
const isUsingSessionKey = true
const webAuthnMode = WebAuthnMode.Login
const passkeyName = "passkey"

export default function Home() {
    const [address, setAddress] = useState<Address>()
    const [userOpHash, setUserOpHash] = useState<Hex>()
    const [signature, setSignature] = useState<Hex>()

    const createPolicies = async (collateralTokenAddress: Address, orderGatewayV2Address: Address, vaultAddress: Address, clearingHouseAddress: Address) => {
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
                    {
                        target: vaultAddress,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: vaultABI,
                        // @ts-ignore
                        functionName: "deposit",
                        args: [null, null],
                    },
                    {
                        target: vaultAddress,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: vaultABI,
                        // @ts-ignore
                        functionName: "withdraw",
                        args: [null],
                    },
                    {
                        target: vaultAddress,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: vaultABI,
                        // @ts-ignore
                        functionName: "transferFundToMargin",
                        args: [null, null],
                    },
                    {
                        target: vaultAddress,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: vaultABI,
                        // @ts-ignore
                        functionName: "transferMarginToFund",
                        args: [null, null],
                    },
                    {
                        target: vaultAddress,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: vaultABI,
                        // @ts-ignore
                        functionName: "setAuthorization",
                        args: [null, null],
                    },
                    {
                        target: clearingHouseAddress,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: clearingHouseABI,
                        // @ts-ignore
                        functionName: "setAuthorization",
                        args: [null, null],
                    },
                ],
            }),
            await toSignaturePolicy({
                allowedRequestors: [orderGatewayV2Address],
            }),
        ]
    }

    function createZeroDevClient() {
        return new ZeroDevClient(
            `https://passkeys.zerodev.app/api/v2/${zeroDevProjectId}`,
            `https://rpc.zerodev.app/api/v2/bundler/${zeroDevProjectId}`,
            `https://rpc.zerodev.app/api/v2/paymaster/${zeroDevProjectId}`,
        )
    }

    async function createKernelClient(publicClient: PublicClient, zeroDevClient: ZeroDevClient) {
        if (isUsingSessionKey) {
            const policies = await createPolicies(USDT_ADDRESS, ORDER_GATEWAY_V2_ADDRESS, VAULT_ADDRESS, CLEARING_HOUSE_ADDRESS)
            const kernelAccount = await zeroDevClient.createPasskeySessionKeyKernelAccount(publicClient, passkeyName, webAuthnMode, policies, sessionPrivateKey)
            if (isSerialized) {
                const serializedSessionKeyAccount = await zeroDevClient.serializeSessionKeyKernelClient(
                    kernelAccount,
                    sessionPrivateKey,
                )
                console.log("using serialized session key")
                return zeroDevClient.deserializeSessionKeyKernelClient(publicClient, serializedSessionKeyAccount, chain)
            } else {
                console.log("using session key")
                return zeroDevClient.createKernelClient(chain, kernelAccount)
            }
        } else {
            const kernelAccount = await zeroDevClient.createPasskeyKernelAccount(publicClient, passkeyName, webAuthnMode)
            console.log("not using session key")
            return zeroDevClient.createKernelClient(chain, kernelAccount)
        }
    }

    const signTypedData = async () => {
        const zeroDevClient = createZeroDevClient()
        const publicClient = createPublicClient({
            chain,
            transport: http(),
        })
        const kernelClient = await createKernelClient(publicClient, zeroDevClient)
        setAddress(kernelClient.account?.address)

        const typeData = {
            account: "0x5D601F03e5EEC050b7ce6C03f89f34cD006C14eB",
            domain: {
                name: "OrderGatewayV2",
                version: "1",
                chainId: 11155420,
                verifyingContract: "0xCb134B6101494b46506578324EbCbaefcAcFCE20",
            },
            types: {
                Order: [
                    { name: "action", type: "uint8" },
                    { name: "marketId", type: "uint256" },
                    { name: "amount", type: "int256" },
                    { name: "price", type: "uint256" },
                    { name: "expiry", type: "uint256" },
                    { name: "tradeType", type: "uint8" },
                    { name: "owner", type: "address" },
                    { name: "marginXCD", type: "uint256" },
                    { name: "relayFee", type: "uint256" },
                    { name: "id", type: "bytes32" }],
            },
            primaryType: "Order",
            message: {
                action: 0,
                marketId: 0n,
                amount: 2545687128687666n,
                price: 1000000000000000000000000000000000000000000n,
                expiry: 1709882290n,
                tradeType: 1,
                owner: "0x5D601F03e5EEC050b7ce6C03f89f34cD006C14eB",
                marginXCD: 5000000n,
                relayFee: 1000000n,
                id: "0x00000000000000000000000000000000336cd3e995be4803a7fe836fb3411deb",
            },
        } as const

        const signature = await zeroDevClient.signTypedData(kernelClient, typeData)
        setSignature(signature)
        console.log("signature", signature)
    }

    const sendUserOps = async () => {
        const zeroDevClient = createZeroDevClient()
        const publicClient = createPublicClient({
            chain,
            transport: http(),
        })
        const kernelClient = await createKernelClient(publicClient, zeroDevClient)
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

        const userOperation = await zeroDevClient.prepareUserOperationRequest(kernelClient, [approveCallData])
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
                <p>signature: {signature}</p>
            </div>
            <button
                className="m-2 p-2 border-2 border-gray-300 rounded-sm"
                onClick={sendUserOps}>
                Send User Ops
            </button>
            <button
                className="m-2 p-2 border-2 border-gray-300 rounded-sm"
                onClick={signTypedData}>
                Sign Type Data
            </button>
        </Web3Provider>
    )
}
