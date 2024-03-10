// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

interface IUniversalSigValidator {
    function isValidSig(address _signer, bytes32 _hash, bytes calldata _signature) external returns (bool);
}


interface KernelERC1271 {
    function isValidSignature(bytes32 hash, bytes calldata signature) external view returns (bytes4);
}

contract MockTypedRequestor is EIP712 {
    enum ActionType {
        OpenPosition,
        ReduceOnly
    }

    enum TradeType {
        PartialFill,
        FoK
    }

    struct Order {
        ActionType action;
        uint256 marketId;
        int256 amount;
        uint256 price;
        uint256 expiry;
        TradeType tradeType;
        address owner;
        uint256 marginXCD;
        uint256 relayFee;
        bytes32 id;
    }

    struct SignedOrder {
        Order order;
        bytes signature;
    }

    struct SignedOrderWithHash {
        Order order;
        bytes signature;
        bytes32 orderHash;
    }

    struct SimpleOrder {
        bytes32 orderHash;
        address owner;
    }

    struct SignedSimpleOrder {
        SimpleOrder order;
        bytes signature;
    }

    constructor() EIP712("OrderGatewayV2", "1") {}

    // keccak256 value: 0x112f24273953496214afa22f35960e8571a3ae064d87213f08f46499ee5faf09
    bytes32 public constant ORDER_TYPEHASH =
    keccak256(
        "Order(uint8 action,uint256 marketId,int256 amount,uint256 price,uint256 expiry,uint8 tradeType,address owner,uint256 marginXCD,uint256 relayFee,bytes32 id)"
    );

    function getOrderHash(Order memory order) public view returns (bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(ORDER_TYPEHASH, order)));
    }

    function verifySignature(address kernel, bytes32 hash, bytes calldata signature) external view returns (bool) {
        return KernelERC1271(kernel).isValidSignature(hash, signature) == 0x1626ba7e;
    }

    function verifyOrderSignature(SignedOrder memory signedOrder) public returns (bool) {
        Order memory order = signedOrder.order;
        bytes32 orderHash = getOrderHash(order);
        return IUniversalSigValidator(0x59799642351a51b263922fc95837Ea55A2CDc7E2).isValidSig(order.owner, orderHash, signedOrder.signature);
    }

    function verifyOrderSignature2(SignedOrder memory signedOrder) public view returns (bool) {
        Order memory order = signedOrder.order;
        bytes32 orderHash = getOrderHash(order);
        return KernelERC1271(order.owner).isValidSignature(orderHash, signedOrder.signature) == 0x1626ba7e;
    }

    function verifyOrderSignature3(SignedOrderWithHash memory signedOrder) public view returns (bool) {
        Order memory order = signedOrder.order;
        bytes32 orderHash = getOrderHash(order);
        assert(orderHash == signedOrder.orderHash);

        return KernelERC1271(order.owner).isValidSignature(signedOrder.orderHash, signedOrder.signature) == 0x1626ba7e;
    }

    function verifySimpleOrderSignature(SignedSimpleOrder memory signedOrder) public view returns (bool) {
        SimpleOrder memory order = signedOrder.order;
        return KernelERC1271(order.owner).isValidSignature(order.orderHash, signedOrder.signature) == 0x1626ba7e;
    }
}