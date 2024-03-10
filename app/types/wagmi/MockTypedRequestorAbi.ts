export const MockTypedRequestorAbi = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor",
}, { "inputs": [], "name": "InvalidShortString", "type": "error" }, {
    "inputs": [{
        "internalType": "string",
        "name": "str",
        "type": "string",
    }], "name": "StringTooLong", "type": "error",
}, { "anonymous": false, "inputs": [], "name": "EIP712DomainChanged", "type": "event" }, {
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
            "internalType": "enum MockTypedRequestor.ActionType",
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
        }, {
            "internalType": "enum MockTypedRequestor.TradeType",
            "name": "tradeType",
            "type": "uint8",
        }, { "internalType": "address", "name": "owner", "type": "address" }, {
            "internalType": "uint256",
            "name": "marginXCD",
            "type": "uint256",
        }, { "internalType": "uint256", "name": "relayFee", "type": "uint256" }, {
            "internalType": "bytes32",
            "name": "id",
            "type": "bytes32",
        }], "internalType": "struct MockTypedRequestor.Order", "name": "order", "type": "tuple",
    }],
    "name": "getOrderHash",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function",
}, {
    "inputs": [{
        "components": [{
            "components": [{
                "internalType": "enum MockTypedRequestor.ActionType",
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
            }, {
                "internalType": "enum MockTypedRequestor.TradeType",
                "name": "tradeType",
                "type": "uint8",
            }, { "internalType": "address", "name": "owner", "type": "address" }, {
                "internalType": "uint256",
                "name": "marginXCD",
                "type": "uint256",
            }, { "internalType": "uint256", "name": "relayFee", "type": "uint256" }, {
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32",
            }], "internalType": "struct MockTypedRequestor.Order", "name": "order", "type": "tuple",
        }, { "internalType": "bytes", "name": "signature", "type": "bytes" }],
        "internalType": "struct MockTypedRequestor.SignedOrder",
        "name": "signedOrder",
        "type": "tuple",
    }],
    "name": "verifyOrderSignature",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function",
}, {
    "inputs": [{
        "components": [{
            "components": [{
                "internalType": "enum MockTypedRequestor.ActionType",
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
            }, {
                "internalType": "enum MockTypedRequestor.TradeType",
                "name": "tradeType",
                "type": "uint8",
            }, { "internalType": "address", "name": "owner", "type": "address" }, {
                "internalType": "uint256",
                "name": "marginXCD",
                "type": "uint256",
            }, { "internalType": "uint256", "name": "relayFee", "type": "uint256" }, {
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32",
            }], "internalType": "struct MockTypedRequestor.Order", "name": "order", "type": "tuple",
        }, { "internalType": "bytes", "name": "signature", "type": "bytes" }],
        "internalType": "struct MockTypedRequestor.SignedOrder",
        "name": "signedOrder",
        "type": "tuple",
    }],
    "name": "verifyOrderSignature2",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function",
}, {
    "inputs": [{
        "components": [{
            "components": [{
                "internalType": "enum MockTypedRequestor.ActionType",
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
            }, {
                "internalType": "enum MockTypedRequestor.TradeType",
                "name": "tradeType",
                "type": "uint8",
            }, { "internalType": "address", "name": "owner", "type": "address" }, {
                "internalType": "uint256",
                "name": "marginXCD",
                "type": "uint256",
            }, { "internalType": "uint256", "name": "relayFee", "type": "uint256" }, {
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32",
            }], "internalType": "struct MockTypedRequestor.Order", "name": "order", "type": "tuple",
        }, { "internalType": "bytes", "name": "signature", "type": "bytes" }, {
            "internalType": "bytes32",
            "name": "orderHash",
            "type": "bytes32",
        }], "internalType": "struct MockTypedRequestor.SignedOrderWithHash", "name": "signedOrder", "type": "tuple",
    }],
    "name": "verifyOrderSignature3",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function",
}, {
    "inputs": [{ "internalType": "address", "name": "kernel", "type": "address" }, {
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32",
    }, { "internalType": "bytes", "name": "signature", "type": "bytes" }],
    "name": "verifySignature",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function",
}, {
    "inputs": [{
        "components": [{
            "components": [{
                "internalType": "bytes32",
                "name": "orderHash",
                "type": "bytes32",
            }, { "internalType": "address", "name": "owner", "type": "address" }],
            "internalType": "struct MockTypedRequestor.SimpleOrder",
            "name": "order",
            "type": "tuple",
        }, { "internalType": "bytes", "name": "signature", "type": "bytes" }],
        "internalType": "struct MockTypedRequestor.SignedSimpleOrder",
        "name": "signedOrder",
        "type": "tuple",
    }],
    "name": "verifySimpleOrderSignature",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function",
}] as const