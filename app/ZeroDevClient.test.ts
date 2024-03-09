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
    verifyTypedData,
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
import { UniversalSigValidatorAbi } from "@/app/types/wagmi/UniversalSigValidatorAbi"
import { utils } from "ethers"
import { privateKeyToAccount } from "viem/accounts"

interface TestContext {
    zeroDevClient: ZeroDevClient
    publicClient: ReturnType<typeof createPublicClient>
    kernelClient: ReturnType<typeof createKernelAccountClient<Transport, Chain, KernelSmartAccount>>
}

dotenv.config({ path: ".env.local" })
const zeroDevProjectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID!
const USDT_ADDRESS = "0xA8Eba06366A8ad5E59Ef29477E7a4B384ea648Bf" as Address
const MOCK_REQUESTOR_ADDRESS = "0x7da959782170Ed107ce769e43B4d87bb1F3F6aE5" as Address
const MOCK_TYPED_REQUESTOR_ADDRESS = "0xF553acD6887f3FF17fD7e8CBFC2d2E69aE602511" as Address
const UNIVERSAL_SIG_VALIDATOR_ADDRESS = "0x59799642351a51b263922fc95837Ea55A2CDc7E2" as Address
const chain = optimismSepolia
const serializedSessionKeyAccount = process.env.NEXT_PUBLIC_SERIALIZED_SESSION_KEY_ACCOUNT!
const timeout = 60 * 1000
const sessionPrivateKey = process.env.NEXT_PUBLIC_SESSION_PRIVATE_KEY! as Hex

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
        const message = { raw: ("0xd21946019219e464eb08828e828c5b9319f3419b09ae115db82b652a2390d601" as Hex) }
        const signature = await ctx.zeroDevClient.signMessage(ctx.kernelClient, message)
        console.log("signature", signature)

        const isValidOnEip1271 = await getAction(
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

        const orderTypeHash = keccak256(toHex("Order(uint8 action,uint256 marketId,int256 amount,uint256 price,uint256 expiry,uint8 tradeType,address owner,uint256 marginXCD,uint256 relayFee,bytes32 id)"))
        console.log("orderTypeHash", orderTypeHash)

        const encoded = keccak256(encodeAbiParameters(typedData.types.Order, [0, "0", "2545687128687666", "1000000000000000000000000000000000000000000", "1709882290", 1, ctx.kernelClient.account.address, "5000000", "1000000", "0x00000000000000000000000000000000336cd3e995be4803a7fe836fb3411deb"]))
        console.log("encoded", encoded)

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

    test<TestContext>("test sign TypedData 2", { timeout }, async ctx => {
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
        const signedOrderHash = await ctx.zeroDevClient.signMessage(ctx.kernelClient, { raw: orderHash })
        console.log("signedOrderHash", signedOrderHash)

        const finalDigest = utils._TypedDataEncoder.hash(
            typedData.domain,
            typedData.types,
            typedData.message,
        ) as Hex
        console.log("finalDigest", finalDigest)
        const signedFinalDigest = await ctx.zeroDevClient.signMessage(ctx.kernelClient, { raw: finalDigest })
        console.log("signedFinalDigest", signedFinalDigest)

        const response = await ctx.publicClient.simulateContract({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifyOrderSignature",
            args: [{
                order: typedData.message,
                signature: signedFinalDigest,
            }],
        })
        console.log("Signature verified response: ", response.result)
        expect(response.result).toEqual(true)
    })

    test<TestContext>("test sign TypedData 3", { timeout }, async ctx => {
        const sessionKeyAccount = privateKeyToAccount(sessionPrivateKey)
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
                owner: sessionKeyAccount.address,
                marginXCD: 5000000n,
                relayFee: 1000000n,
                id: "0x00000000000000000000000000000000336cd3e995be4803a7fe836fb3411deb" as Hex,
            },
        }
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

        const response = await ctx.publicClient.simulateContract({
            abi: MockTypedRequestorAbi,
            address: MOCK_TYPED_REQUESTOR_ADDRESS,
            functionName: "verifyOrderSignature",
            args: [{
                order: typedData.message,
                signature: sigBySessionKey,
            }],
        })
        console.log("Signature verified response: ", response.result)
        expect(response.result).toEqual(true)
    })
})
