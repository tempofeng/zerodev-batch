import Big from "big.js"

export function big2Bigint(val: Big, decimals = 0): bigint {
    return BigInt(val.mul(new Big(10).pow(decimals)).toFixed())
}
