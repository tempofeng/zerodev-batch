export const MockTypedRequestorAbi = [{
    "inputs": [],
    "name": "InvalidInitialization",
    "type": "error",
}, { "inputs": [], "name": "NotInitializing", "type": "error" }, {
    "anonymous": false,
    "inputs": [],
    "name": "EIP712DomainChanged",
    "type": "event",
}, {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "uint64", "name": "version", "type": "uint64" }],
    "name": "Initialized",
    "type": "event",
}, {
    "inputs": [],
    "name": "ORDER_TYPEHASH",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function",
}, {
    "inputs": [],
    "name": "eip712Domain",
    "outputs": [{ "internalType": "bytes1", "name": "fields", "type": "bytes1" }, {
        "internalType": "string",
        "name": "name",
        "type": "string",
    }, { "internalType": "string", "name": "version", "type": "string" }, {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256",
    }, { "internalType": "address", "name": "verifyingContract", "type": "address" }, {
        "internalType": "bytes32",
        "name": "salt",
        "type": "bytes32",
    }, { "internalType": "uint256[]", "name": "extensions", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function",
}, {
    "inputs": [{
        "components": [{
            "internalType": "enum ActionType",
            "name": "action",
            "type": "uint8",
        }, { "internalType": "uint256", "name": "marketId", "type": "uint256" }, {
            "internalType": "int256",
            "name": "amount",
            "type": "int256",
        }, { "internalType": "uint256", "name": "price", "type": "uint256" }, {
            "internalType": "uint256",
            "name": "expiry",
            "type": "uint256",
        }, { "internalType": "enum TradeType", "name": "tradeType", "type": "uint8" }, {
            "internalType": "address",
            "name": "owner",
            "type": "address",
        }, { "internalType": "uint256", "name": "marginXCD", "type": "uint256" }, {
            "internalType": "uint256",
            "name": "relayFee",
            "type": "uint256",
        }, { "internalType": "bytes32", "name": "id", "type": "bytes32" }],
        "internalType": "struct Order",
        "name": "order",
        "type": "tuple",
    }],
    "name": "getOrderHash",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function",
}, {
    "inputs": [{
        "components": [{
            "components": [{
                "internalType": "enum ActionType",
                "name": "action",
                "type": "uint8",
            }, { "internalType": "uint256", "name": "marketId", "type": "uint256" }, {
                "internalType": "int256",
                "name": "amount",
                "type": "int256",
            }, { "internalType": "uint256", "name": "price", "type": "uint256" }, {
                "internalType": "uint256",
                "name": "expiry",
                "type": "uint256",
            }, { "internalType": "enum TradeType", "name": "tradeType", "type": "uint8" }, {
                "internalType": "address",
                "name": "owner",
                "type": "address",
            }, { "internalType": "uint256", "name": "marginXCD", "type": "uint256" }, {
                "internalType": "uint256",
                "name": "relayFee",
                "type": "uint256",
            }, { "internalType": "bytes32", "name": "id", "type": "bytes32" }],
            "internalType": "struct Order",
            "name": "order",
            "type": "tuple",
        }, { "internalType": "bytes", "name": "signature", "type": "bytes" }],
        "internalType": "struct SignedOrder",
        "name": "signedOrder",
        "type": "tuple",
    }],
    "name": "verifyOrderSignature",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function",
}] as const
