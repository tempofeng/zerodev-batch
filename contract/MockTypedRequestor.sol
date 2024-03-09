// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import { EIP712Upgradeable } from "./EIP712Upgradeable.sol";

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


interface IUniversalSigValidator {
    function isValidSig(address _signer, bytes32 _hash, bytes calldata _signature) external returns (bool);
}


contract MockTypedRequestor is EIP712Upgradeable {
    // keccak256 value: 0x112f24273953496214afa22f35960e8571a3ae064d87213f08f46499ee5faf09
    bytes32 public constant ORDER_TYPEHASH =
        keccak256(
            "Order(uint8 action,uint256 marketId,int256 amount,uint256 price,uint256 expiry,uint8 tradeType,address owner,uint256 marginXCD,uint256 relayFee,bytes32 id)"
        );

    function getOrderHash(Order memory order) public view returns (bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(ORDER_TYPEHASH, order)));
    }


    function verifyOrderSignature(SignedOrder memory signedOrder) public returns (bool) {
        Order memory order = signedOrder.order;
        bytes32 orderHash = getOrderHash(order);
        return IUniversalSigValidator(0x59799642351a51b263922fc95837Ea55A2CDc7E2).isValidSig(order.owner, orderHash, signedOrder.signature);
    }
}