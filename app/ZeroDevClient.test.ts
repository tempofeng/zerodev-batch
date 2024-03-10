import {
    chain,
    MOCK_TYPED_REQUESTOR_ADDRESS,
    ORDER_GATEWAY_V2_ADDRESS,
    UNIVERSAL_SIG_VALIDATOR_ADDRESS,
} from "@/app/constant"
import {
    Address,
    Chain,
    createPublicClient,
    encodeFunctionData,
    hashMessage,
    Hex,
    http,
    Transport,
    verifyTypedData,
} from "viem"
import { beforeEach, describe, expect, test } from "vitest"
import { ZeroDevClient } from "@/app/ZeroDevClient"
import { getAction } from "permissionless"
import { readContract } from "viem/actions"
import { createKernelAccountClient, KernelSmartAccount } from "@zerodev/sdk"
import { safeJsonStringify } from "@walletconnect/safe-json"
import { MockTypedRequestorAbi } from "@/app/types/wagmi/MockTypedRequestorAbi"
import { UniversalSigValidatorAbi } from "@/app/types/wagmi/UniversalSigValidatorAbi"
import { utils } from "ethers"
import { privateKeyToAccount } from "viem/accounts"
import { orderGatewayV2Abi } from "@/app/types/wagmi/generated"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const zeroDevProjectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID!
const sessionPrivateKey = process.env.NEXT_PUBLIC_SESSION_PRIVATE_KEY! as Hex
const serializedSessionKeyAccount = process.env.NEXT_PUBLIC_SERIALIZED_SESSION_KEY_ACCOUNT!

