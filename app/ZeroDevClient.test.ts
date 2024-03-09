import {
    Address,
    Chain,
    createPublicClient,
    encodeAbiParameters,
    hashMessage,
    Hex,
    http,
    keccak256,
    toHex,
    Transport,
} from "viem"
import { optimismSepolia } from "viem/chains"
import { beforeEach, describe, expect, test } from "vitest"
import { ZeroDevClient } from "@/app/ZeroDevClient"
import * as dotenv from "dotenv"
import { getAction } from "permissionless"
import { readContract } from "viem/actions"
import { MockRequestorAbi } from "@/app/types/wagmi/MockRequestorAbi"
import { createKernelAccountClient, KernelSmartAccount } from "@zerodev/sdk"
import { safeJsonStringify } from "@walletconnect/safe-json"
import { MockTypedRequestorAbi } from "@/app/types/wagmi/MockTypedRequestorAbi"

interface TestContext {
    zeroDevClient: ZeroDevClient
    publicClient: ReturnType<typeof createPublicClient>
    kernelClient: ReturnType<typeof createKernelAccountClient<Transport, Chain, KernelSmartAccount>>
}

dotenv.config({ path: ".env.local" })
const zeroDevProjectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID!
const USDT_ADDRESS = "0xA8Eba06366A8ad5E59Ef29477E7a4B384ea648Bf" as Address
const MOCK_REQUESTOR_ADDRESS = "0x7da959782170Ed107ce769e43B4d87bb1F3F6aE5" as Address
const MOCK_TYPED_REQUESTOR_ADDRESS = "0x42efAb462A1279b23A0Ced295c91fb9Bd26E55D7" as Address
const chain = optimismSepolia
const serializedSessionKeyAccount = process.env.NEXT_PUBLIC_SERIALIZED_SESSION_KEY_ACCOUNT!
const timeout = 60 * 1000

describe("ZeroDevClient test", () => {
    beforeEach<TestContext>(async ctx => {

        ctx.zeroDevClient = new ZeroDevClient(
            `https://passkeys.zerodev.app/api/v2/${zeroDevProjectId}`,
            `https://rpc.zerodev.app/api/v2/bundler/${zeroDevProjectId}`,
            `https://rpc.zerodev.app/api/v2/paymaster/${zeroDevProjectId}`,
        )

        ctx.publicClient = createPublicClient({
            chain,
            transport: http(),
        })

        ctx.kernelClient = await ctx.zeroDevClient.deserializeSessionKeyKernelClient(
            ctx.publicClient,
            serializedSessionKeyAccount,
            chain,
        )
        console.log("kernelClient", ctx.kernelClient.account.address)
    })

    test<TestContext>("test sign message", { timeout }, async ctx => {
        const message = "Hello, world!"
        const signature = await ctx.zeroDevClient.signMessage(ctx.kernelClient, message)
        console.log("signature", signature)

        const response = await getAction(
            ctx.kernelClient.account.client,
            readContract,
        )({
            abi: MockRequestorAbi,
            address: MOCK_REQUESTOR_ADDRESS,
            functionName: "verifySignature",
            args: [
                ctx.kernelClient.account.address,
                hashMessage(message),
                signature,
            ],
        })
        console.log("Signature verified response: ", response)
        expect(response).toEqual(true)
    })

    test<TestContext>("test sign TypedData", { timeout }, async ctx => {
        const typedData = {
            domain: {
                name: "MockTypedRequestor",
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
                owner: ctx.kernelClient.account.address,
                marginXCD: 5000000n,
                relayFee: 1000000n,
                id: "0x00000000000000000000000000000000336cd3e995be4803a7fe836fb3411deb" as Hex,
            },
        }
        console.log("typedData", safeJsonStringify(typedData))

        const signature = await ctx.zeroDevClient.signTypedData(ctx.kernelClient, typedData)
        console.log("signature", signature)

        const response = await ctx.publicClient.simulateContract({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifyOrderSignature",
            args: [{
                order: typedData.message,
                signature,
            }],
        })
        console.log("Signature verified response: ", response.result)
        expect(response.result).toEqual(true)
    })


    test<TestContext>("test sign TypedData", { timeout }, async ctx => {
        const typedData = {
            domain: {
                name: "MockTypedRequestor",
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
                owner: ctx.kernelClient.account.address,
                marginXCD: 5000000n,
                relayFee: 1000000n,
                id: "0x00000000000000000000000000000000336cd3e995be4803a7fe836fb3411deb" as Hex,
            },
        }
        console.log("typedData", safeJsonStringify(typedData))

        const signature = await ctx.zeroDevClient.signTypedData(ctx.kernelClient, typedData)
        console.log("signature", signature)

        const orderTypeHash = keccak256(toHex("Order(uint8 action,uint256 marketId,int256 amount,uint256 price,uint256 expiry,uint8 tradeType,address owner,uint256 marginXCD,uint256 relayFee,bytes32 id)"))

        const encoded = keccak256(encodeAbiParameters(typedData.types.Order, [typedData.message]))



        const response = await ctx.publicClient.simulateContract({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifyOrderSignature",
            args: [{
                order: typedData.message,
                signature,
            }],
        })
        console.log("Signature verified response: ", response.result)
        expect(response.result).toEqual(true)
    })
})
