"use client"

import { Web3Provider } from "./Web3Provider"
import { Address, createPublicClient, encodeFunctionData, erc20Abi, hashMessage, Hex, http, PublicClient } from "viem"
import { ZeroDevClient } from "@/app/ZeroDevClient"
import { big2Bigint } from "@/app/bn"
import Big from "big.js"
import { useState } from "react"
import { toMerklePolicy, toSignaturePolicy } from "@zerodev/modular-permission/policies"
import { utils } from "ethers"
import { getAction } from "permissionless"
import { readContract } from "viem/actions"
import { safeJsonStringify } from "@walletconnect/safe-json"
import { clearingHouseAbi, orderGatewayV2Abi, vaultAbi } from "./types/wagmi/generated"
import {
    chain,
    CLEARING_HOUSE_ADDRESS,
    MOCK_TYPED_REQUESTOR_ADDRESS,
    ORDER_GATEWAY_V2_ADDRESS,
    PERP_UNIVERSAL_SIG_VALIDATOR_ADDRESS,
    UNIVERSAL_SIG_VALIDATOR_ADDRESS,
    USDT_ADDRESS,
    VAULT_ADDRESS,
} from "@/app/constant"
import { WebAuthnMode } from "@zerodev/modular-permission/signers"
import { MockTypedRequestorAbi } from "@/app/types/wagmi/MockTypedRequestorAbi"
import { generatePrivateKey } from "viem/accounts"
import { UniversalSigValidatorAbi } from "@/app/types/wagmi/UniversalSigValidatorAbi"

const zeroDevProjectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID!

const isSerialized = false
const isUsingSessionKey = true

