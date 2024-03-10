import { Address, Hex } from "viem"
import { optimismSepolia } from "viem/chains"
import { WebAuthnMode } from "@zerodev/modular-permission/signers"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

export const zeroDevProjectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID!
export const USDT_ADDRESS = "0xA8Eba06366A8ad5E59Ef29477E7a4B384ea648Bf" as Address
export const VAULT_ADDRESS = "0xF1D51901302EaF6027BeA4a7D666a1BE337ca6bb" as Address
export const CLEARING_HOUSE_ADDRESS = "0x2000d0a1c77fC54EDA12C3ae564d760F7ac7ebf2" as Address
export const ORDER_GATEWAY_V2_ADDRESS = "0xCb134B6101494b46506578324EbCbaefcAcFCE20" as Address
export const MOCK_REQUESTOR_ADDRESS = "0x7da959782170Ed107ce769e43B4d87bb1F3F6aE5" as Address
export const MOCK_TYPED_REQUESTOR_ADDRESS = "0x9fe5dd32684fE8B6E8666De11450B4fB862CDc63" as Address
export const UNIVERSAL_SIG_VALIDATOR_ADDRESS = "0x59799642351a51b263922fc95837Ea55A2CDc7E2" as Address
export const chain = optimismSepolia
export const sessionPrivateKey = process.env.NEXT_PUBLIC_SESSION_PRIVATE_KEY! as Hex
export const isSerialized = true
export const isUsingSessionKey = true
export const webAuthnMode = WebAuthnMode.Login
export const passkeyName = "passkey"
export const useAmbireSignatureValidator = false
export const serializedSessionKeyAccount = process.env.NEXT_PUBLIC_SERIALIZED_SESSION_KEY_ACCOUNT!
