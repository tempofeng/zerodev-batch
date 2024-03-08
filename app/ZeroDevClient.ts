import {
    createPermissionValidator,
    deserializeModularPermissionAccount,
    serializeModularPermissionAccount,
} from "@zerodev/modular-permission"
import type { Policy } from "@zerodev/modular-permission/policies"
import { toSudoPolicy } from "@zerodev/modular-permission/policies"
import { toECDSASigner, toWebAuthnSigner, WebAuthnMode } from "@zerodev/modular-permission/signers"
import {
    createKernelAccount,
    createKernelAccountClient,
    createZeroDevPaymasterClient,
    KernelAccountAbi,
    KernelSmartAccount,
} from "@zerodev/sdk"
import { bundlerActions, UserOperation, walletClientToSmartAccountSigner } from "permissionless"
import invariant from "tiny-invariant"
import {
    Account,
    Address,
    Chain,
    getAbiItem,
    Hex,
    http,
    PublicClient,
    SignMessageParameters,
    SignTypedDataParameters,
    toFunctionSelector,
    Transport,
    WalletClient,
    zeroAddress,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"

export type CallData = {
    to: Address
    value: bigint
    data: Hex
}

export type CreateKernelAccountClientReturnType = ReturnType<typeof createKernelAccountClient>

export type ZeroDevWalletClient<TChain extends Chain | undefined = Chain | undefined> = WalletClient<
    Transport,
    TChain,
    Account
>

export class ZeroDevClient {
    constructor(
        private readonly passkeyServerUrl: string,
        private readonly bundlerUrl: string,
        private readonly paymasterUrl: string,
    ) {
    }

    async signTypedData(kernelClient: CreateKernelAccountClientReturnType, typedData: SignTypedDataParameters) {
        return kernelClient.signTypedData(typedData)
    }

    async signMessage(kernelClient: CreateKernelAccountClientReturnType, parameters: SignMessageParameters) {
        return kernelClient.signMessage(parameters)
    }

    async sendUserOperation(kernelClient: CreateKernelAccountClientReturnType, callData: CallData[]) {
        const kernelSmartAccount = kernelClient.account
        invariant(kernelSmartAccount, "kernelSmartAccount is undefined")
        const encodedCallData = await kernelSmartAccount.encodeCallData(callData)
        // TODO Don't know why we need account here
        return kernelClient.sendUserOperation({
            account: kernelSmartAccount,
            userOperation: {
                callData: encodedCallData,
            },
        })
    }

    async sendSimulatedUserOperation(kernelClient: CreateKernelAccountClientReturnType, userOperation: UserOperation) {
        const kernelSmartAccount = kernelClient.account
        invariant(kernelSmartAccount, "kernelSmartAccount is undefined")
        // TODO Don't know why we need account here
        return kernelClient.sendUserOperation({
            account: kernelSmartAccount,
            userOperation,
        })
    }

    async prepareUserOperationRequest(
        kernelClient: CreateKernelAccountClientReturnType,
        callData: CallData[],
    ) {
        const kernelSmartAccount = kernelClient.account
        invariant(kernelSmartAccount, "kernelSmartAccount is undefined")
        const encodedCallData = await kernelSmartAccount.encodeCallData(callData)
        return kernelClient.prepareUserOperationRequest({
            userOperation: { callData: encodedCallData },
            account: kernelSmartAccount,
        })
    }

    async waitForUserOperationReceipt(kernelClient: CreateKernelAccountClientReturnType, hash: Hex) {
        return kernelClient.extend(bundlerActions).waitForUserOperationReceipt({ hash })
    }

    async serializeSessionKeyKernelClient(kernelAccount: KernelSmartAccount, sessionPrivateKey: Hex) {
        return serializeModularPermissionAccount(kernelAccount, sessionPrivateKey)
    }

    async createPasskeyKernelAccount(publicClient: PublicClient, passkeyName: string, mode: WebAuthnMode) {
        const rootModularPermissionPlugin = await this.createPasskeyRootModularPermissionPlugin(
            publicClient,
            passkeyName,
            mode,
        )
        return createKernelAccount(publicClient, {
            plugins: {
                sudo: rootModularPermissionPlugin,
            },
        })
    }

    async createPasskeySessionKeyKernelAccount(
        publicClient: PublicClient,
        passkeyName: string,
        mode: WebAuthnMode,
        policies: Policy[],
        sessionPrivateKey: Hex,
    ) {
        const rootModularPermissionPlugin = await this.createPasskeyRootModularPermissionPlugin(
            publicClient,
            passkeyName,
            mode,
        )
        const sessionKeyModularPermissionPlugin = await this.createSessionKeyModularPermissionPlugin(
            publicClient,
            sessionPrivateKey,
            policies,
        )
        return createKernelAccount(publicClient, {
            plugins: {
                sudo: rootModularPermissionPlugin,
                regular: sessionKeyModularPermissionPlugin,
                executorData: {
                    executor: zeroAddress,
                    selector: toFunctionSelector(getAbiItem({ abi: KernelAccountAbi, name: "executeBatch" })),
                },
            },
        })
    }

    private async createPasskeyRootModularPermissionPlugin(
        publicClient: PublicClient,
        passkeyName: string,
        mode: WebAuthnMode,
    ) {
        const webAuthnModularSigner = await toWebAuthnSigner(publicClient, {
            passkeyName,
            passkeyServerUrl: this.passkeyServerUrl,
            mode,
        })
        return createPermissionValidator(publicClient, {
            signer: webAuthnModularSigner,
            policies: [await toSudoPolicy({})],
        })
    }

    private async createEoaRootModularPermissionPlugin(publicClient: PublicClient, walletClient: ZeroDevWalletClient) {
        const eoaSigner = walletClientToSmartAccountSigner(walletClient)
        const eoaEcdsaSigner = toECDSASigner({ signer: eoaSigner })
        return await createPermissionValidator(publicClient, {
            signer: eoaEcdsaSigner,
            policies: [await toSudoPolicy({})],
        })
    }

    private async createSessionKeyModularPermissionPlugin(
        publicClient: PublicClient,
        sessionPrivateKey: Hex,
        policies: Policy[],
    ) {
        const sessionKeyAccount = privateKeyToAccount(sessionPrivateKey)
        const sessionKeySigner = toECDSASigner({ signer: sessionKeyAccount })
        return createPermissionValidator(publicClient, {
            signer: sessionKeySigner,
            policies,
        })
    }

    async createEoaSessionKeyKernelAccount(
        publicClient: PublicClient,
        walletClient: ZeroDevWalletClient,
        sessionPrivateKey: Hex,
        policies: Policy[],
    ) {
        const rootModularPermissionPlugin = await this.createEoaRootModularPermissionPlugin(publicClient, walletClient)
        const sessionKeyModularPermissionPlugin = await this.createSessionKeyModularPermissionPlugin(
            publicClient,
            sessionPrivateKey,
            policies,
        )
        return createKernelAccount(publicClient, {
            plugins: {
                sudo: rootModularPermissionPlugin,
                regular: sessionKeyModularPermissionPlugin,
            },
        })
    }

    async deserializeSessionKeyKernelClient(
        publicClient: PublicClient,
        serializedSessionKeyAccount: string,
        chain: Chain,
    ) {
        const sessionKeyAccount = await deserializeModularPermissionAccount(publicClient, serializedSessionKeyAccount)
        return this.createKernelClient(chain, sessionKeyAccount as any)
    }

    createKernelClient(chain: Chain, kernelAccount: KernelSmartAccount) {
        return createKernelAccountClient({
            account: kernelAccount,
            chain,
            transport: http(this.bundlerUrl),
            sponsorUserOperation: async ({ userOperation }) => {
                const zerodevPaymaster = createZeroDevPaymasterClient({
                    chain,
                    transport: http(this.paymasterUrl),
                })
                return zerodevPaymaster.sponsorUserOperation({
                    userOperation,
                })
            },
        })
    }
}