export default function Home() {
    const [address, setAddress] = useState<Address>()
    const [userOpHash, setUserOpHash] = useState<Hex>()
    const [signature, setSignature] = useState<Hex>()
    const [isValidSig, setIsValidSig] = useState<boolean>()
    const [webAuthnMode, setWebAuthnMode] = useState(WebAuthnMode.Login)
    const [passkeyName, setPasskeyName] = useState("passkey")
    const [sessionPrivateKey, setSessionPrivateKey] = useState(generatePrivateKey())

    const createPolicies = async () => {
        return [
            await toMerklePolicy({
                permissions: [
                    {
                        target: USDT_ADDRESS,
                        valueLimit: BigInt(0),
                        abi: erc20Abi,
                        functionName: "approve",
                        args: [null, null],
                    },
                    {
                        target: VAULT_ADDRESS,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: vaultAbi,
                        // @ts-ignore
                        functionName: "deposit",
                        args: [null, null],
                    },
                    {
                        target: VAULT_ADDRESS,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: vaultAbi,
                        // @ts-ignore
                        functionName: "withdraw",
                        args: [null],
                    },
                    {
                        target: VAULT_ADDRESS,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: vaultAbi,
                        // @ts-ignore
                        functionName: "transferFundToMargin",
                        args: [null, null],
                    },
                    {
                        target: VAULT_ADDRESS,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: vaultAbi,
                        // @ts-ignore
                        functionName: "transferMarginToFund",
                        args: [null, null],
                    },
                    {
                        target: VAULT_ADDRESS,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: vaultAbi,
                        // @ts-ignore
                        functionName: "setAuthorization",
                        args: [null, null],
                    },
                    {
                        target: CLEARING_HOUSE_ADDRESS,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: clearingHouseAbi,
                        // @ts-ignore
                        functionName: "setAuthorization",
                        args: [null, null],
                    },
                    {
                        target: ORDER_GATEWAY_V2_ADDRESS,
                        valueLimit: BigInt(0),
                        // @ts-ignore
                        abi: orderGatewayV2Abi,
                        // @ts-ignore
                        functionName: "cancelOrder",
                        args: [null, null],
                    },
                ],
            }),
            await toSignaturePolicy({
                allowedRequestors: [PERP_UNIVERSAL_SIG_VALIDATOR_ADDRESS, UNIVERSAL_SIG_VALIDATOR_ADDRESS],
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
            const policies = await createPolicies()
            const kernelAccount = await zeroDevClient.createPasskeySessionKeyKernelAccount(publicClient, passkeyName, webAuthnMode, policies, sessionPrivateKey)
            if (isSerialized) {
                const serializedSessionKeyAccount = await zeroDevClient.serializeSessionKeyKernelClient(
                    kernelAccount,
                    sessionPrivateKey,
                )
                console.log("using serialized session key")
                console.log("serializedSessionKeyAccount", serializedSessionKeyAccount)
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

    const signMessage = async () => {
        const zeroDevClient = createZeroDevClient()
        const publicClient = createPublicClient({
            chain,
            transport: http(),
        })
        const kernelClient = await createKernelClient(publicClient, zeroDevClient)
        setAddress(kernelClient.account?.address)

        const message = "Hello, world"
        const signature = await zeroDevClient.signMessage(kernelClient, message)
        setSignature(signature)
        console.log("signature", signature)

        const isValidOnUniversalSigValidator = await getAction(
            kernelClient.account.client,
            readContract,
        )({
            abi: UniversalSigValidatorAbi,
            address: UNIVERSAL_SIG_VALIDATOR_ADDRESS,
            functionName: "isValidSig",
            args: [
                kernelClient.account.address,
                hashMessage(message),
                signature,
            ],
        })
        console.log("isValidOnUniversalSigValidator", isValidOnUniversalSigValidator)

        const isValidOnEip1271 = await getAction(
            kernelClient.account.client,
            readContract,
        )({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifySignature",
            args: [
                kernelClient.account.address,
                hashMessage(message),
                signature,
            ],
        })
        console.log("isValidOnEip1271", isValidOnEip1271)
        setIsValidSig(isValidOnEip1271)
    }

    const signTypedData = async () => {
        const zeroDevClient = createZeroDevClient()
        const publicClient = createPublicClient({
            chain,
            transport: http(),
        })
        const kernelClient = await createKernelClient(publicClient, zeroDevClient)
        setAddress(kernelClient.account?.address)

        const typedData = {
            domain: {
                name: "OrderGatewayV2",
                version: "1",
                chainId: 11155420,
                verifyingContract: MOCK_TYPED_REQUESTOR_ADDRESS,
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
                owner: kernelClient.account.address,
                marginXCD: 5000000n,
                relayFee: 1000000n,
                id: "0x00000000000000000000000000000000336cd3e995be4803a7fe836fb3411deb" as Hex,
            },
        }
        console.log("typedData", safeJsonStringify(typedData))

        const orderHash = await getAction(
            kernelClient.account.client,
            readContract,
        )({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "getOrderHash",
            args: [typedData.message],
        }) as Hex
        console.log("orderHash", orderHash)

        const finalDigest = utils._TypedDataEncoder.hash(
            typedData.domain,
            typedData.types,
            typedData.message,
        ) as Hex
        console.log("finalDigest", finalDigest)

        const signature = await zeroDevClient.signTypedData(kernelClient, typedData)
        setSignature(signature)
        console.log("signature", signature)

        const response = await publicClient.simulateContract({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifyOrderSignature",
            args: [{
                order: typedData.message,
                signature,
            }],
        })
        console.log("Signature verified response: ", response.result !== undefined)
        setIsValidSig(response.result !== undefined)
    }

    const signTypedDataOnOrderGatewayV2 = async () => {
        const zeroDevClient = createZeroDevClient()
        const publicClient = createPublicClient({
            chain,
            transport: http(),
        })
        const kernelClient = await createKernelClient(publicClient, zeroDevClient)
        setAddress(kernelClient.account?.address)

        const typedData = {
            domain: {
                name: "OrderGatewayV2",
                version: "1",
                chainId: 11155420,
                verifyingContract: ORDER_GATEWAY_V2_ADDRESS,
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
                owner: kernelClient.account.address,
                marginXCD: 5000000n,
                relayFee: 1000000n,
                id: "0x00000000000000000000000000000000336cd3e995be4803a7fe836fb3411deb" as Hex,
            },
        }
        console.log("typedData", safeJsonStringify(typedData))

        const orderHash = await getAction(
            kernelClient.account.client,
            readContract,
        )({
            abi: orderGatewayV2Abi,
            address: ORDER_GATEWAY_V2_ADDRESS,
            functionName: "getOrderHash",
            args: [typedData.message],
        }) as Hex
        console.log("orderHash", orderHash)

        const finalDigest = utils._TypedDataEncoder.hash(
            typedData.domain,
            typedData.types,
            typedData.message,
        ) as Hex
        console.log("finalDigest", finalDigest)

        const signature = await zeroDevClient.signTypedData(kernelClient, typedData)
        setSignature(signature)
        console.log("signature", signature)

        const response = await publicClient.simulateContract({
            abi: orderGatewayV2Abi,
            address: ORDER_GATEWAY_V2_ADDRESS,
            functionName: "verifyOrderSignature",
            args: [{
                order: typedData.message,
                signature,
            }],
        })
        console.log("Signature verified response: ", response.result !== undefined)
        setIsValidSig(response.result !== undefined)
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
            <main className="flex flex-col items-center p-24 font-mono">
                <div className="z-10 w-full items-center justify-between text-lg lg:flex pt-3 pb-3">
                    <h1 className="underline">Clean example</h1>
                </div>
                <div className="z-10 w-full items-center text-sm">
                    <p>wallet: {address}</p>
                    <p>userOpHash: {userOpHash}</p>
                    <p>signature: {signature}</p>
                    <p>isValidSig: {String(isValidSig)}</p>
                </div>
                <div className="z-10 w-full items-center text-sm lg:flex m-2 p-2">
                    <input className="text-gray-700 w-full p-2" value={sessionPrivateKey}
                           onChange={e => setSessionPrivateKey(e.target.value as Hex)}></input>
                    <button
                        className="m-2 p-2 border-2 border-gray-300 rounded-sm"
                        onClick={() => setSessionPrivateKey(generatePrivateKey())}>
                        Regenerate Private Key
                    </button>
                </div>
                <div className="z-10 w-full items-center text-sm lg:flex m-2 p-2">
                    <input className="text-gray-700 w-full p-2" value={passkeyName} onChange={e => setPasskeyName(e.target.value)}></input>
                    <select className="text-gray-700 w-full p-2 m-4" value={webAuthnMode}
                            onChange={e => setWebAuthnMode(e.target.value === "login" ? WebAuthnMode.Login : WebAuthnMode.Register)}>
                        <option value="login">Login</option>
                        <option value="register">Register</option>
                    </select>
                </div>
                <div className="z-10 w-full items-center justify-between text-sm lg:flex m-4">
                    <button
                        className="m-2 p-2 border-2 border-gray-300 rounded-sm"
                        onClick={sendUserOps}>
                        Send User Ops
                    </button>
                    <button
                        className="m-2 p-2 border-2 border-gray-300 rounded-sm"
                        onClick={signMessage}>
                        Sign Message
                    </button>
                    <button
                        className="m-2 p-2 border-2 border-gray-300 rounded-sm"
                        onClick={signTypedDataOnOrderGatewayV2}>
                        Sign Type Data on OrderGatewayV2
                    </button>
                    <button
                        className="m-2 p-2 border-2 border-gray-300 rounded-sm"
                        onClick={signTypedData}>
                        Sign Type Data on MockTypedRequestor
                    </button>
                </div>
            </main>
        </Web3Provider>
    )
}