interface TestContext {
    zeroDevClient: ZeroDevClient
    publicClient: ReturnType<typeof createPublicClient>
    kernelClient: ReturnType<typeof createKernelAccountClient<Transport, Chain, KernelSmartAccount>>
}

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
        const message = "Hello, world"
        const signature = await ctx.zeroDevClient.signMessage(ctx.kernelClient, message)
        console.log("signature", signature)

        const isValidOnEip1271 = await getAction(
            ctx.kernelClient.account.client,
            readContract,
        )({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifySignature",
            args: [
                ctx.kernelClient.account.address,
                hashMessage(message),
                signature,
            ],
        })
        console.log("isValidOnEip1271", isValidOnEip1271)
        expect(isValidOnEip1271).toEqual(true)

        const isValidOnUniversalSigValidator = await getAction(
            ctx.kernelClient.account.client,
            readContract,
        )({
            abi: UniversalSigValidatorAbi,
            address: UNIVERSAL_SIG_VALIDATOR_ADDRESS,
            functionName: "isValidSig",
            args: [
                ctx.kernelClient.account.address,
                hashMessage(message),
                signature,
            ],
        })
        console.log("isValidOnUniversalSigValidator", isValidOnUniversalSigValidator)
        expect(isValidOnUniversalSigValidator).toEqual(true)
    })

    function createTypedData(owner: Address, verifyingContract: Address) {
        return {
            domain: {
                name: "OrderGatewayV2",
                version: "1",
                chainId: chain.id,
                verifyingContract: verifyingContract,
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
                owner,
                marginXCD: 5000000n,
                relayFee: 1000000n,
                id: "0x00000000000000000000000000000000336cd3e995be4803a7fe836fb3411deb" as Hex,
            },
        }
    }

    test<TestContext>("test cancelling order", { timeout }, async ctx => {
        const typedData = createTypedData(ctx.kernelClient.account.address, ORDER_GATEWAY_V2_ADDRESS)
        console.log("typedData", safeJsonStringify(typedData))

        const signature = await ctx.zeroDevClient.signTypedData(ctx.kernelClient, typedData)
        console.log("signature", signature)

        const userOperation = await ctx.zeroDevClient.prepareUserOperationRequest(ctx.kernelClient, [{
            to: ORDER_GATEWAY_V2_ADDRESS,
            value: 0n,
            data: encodeFunctionData({
                abi: orderGatewayV2Abi,
                functionName: "cancelOrder",
                args: [{
                    order: typedData.message,
                    signature: signature,
                }],
            }),
        }])
        console.log("userOperation", userOperation)

        const userOpHash = await ctx.zeroDevClient.sendSimulatedUserOperation(ctx.kernelClient, userOperation)
        console.log("userOpHash", userOpHash)

        const receipt = await ctx.zeroDevClient.waitForUserOperationReceipt(ctx.kernelClient, userOpHash)
        console.log("hash", receipt.receipt.transactionHash)

        const response = await ctx.publicClient.simulateContract({
            abi: orderGatewayV2Abi,
            address: ORDER_GATEWAY_V2_ADDRESS,
            functionName: "verifyOrderSignature",
            args: [{
                order: typedData.message,
                signature,
            }],
        })
        console.log("Signature verified response: ", response.result !== undefined)
        expect(response.result !== undefined).toEqual(true)
    })

    test<TestContext>("test signing TypedData on OrderGatewayV2", { timeout }, async ctx => {
        const typedData = createTypedData(ctx.kernelClient.account.address, ORDER_GATEWAY_V2_ADDRESS)
        console.log("typedData", safeJsonStringify(typedData))

        const signature = await ctx.zeroDevClient.signTypedData(ctx.kernelClient, typedData)
        console.log("signature", signature)

        const orderHash = await getAction(
            ctx.kernelClient.account.client,
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
        expect(finalDigest).toEqual(orderHash)

        const isTypedValid = await ctx.publicClient.simulateContract({
            abi: orderGatewayV2Abi,
            address: ORDER_GATEWAY_V2_ADDRESS,
            functionName: "verifyOrderSignature",
            args: [{
                order: typedData.message,
                signature,
            }],
        })
        console.log("isTypedValid", isTypedValid.result !== undefined)
        expect(isTypedValid.result !== undefined).toEqual(true)
    })

    test<TestContext>("test signing TypedData on MockTypedRequestor", { timeout }, async ctx => {
        const typedData = createTypedData(ctx.kernelClient.account.address, MOCK_TYPED_REQUESTOR_ADDRESS)
        console.log("typedData", safeJsonStringify(typedData))

        const signature = await ctx.zeroDevClient.signTypedData(ctx.kernelClient, typedData)
        console.log("signature", signature)

        const orderHash = await getAction(
            ctx.kernelClient.account.client,
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
        expect(finalDigest).toEqual(orderHash)

        const isValidOnEip1271 = await getAction(
            ctx.kernelClient.account.client,
            readContract,
        )({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifySignature",
            args: [
                typedData.message.owner,
                finalDigest,
                signature,
            ],
        })
        console.log("isValidOnEip1271", isValidOnEip1271)

        const isValidOnTypedEip712 = await getAction(
            ctx.kernelClient.account.client,
            readContract,
        )({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifySignature",
            args: [
                typedData.message.owner,
                finalDigest,
                signature,
            ],
        })
        console.log("isValidOnTypedEip712", isValidOnTypedEip712)

        const isValidOnUniversalSigValidator = await getAction(
            ctx.kernelClient.account.client,
            readContract,
        )({
            abi: UniversalSigValidatorAbi,
            address: UNIVERSAL_SIG_VALIDATOR_ADDRESS,
            functionName: "isValidSig",
            args: [
                typedData.message.owner,
                finalDigest,
                signature,
            ],
        })
        console.log("isValidOnUniversalSigValidator", isValidOnUniversalSigValidator)
        expect(isValidOnUniversalSigValidator).toEqual(true)

        const isValidSimpleOrder = await getAction(
            ctx.kernelClient.account.client,
            readContract,
        )({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifySimpleOrderSignature",
            args: [{
                order: {
                    orderHash: finalDigest,
                    owner: typedData.message.owner,
                },
                signature,
            }],
        })
        console.log("isValidSimpleOrder", isValidSimpleOrder)

        const isTypedValid2 = await getAction(
            ctx.kernelClient.account.client,
            readContract,
        )({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifyOrderSignature2",
            args: [{
                order: typedData.message,
                signature,
            }],
        })
        console.log("isTypedValid2", isTypedValid2)

        const isTypedValid3 = await getAction(
            ctx.kernelClient.account.client,
            readContract,
        )({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifyOrderSignature3",
            args: [{
                order: typedData.message,
                signature,
                orderHash: finalDigest,
            }],
        })
        console.log("isTypedValid3", isTypedValid3)

        const isTypedValid = await ctx.publicClient.simulateContract({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifyOrderSignature",
            args: [{
                order: typedData.message,
                signature,
            }],
        })
        console.log("isTypedValid", isTypedValid.result !== undefined)
        expect(isTypedValid.result !== undefined).toEqual(true)
    })

    test<TestContext>("test signing TypedData using a local private key account", { timeout }, async ctx => {
        const sessionKeyAccount = privateKeyToAccount(sessionPrivateKey)
        console.log("sessionKeyAccount", sessionKeyAccount.address)

        const typedData = createTypedData(sessionKeyAccount.address, ORDER_GATEWAY_V2_ADDRESS)
        console.log("typedData", safeJsonStringify(typedData))

        const sigBySessionKey = await sessionKeyAccount.signTypedData({
            domain: typedData.domain,
            types: typedData.types,
            primaryType: "Order",
            message: typedData.message,
        })
        console.log("sigBySessionKey", sigBySessionKey)

        const isValidOffChain = await verifyTypedData({
            address: sessionKeyAccount.address,
            domain: typedData.domain,
            types: typedData.types,
            primaryType: "Order",
            message: typedData.message,
            signature: sigBySessionKey,
        })
        console.log("isValidOffChain", isValidOffChain)
        expect(isValidOffChain).toEqual(true)

        const isTypedValid = await ctx.publicClient.simulateContract({
            abi: orderGatewayV2Abi,
            address: ORDER_GATEWAY_V2_ADDRESS,
            functionName: "verifyOrderSignature",
            args: [{
                order: typedData.message,
                signature: sigBySessionKey,
            }],
        })
        console.log("isTypedValid", isTypedValid.result !== undefined)
        expect(isTypedValid.result !== undefined).toEqual(true)
    })
})
