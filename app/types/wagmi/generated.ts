//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BorrowingFee
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const borrowingFeeAbi = [
    { type: "constructor", inputs: [], stateMutability: "nonpayable" },
    { type: "error", inputs: [], name: "InvalidInitialization" },
    { type: "error", inputs: [], name: "InvalidPosition" },
    { type: "error", inputs: [{ name: "ratio", internalType: "uint256", type: "uint256" }], name: "InvalidRatio" },
    { type: "error", inputs: [{ name: "taker", internalType: "address", type: "address" }], name: "InvalidTaker" },
    { type: "error", inputs: [], name: "NotInitializing" },
    {
        type: "error",
        inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
        name: "SafeCastOverflowedUintToInt",
    },
    { type: "error", inputs: [], name: "Unauthorized" },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "trader", internalType: "address", type: "address", indexed: true },
            { name: "borrowingFee", internalType: "int256", type: "int256", indexed: false },
        ],
        name: "BorrowingFeeSettled",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint64", type: "uint64", indexed: false }],
        name: "Initialized",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "longMaxBorowingFeeRate", internalType: "uint256", type: "uint256", indexed: false },
            { name: "shortMaxBorowingFeeRate", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldLongMaxBorowingFeeRate", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldShortMaxBorowingFeeRate", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "MaxBorrowingFeeRateSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "longUtilRatio", internalType: "uint256", type: "uint256", indexed: false },
            { name: "shortUtilRatio", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldLongUtilRatio", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldShortUtilRatio", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "UtilRatioChanged",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "maker", internalType: "address", type: "address" },
        ],
        name: "afterSettlePosition",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "afterUpdateMargin",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "taker", internalType: "address", type: "address" },
            { name: "maker", internalType: "address", type: "address" },
            { name: "takerPositionSizeDelta", internalType: "int256", type: "int256" },
            { name: "takerOpenNotionalDelta", internalType: "int256", type: "int256" },
        ],
        name: "beforeSettlePosition",
        outputs: [
            { name: "", internalType: "int256", type: "int256" },
            { name: "", internalType: "int256", type: "int256" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "beforeUpdateMargin",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [],
        name: "getAddressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getMaxBorrowingFeeRate",
        outputs: [
            { name: "", internalType: "uint256", type: "uint256" },
            { name: "", internalType: "uint256", type: "uint256" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getPendingFee",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getTotalPayerOpenNotional",
        outputs: [
            { name: "", internalType: "uint256", type: "uint256" },
            { name: "", internalType: "uint256", type: "uint256" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getTotalReceiverOpenNotional",
        outputs: [
            { name: "", internalType: "uint256", type: "uint256" },
            { name: "", internalType: "uint256", type: "uint256" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getUtilRatio",
        outputs: [
            { name: "", internalType: "uint256", type: "uint256" },
            { name: "", internalType: "uint256", type: "uint256" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "addressManager", internalType: "address", type: "address" }],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "maxLongBorrowingFeeRate", internalType: "uint256", type: "uint256" },
            { name: "maxShortBorrowingFeeRate", internalType: "uint256", type: "uint256" },
        ],
        name: "setMaxBorrowingFeeRate",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const

export const borrowingFeeAddress = "0x2659e38840D59aD7fF5138cD822fc68716cFD1D1" as const

export const borrowingFeeConfig = { address: borrowingFeeAddress, abi: borrowingFeeAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ClearingHouse
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const clearingHouseAbi = [
    { type: "constructor", inputs: [], stateMutability: "nonpayable" },
    { type: "error", inputs: [], name: "AuthorizationAlreadySet" },
    {
        type: "error",
        inputs: [
            { name: "authorizer", internalType: "address", type: "address" },
            { name: "authorized", internalType: "address", type: "address" },
        ],
        name: "AuthorizerNotAllow",
    },
    { type: "error", inputs: [], name: "CannotLiquidateWhitelistedMaker" },
    { type: "error", inputs: [], name: "DeadlineExceeded" },
    {
        type: "error",
        inputs: [
            { name: "actual", internalType: "uint256", type: "uint256" },
            { name: "target", internalType: "uint256", type: "uint256" },
        ],
        name: "ExcessiveInputAmount",
    },
    {
        type: "error",
        inputs: [
            { name: "trader", internalType: "address", type: "address" },
            { name: "relayer", internalType: "address", type: "address" },
            { name: "relayFee", internalType: "uint256", type: "uint256" },
            { name: "maxRelayFee", internalType: "uint256", type: "uint256" },
        ],
        name: "ExcessiveRelayFee",
    },
    {
        type: "error",
        inputs: [
            { name: "actual", internalType: "uint256", type: "uint256" },
            { name: "target", internalType: "uint256", type: "uint256" },
        ],
        name: "InsufficientOutputAmount",
    },
    { type: "error", inputs: [], name: "InvalidInitialization" },
    { type: "error", inputs: [], name: "InvalidMakerData" },
    { type: "error", inputs: [{ name: "sender", internalType: "address", type: "address" }], name: "InvalidSender" },
    {
        type: "error",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "NotEnoughFreeCollateral",
    },
    { type: "error", inputs: [], name: "NotInitializing" },
    {
        type: "error",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "NotLiquidatable",
    },
    { type: "error", inputs: [], name: "NotWhitelistedAuthorization" },
    {
        type: "error",
        inputs: [
            { name: "tradePrice", internalType: "uint256", type: "uint256" },
            { name: "lowerPrice", internalType: "uint256", type: "uint256" },
            { name: "upperPrice", internalType: "uint256", type: "uint256" },
        ],
        name: "PriceOutOfBound",
    },
    {
        type: "error",
        inputs: [
            { name: "base", internalType: "int256", type: "int256" },
            { name: "quote", internalType: "int256", type: "int256" },
        ],
        name: "QuoteResult",
    },
    { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
    {
        type: "error",
        inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
        name: "SafeCastOverflowedUintToInt",
    },
    { type: "error", inputs: [], name: "ZeroAmount" },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "authorizer", internalType: "address", type: "address", indexed: true },
            { name: "authorized", internalType: "address", type: "address", indexed: true },
            { name: "isAuthorized", internalType: "bool", type: "bool", indexed: false },
        ],
        name: "AuthorizationSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint64", type: "uint64", indexed: false }],
        name: "Initialized",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "liquidator", internalType: "address", type: "address", indexed: true },
            { name: "trader", internalType: "address", type: "address", indexed: true },
            { name: "positionSizeDelta", internalType: "int256", type: "int256", indexed: false },
            { name: "positionNotionalDelta", internalType: "int256", type: "int256", indexed: false },
            { name: "price", internalType: "uint256", type: "uint256", indexed: false },
            { name: "penalty", internalType: "uint256", type: "uint256", indexed: false },
            { name: "liquidationFeeToLiquidator", internalType: "uint256", type: "uint256", indexed: false },
            { name: "liquidationFeeToProtocol", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "Liquidated",
    },
    {
        type: "function",
        inputs: [
            {
                name: "params",
                internalType: "struct IClearingHouse.ClosePositionParams",
                type: "tuple",
                components: [
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "maker", internalType: "address", type: "address" },
                    { name: "oppositeAmountBound", internalType: "uint256", type: "uint256" },
                    { name: "deadline", internalType: "uint256", type: "uint256" },
                    { name: "makerData", internalType: "bytes", type: "bytes" },
                ],
            },
        ],
        name: "closePosition",
        outputs: [
            { name: "", internalType: "int256", type: "int256" },
            { name: "", internalType: "int256", type: "int256" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            {
                name: "params",
                internalType: "struct IClearingHouse.ClosePositionForParams",
                type: "tuple",
                components: [
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "maker", internalType: "address", type: "address" },
                    { name: "oppositeAmountBound", internalType: "uint256", type: "uint256" },
                    { name: "deadline", internalType: "uint256", type: "uint256" },
                    { name: "makerData", internalType: "bytes", type: "bytes" },
                    { name: "taker", internalType: "address", type: "address" },
                    { name: "takerRelayFee", internalType: "uint256", type: "uint256" },
                    { name: "makerRelayFee", internalType: "uint256", type: "uint256" },
                ],
            },
        ],
        name: "closePositionFor",
        outputs: [
            { name: "", internalType: "int256", type: "int256" },
            { name: "", internalType: "int256", type: "int256" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "encoded", internalType: "bytes", type: "bytes" }],
        name: "decodeMakerOrder",
        outputs: [
            {
                name: "",
                internalType: "struct IClearingHouse.MakerOrder",
                type: "tuple",
                components: [{ name: "amount", internalType: "uint256", type: "uint256" }],
            },
        ],
        stateMutability: "pure",
    },
    {
        type: "function",
        inputs: [],
        name: "getAddressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getLiquidatablePositionSize",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "addressManager", internalType: "address", type: "address" }],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "authorizer", internalType: "address", type: "address" },
            { name: "authorized", internalType: "address", type: "address" },
        ],
        name: "isAuthorized",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "isLiquidatable",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            {
                name: "params",
                internalType: "struct IClearingHouse.LiquidatePositionParams",
                type: "tuple",
                components: [
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "trader", internalType: "address", type: "address" },
                    { name: "positionSize", internalType: "uint256", type: "uint256" },
                ],
            },
        ],
        name: "liquidate",
        outputs: [
            { name: "", internalType: "int256", type: "int256" },
            { name: "", internalType: "int256", type: "int256" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            {
                name: "params",
                internalType: "struct IClearingHouse.OpenPositionParams",
                type: "tuple",
                components: [
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "maker", internalType: "address", type: "address" },
                    { name: "isBaseToQuote", internalType: "bool", type: "bool" },
                    { name: "isExactInput", internalType: "bool", type: "bool" },
                    { name: "amount", internalType: "uint256", type: "uint256" },
                    { name: "oppositeAmountBound", internalType: "uint256", type: "uint256" },
                    { name: "deadline", internalType: "uint256", type: "uint256" },
                    { name: "makerData", internalType: "bytes", type: "bytes" },
                ],
            },
        ],
        name: "openPosition",
        outputs: [
            { name: "", internalType: "int256", type: "int256" },
            { name: "", internalType: "int256", type: "int256" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            {
                name: "params",
                internalType: "struct IClearingHouse.OpenPositionForParams",
                type: "tuple",
                components: [
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "maker", internalType: "address", type: "address" },
                    { name: "isBaseToQuote", internalType: "bool", type: "bool" },
                    { name: "isExactInput", internalType: "bool", type: "bool" },
                    { name: "amount", internalType: "uint256", type: "uint256" },
                    { name: "oppositeAmountBound", internalType: "uint256", type: "uint256" },
                    { name: "deadline", internalType: "uint256", type: "uint256" },
                    { name: "makerData", internalType: "bytes", type: "bytes" },
                    { name: "taker", internalType: "address", type: "address" },
                    { name: "takerRelayFee", internalType: "uint256", type: "uint256" },
                    { name: "makerRelayFee", internalType: "uint256", type: "uint256" },
                ],
            },
        ],
        name: "openPositionFor",
        outputs: [
            { name: "", internalType: "int256", type: "int256" },
            { name: "", internalType: "int256", type: "int256" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            {
                name: "params",
                internalType: "struct IClearingHouse.OpenPositionParams",
                type: "tuple",
                components: [
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "maker", internalType: "address", type: "address" },
                    { name: "isBaseToQuote", internalType: "bool", type: "bool" },
                    { name: "isExactInput", internalType: "bool", type: "bool" },
                    { name: "amount", internalType: "uint256", type: "uint256" },
                    { name: "oppositeAmountBound", internalType: "uint256", type: "uint256" },
                    { name: "deadline", internalType: "uint256", type: "uint256" },
                    { name: "makerData", internalType: "bytes", type: "bytes" },
                ],
            },
        ],
        name: "quoteOpenPosition",
        outputs: [
            { name: "", internalType: "int256", type: "int256" },
            { name: "", internalType: "int256", type: "int256" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "authorized", internalType: "address", type: "address" },
            { name: "isAuthorized_", internalType: "bool", type: "bool" },
        ],
        name: "setAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const

export const clearingHouseAddress = "0x6B031a506802D3dC65D70c4b7741a631da493E72" as const

export const clearingHouseConfig = { address: clearingHouseAddress, abi: clearingHouseAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Config
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const configAbi = [
    { type: "constructor", inputs: [], stateMutability: "nonpayable" },
    {
        type: "error",
        inputs: [{ name: "priceFeedId", internalType: "bytes32", type: "bytes32" }],
        name: "IllegalPriceFeed",
    },
    { type: "error", inputs: [], name: "InvalidInitialization" },
    { type: "error", inputs: [{ name: "ratio", internalType: "uint256", type: "uint256" }], name: "InvalidRatio" },
    {
        type: "error",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "maker", internalType: "address", type: "address" },
        ],
        name: "MakerExists",
    },
    {
        type: "error",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "maker", internalType: "address", type: "address" },
            { name: "posSize", internalType: "int256", type: "int256" },
        ],
        name: "MakerHasPosition",
    },
    { type: "error", inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }], name: "MarketExists" },
    { type: "error", inputs: [], name: "NotInitializing" },
    {
        type: "error",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "OwnableInvalidOwner",
    },
    {
        type: "error",
        inputs: [{ name: "account", internalType: "address", type: "address" }],
        name: "OwnableUnauthorizedAccount",
    },
    { type: "error", inputs: [], name: "ZeroAddress" },
    { type: "error", inputs: [], name: "ZeroRatio" },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "newDepositCap", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldDepositCap", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "DepositCapSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: false },
            { name: "fundingFactor", internalType: "uint256", type: "uint256", indexed: false },
            { name: "fundingExponentFactor", internalType: "uint256", type: "uint256", indexed: false },
            { name: "basePool", internalType: "address", type: "address", indexed: false },
            { name: "oldFundingFactor", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldFundingExponentFactor", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldBasePool", internalType: "address", type: "address", indexed: false },
        ],
        name: "FundingConfigSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: false },
            { name: "newRatio", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldRatio", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "InitialMarginRatioSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint64", type: "uint64", indexed: false }],
        name: "Initialized",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: false },
            { name: "newRatio", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldRatio", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "LiquidationFeeRatioSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: false },
            { name: "newRatio", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldRatio", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "LiquidationPenaltyRatioSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: false },
            { name: "newRatio", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldRatio", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "MaintenanceMarginRatioSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: false },
            { name: "maker", internalType: "address", type: "address", indexed: false },
        ],
        name: "MakerRegistered",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: false },
            { name: "priceFeedId", internalType: "bytes32", type: "bytes32", indexed: false },
        ],
        name: "MarketCreated",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "newMaxOrderValidDuration", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldMaxOrderValidDuration", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "MaxOrderValidDurationSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "newMaxRelayFee", internalType: "uint256", type: "uint256", indexed: true },
            { name: "oldMaxRelayFee", internalType: "uint256", type: "uint256", indexed: true },
        ],
        name: "MaxRelayFeeSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "newOrderDelaySeconds", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldOrderDelaySeconds", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "OrderDelaySecondsSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "previousOwner", internalType: "address", type: "address", indexed: true },
            { name: "newOwner", internalType: "address", type: "address", indexed: true },
        ],
        name: "OwnershipTransferStarted",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "previousOwner", internalType: "address", type: "address", indexed: true },
            { name: "newOwner", internalType: "address", type: "address", indexed: true },
        ],
        name: "OwnershipTransferred",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: false },
            { name: "newPriceBandRatio", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldPriceBandRatio", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "PriceBandRatioMapSet",
    },
    { type: "function", inputs: [], name: "acceptOwnership", outputs: [], stateMutability: "nonpayable" },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "priceFeedId", internalType: "bytes32", type: "bytes32" },
        ],
        name: "createMarket",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [],
        name: "getAddressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getDepositCap",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getFundingConfig",
        outputs: [
            {
                name: "",
                internalType: "struct FundingConfig",
                type: "tuple",
                components: [
                    { name: "fundingFactor", internalType: "uint256", type: "uint256" },
                    { name: "fundingExponentFactor", internalType: "uint256", type: "uint256" },
                    { name: "basePool", internalType: "address", type: "address" },
                ],
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getInitialMarginRatio",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getLiquidationFeeRatio",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getLiquidationPenaltyRatio",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getMaintenanceMarginRatio",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getMaxBorrowingFeeRate",
        outputs: [
            { name: "", internalType: "uint256", type: "uint256" },
            { name: "", internalType: "uint256", type: "uint256" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getMaxOrderValidDuration",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getMaxRelayFee",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getOrderDelaySeconds",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getPriceBandRatio",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getPriceFeedId",
        outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "addressManager", internalType: "address", type: "address" }],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "isWhitelistedMaker",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "owner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "pendingOwner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "maker", internalType: "address", type: "address" },
        ],
        name: "registerMaker",
        outputs: [],
        stateMutability: "nonpayable",
    },
    { type: "function", inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable" },
    {
        type: "function",
        inputs: [{ name: "depositCap", internalType: "uint256", type: "uint256" }],
        name: "setDepositCap",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "fundingFactor", internalType: "uint256", type: "uint256" },
            { name: "fundingExponentFactor", internalType: "uint256", type: "uint256" },
            { name: "basePool", internalType: "address", type: "address" },
        ],
        name: "setFundingConfig",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "ratio", internalType: "uint256", type: "uint256" },
        ],
        name: "setInitialMarginRatio",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "ratio", internalType: "uint256", type: "uint256" },
        ],
        name: "setLiquidationFeeRatio",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "ratio", internalType: "uint256", type: "uint256" },
        ],
        name: "setLiquidationPenaltyRatio",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "ratio", internalType: "uint256", type: "uint256" },
        ],
        name: "setMaintenanceMarginRatio",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "maxLongBorrowingFeeRate", internalType: "uint256", type: "uint256" },
            { name: "maxShortBorrowingFeeRate", internalType: "uint256", type: "uint256" },
        ],
        name: "setMaxBorrowingFeeRate",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "maxOrderValidDuration", internalType: "uint256", type: "uint256" }],
        name: "setMaxOrderValidDuration",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "maxRelayFee", internalType: "uint256", type: "uint256" }],
        name: "setMaxRelayFee",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "orderDelaySecondsArg", internalType: "uint256", type: "uint256" }],
        name: "setOrderDelaySeconds",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "priceBandRatio", internalType: "uint256", type: "uint256" },
        ],
        name: "setPriceBandRatio",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const

export const configAddress = "0x90435Ab9970a9232b387F8bFECc66f10a68383FF" as const

export const configConfig = { address: configAddress, abi: configAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OrderGateway
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const orderGatewayAbi = [
    { type: "constructor", inputs: [], stateMutability: "nonpayable" },
    {
        type: "error",
        inputs: [{ name: "deadline", internalType: "uint256", type: "uint256" }],
        name: "InvalidDeadline",
    },
    { type: "error", inputs: [], name: "InvalidInitialization" },
    {
        type: "error",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "maker", internalType: "address", type: "address" },
        ],
        name: "InvalidMaker",
    },
    { type: "error", inputs: [], name: "InvalidOrderType" },
    { type: "error", inputs: [{ name: "sender", internalType: "address", type: "address" }], name: "InvalidSender" },
    { type: "error", inputs: [], name: "NotInitializing" },
    { type: "error", inputs: [], name: "OrderExecutedTooEarly" },
    { type: "error", inputs: [{ name: "orderId", internalType: "uint256", type: "uint256" }], name: "OrderNotExisted" },
    { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint64", type: "uint64", indexed: false }],
        name: "Initialized",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "orderId", internalType: "uint256", type: "uint256", indexed: true }],
        name: "OrderCanceled",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "orderId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "sender", internalType: "address", type: "address", indexed: true },
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "orderData", internalType: "bytes", type: "bytes", indexed: false },
        ],
        name: "OrderCreated",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "orderId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "sender", internalType: "address", type: "address", indexed: true },
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "keeper", internalType: "address", type: "address", indexed: false },
            { name: "orderData", internalType: "bytes", type: "bytes", indexed: false },
        ],
        name: "OrderExecuted",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "orderId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "sender", internalType: "address", type: "address", indexed: true },
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "keeper", internalType: "address", type: "address", indexed: false },
            { name: "orderData", internalType: "bytes", type: "bytes", indexed: false },
            { name: "reason", internalType: "bytes", type: "bytes", indexed: false },
        ],
        name: "OrderPurged",
    },
    {
        type: "function",
        inputs: [{ name: "orderId", internalType: "uint256", type: "uint256" }],
        name: "cancelOrder",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "orderType", internalType: "enum OrderGateway.DelayedOrderType", type: "uint8" },
            { name: "data", internalType: "bytes", type: "bytes" },
        ],
        name: "createOrder",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "orderId", internalType: "uint256", type: "uint256" },
            { name: "makerData", internalType: "bytes", type: "bytes" },
        ],
        name: "executeOrder",
        outputs: [
            { name: "base", internalType: "int256", type: "int256" },
            { name: "quote", internalType: "int256", type: "int256" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            {
                name: "delayedOrder",
                internalType: "struct OrderGateway.DelayedOrder",
                type: "tuple",
                components: [
                    { name: "orderType", internalType: "enum OrderGateway.DelayedOrderType", type: "uint8" },
                    { name: "sender", internalType: "address", type: "address" },
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "createdAt", internalType: "uint256", type: "uint256" },
                    { name: "executableAt", internalType: "uint256", type: "uint256" },
                    { name: "data", internalType: "bytes", type: "bytes" },
                ],
            },
            { name: "makerData", internalType: "bytes", type: "bytes" },
        ],
        name: "executeOrderBySelf",
        outputs: [
            { name: "base", internalType: "int256", type: "int256" },
            { name: "quote", internalType: "int256", type: "int256" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [],
        name: "getAddressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getCurrentNonce",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "orderId", internalType: "uint256", type: "uint256" }],
        name: "getOrder",
        outputs: [
            {
                name: "",
                internalType: "struct OrderGateway.DelayedOrder",
                type: "tuple",
                components: [
                    { name: "orderType", internalType: "enum OrderGateway.DelayedOrderType", type: "uint8" },
                    { name: "sender", internalType: "address", type: "address" },
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "createdAt", internalType: "uint256", type: "uint256" },
                    { name: "executableAt", internalType: "uint256", type: "uint256" },
                    { name: "data", internalType: "bytes", type: "bytes" },
                ],
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "start", internalType: "uint256", type: "uint256" },
            { name: "end", internalType: "uint256", type: "uint256" },
        ],
        name: "getOrderIds",
        outputs: [{ name: "", internalType: "uint256[]", type: "uint256[]" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getOrdersCount",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "taker", internalType: "address", type: "address" },
            { name: "start", internalType: "uint256", type: "uint256" },
            { name: "end", internalType: "uint256", type: "uint256" },
        ],
        name: "getUserOrderIds",
        outputs: [{ name: "", internalType: "uint256[]", type: "uint256[]" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "taker", internalType: "address", type: "address" }],
        name: "getUserOrdersCount",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "addressManager", internalType: "address", type: "address" }],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const

export const orderGatewayAddress = "0x74f703c401DBCeffE102Bb3E9a79bf76DEe1b244" as const

export const orderGatewayConfig = { address: orderGatewayAddress, abi: orderGatewayAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OrderGatewayV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const orderGatewayV2Abi = [
    { type: "constructor", inputs: [], stateMutability: "nonpayable" },
    { type: "error", inputs: [{ name: "target", internalType: "address", type: "address" }], name: "AddressEmptyCode" },
    {
        type: "error",
        inputs: [{ name: "account", internalType: "address", type: "address" }],
        name: "AddressInsufficientBalance",
    },
    {
        type: "error",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
            { name: "totalFilledAmount", internalType: "uint256", type: "uint256" },
        ],
        name: "ExceedOrderAmount",
    },
    { type: "error", inputs: [], name: "FailedInnerCall" },
    {
        type: "error",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
            { name: "orderFilledAmount", internalType: "uint256", type: "uint256" },
            { name: "clearingHouseFilledAmount", internalType: "uint256", type: "uint256" },
        ],
        name: "FilledAmountMismatched",
    },
    { type: "error", inputs: [], name: "InvalidInitialization" },
    { type: "error", inputs: [], name: "NotInitializing" },
    {
        type: "error",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
        ],
        name: "OrderAmountZero",
    },
    {
        type: "error",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
        ],
        name: "OrderHasExpired",
    },
    {
        type: "error",
        inputs: [
            { name: "takerOrderOwner", internalType: "address", type: "address" },
            { name: "takerOrderId", internalType: "bytes32", type: "bytes32" },
            { name: "takerMarketId", internalType: "uint256", type: "uint256" },
            { name: "makerOrderOwner", internalType: "address", type: "address" },
            { name: "makerOrderId", internalType: "bytes32", type: "bytes32" },
            { name: "makerMarketId", internalType: "uint256", type: "uint256" },
        ],
        name: "OrderMarketMismatched",
    },
    {
        type: "error",
        inputs: [
            { name: "takerOrderOwner", internalType: "address", type: "address" },
            { name: "takerOrderId", internalType: "bytes32", type: "bytes32" },
            { name: "makerOrderOwner", internalType: "address", type: "address" },
            { name: "makerOrderId", internalType: "bytes32", type: "bytes32" },
        ],
        name: "OrderSideMismatched",
    },
    {
        type: "error",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
            { name: "reason", internalType: "bytes", type: "bytes" },
        ],
        name: "OrderSignatureOwnerError",
    },
    {
        type: "error",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
        ],
        name: "OrderWasCanceled",
    },
    {
        type: "error",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
            { name: "orderAmount", internalType: "int256", type: "int256" },
            { name: "takerPositionSize", internalType: "int256", type: "int256" },
        ],
        name: "ReduceOnlySideMismatch",
    },
    { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
    {
        type: "error",
        inputs: [{ name: "value", internalType: "int256", type: "int256" }],
        name: "SafeCastOverflowedIntToUint",
    },
    {
        type: "error",
        inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
        name: "SafeCastOverflowedUintToInt",
    },
    {
        type: "error",
        inputs: [{ name: "token", internalType: "address", type: "address" }],
        name: "SafeERC20FailedOperation",
    },
    { type: "error", inputs: [], name: "SettleOrderParamsLengthError" },
    {
        type: "error",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
        ],
        name: "UnableToFillFok",
    },
    {
        type: "error",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
            { name: "orderAmountAbs", internalType: "uint256", type: "uint256" },
            { name: "takerPositionSizeAbs", internalType: "uint256", type: "uint256" },
        ],
        name: "UnableToReduceOnly",
    },
    { type: "error", inputs: [], name: "Unauthorized" },
    { type: "event", anonymous: false, inputs: [], name: "EIP712DomainChanged" },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint64", type: "uint64", indexed: false }],
        name: "Initialized",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "owner", internalType: "address", type: "address", indexed: true },
            { name: "id", internalType: "bytes32", type: "bytes32", indexed: true },
            { name: "reason", internalType: "string", type: "string", indexed: false },
        ],
        name: "OrderCanceled",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "owner", internalType: "address", type: "address", indexed: true },
            { name: "orderId", internalType: "bytes32", type: "bytes32", indexed: true },
            { name: "action", internalType: "enum OrderGatewayV2.ActionType", type: "uint8", indexed: false },
            { name: "tradeType", internalType: "enum OrderGatewayV2.TradeType", type: "uint8", indexed: false },
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: false },
            { name: "amount", internalType: "int256", type: "int256", indexed: false },
            { name: "fillAmount", internalType: "uint256", type: "uint256", indexed: false },
            { name: "price", internalType: "uint256", type: "uint256", indexed: false },
            { name: "fillPrice", internalType: "uint256", type: "uint256", indexed: false },
            { name: "expiry", internalType: "uint256", type: "uint256", indexed: false },
            { name: "marginXCD", internalType: "uint256", type: "uint256", indexed: false },
            { name: "relayFee", internalType: "uint256", type: "uint256", indexed: false },
            { name: "maker", internalType: "address", type: "address", indexed: false },
        ],
        name: "OrderFilled",
    },
    {
        type: "function",
        inputs: [],
        name: "ORDER_TYPEHASH",
        outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            {
                name: "signedOrder",
                internalType: "struct OrderGatewayV2.SignedOrder",
                type: "tuple",
                components: [
                    {
                        name: "order",
                        internalType: "struct OrderGatewayV2.Order",
                        type: "tuple",
                        components: [
                            { name: "action", internalType: "enum OrderGatewayV2.ActionType", type: "uint8" },
                            { name: "marketId", internalType: "uint256", type: "uint256" },
                            { name: "amount", internalType: "int256", type: "int256" },
                            { name: "price", internalType: "uint256", type: "uint256" },
                            { name: "expiry", internalType: "uint256", type: "uint256" },
                            { name: "tradeType", internalType: "enum OrderGatewayV2.TradeType", type: "uint8" },
                            { name: "owner", internalType: "address", type: "address" },
                            { name: "marginXCD", internalType: "uint256", type: "uint256" },
                            { name: "relayFee", internalType: "uint256", type: "uint256" },
                            { name: "id", internalType: "bytes32", type: "bytes32" },
                        ],
                    },
                    { name: "signature", internalType: "bytes", type: "bytes" },
                ],
            },
        ],
        name: "cancelOrder",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [],
        name: "eip712Domain",
        outputs: [
            { name: "fields", internalType: "bytes1", type: "bytes1" },
            { name: "name", internalType: "string", type: "string" },
            { name: "version", internalType: "string", type: "string" },
            { name: "chainId", internalType: "uint256", type: "uint256" },
            { name: "verifyingContract", internalType: "address", type: "address" },
            { name: "salt", internalType: "bytes32", type: "bytes32" },
            { name: "extensions", internalType: "uint256[]", type: "uint256[]" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getAddressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "orderOwner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
        ],
        name: "getOrderFilledAmount",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            {
                name: "order",
                internalType: "struct OrderGatewayV2.Order",
                type: "tuple",
                components: [
                    { name: "action", internalType: "enum OrderGatewayV2.ActionType", type: "uint8" },
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "amount", internalType: "int256", type: "int256" },
                    { name: "price", internalType: "uint256", type: "uint256" },
                    { name: "expiry", internalType: "uint256", type: "uint256" },
                    { name: "tradeType", internalType: "enum OrderGatewayV2.TradeType", type: "uint8" },
                    { name: "owner", internalType: "address", type: "address" },
                    { name: "marginXCD", internalType: "uint256", type: "uint256" },
                    { name: "relayFee", internalType: "uint256", type: "uint256" },
                    { name: "id", internalType: "bytes32", type: "bytes32" },
                ],
            },
        ],
        name: "getOrderHash",
        outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "name_", internalType: "string", type: "string" },
            { name: "version_", internalType: "string", type: "string" },
            { name: "addressManager_", internalType: "address", type: "address" },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "orderOwner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
        ],
        name: "isOrderCanceled",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "address_", internalType: "address", type: "address" }],
        name: "isRelayer",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "address_", internalType: "address", type: "address" },
            { name: "isRelayer_", internalType: "bool", type: "bool" },
        ],
        name: "setRelayer",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            {
                name: "settleOrderParams",
                internalType: "struct OrderGatewayV2.SettleOrderParam[]",
                type: "tuple[]",
                components: [
                    {
                        name: "signedOrder",
                        internalType: "struct OrderGatewayV2.SignedOrder",
                        type: "tuple",
                        components: [
                            {
                                name: "order",
                                internalType: "struct OrderGatewayV2.Order",
                                type: "tuple",
                                components: [
                                    { name: "action", internalType: "enum OrderGatewayV2.ActionType", type: "uint8" },
                                    { name: "marketId", internalType: "uint256", type: "uint256" },
                                    { name: "amount", internalType: "int256", type: "int256" },
                                    { name: "price", internalType: "uint256", type: "uint256" },
                                    { name: "expiry", internalType: "uint256", type: "uint256" },
                                    { name: "tradeType", internalType: "enum OrderGatewayV2.TradeType", type: "uint8" },
                                    { name: "owner", internalType: "address", type: "address" },
                                    { name: "marginXCD", internalType: "uint256", type: "uint256" },
                                    { name: "relayFee", internalType: "uint256", type: "uint256" },
                                    { name: "id", internalType: "bytes32", type: "bytes32" },
                                ],
                            },
                            { name: "signature", internalType: "bytes", type: "bytes" },
                        ],
                    },
                    { name: "fillAmount", internalType: "uint256", type: "uint256" },
                    { name: "maker", internalType: "address", type: "address" },
                    { name: "makerData", internalType: "bytes", type: "bytes" },
                ],
            },
        ],
        name: "settleOrder",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            {
                name: "signedOrder",
                internalType: "struct OrderGatewayV2.SignedOrder",
                type: "tuple",
                components: [
                    {
                        name: "order",
                        internalType: "struct OrderGatewayV2.Order",
                        type: "tuple",
                        components: [
                            { name: "action", internalType: "enum OrderGatewayV2.ActionType", type: "uint8" },
                            { name: "marketId", internalType: "uint256", type: "uint256" },
                            { name: "amount", internalType: "int256", type: "int256" },
                            { name: "price", internalType: "uint256", type: "uint256" },
                            { name: "expiry", internalType: "uint256", type: "uint256" },
                            { name: "tradeType", internalType: "enum OrderGatewayV2.TradeType", type: "uint8" },
                            { name: "owner", internalType: "address", type: "address" },
                            { name: "marginXCD", internalType: "uint256", type: "uint256" },
                            { name: "relayFee", internalType: "uint256", type: "uint256" },
                            { name: "id", internalType: "bytes32", type: "bytes32" },
                        ],
                    },
                    { name: "signature", internalType: "bytes", type: "bytes" },
                ],
            },
        ],
        name: "verifyOrderSignature",
        outputs: [
            {
                name: "",
                internalType: "struct OrderGatewayV2.Order",
                type: "tuple",
                components: [
                    { name: "action", internalType: "enum OrderGatewayV2.ActionType", type: "uint8" },
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "amount", internalType: "int256", type: "int256" },
                    { name: "price", internalType: "uint256", type: "uint256" },
                    { name: "expiry", internalType: "uint256", type: "uint256" },
                    { name: "tradeType", internalType: "enum OrderGatewayV2.TradeType", type: "uint8" },
                    { name: "owner", internalType: "address", type: "address" },
                    { name: "marginXCD", internalType: "uint256", type: "uint256" },
                    { name: "relayFee", internalType: "uint256", type: "uint256" },
                    { name: "id", internalType: "bytes32", type: "bytes32" },
                ],
            },
        ],
        stateMutability: "nonpayable",
    },
    { type: "function", inputs: [], name: "withdrawMatcherFee", outputs: [], stateMutability: "nonpayable" },
] as const

export const orderGatewayV2Address = "0xe920d146e666b5cC31B9D7e6840d8e955D0B447B" as const

export const orderGatewayV2Config = { address: orderGatewayV2Address, abi: orderGatewayV2Abi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PythOracleAdapter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pythOracleAdapterAbi = [
    {
        type: "constructor",
        inputs: [{ name: "pyth_", internalType: "address", type: "address" }],
        stateMutability: "nonpayable",
    },
    {
        type: "error",
        inputs: [
            {
                name: "price",
                internalType: "struct PythStructs.Price",
                type: "tuple",
                components: [
                    { name: "price", internalType: "int64", type: "int64" },
                    { name: "conf", internalType: "uint64", type: "uint64" },
                    { name: "expo", internalType: "int32", type: "int32" },
                    { name: "publishTime", internalType: "uint256", type: "uint256" },
                ],
            },
        ],
        name: "IllegalPrice",
    },
    {
        type: "error",
        inputs: [{ name: "priceFeedId", internalType: "bytes32", type: "bytes32" }],
        name: "IllegalPriceFeed",
    },
    {
        type: "error",
        inputs: [
            { name: "priceFeedId", internalType: "bytes32", type: "bytes32" },
            { name: "reason", internalType: "bytes", type: "bytes" },
        ],
        name: "OracleDataRequired",
    },
    {
        type: "error",
        inputs: [{ name: "feeAmount", internalType: "uint256", type: "uint256" }],
        name: "OracleFeeRequired",
    },
    {
        type: "error",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "OwnableInvalidOwner",
    },
    {
        type: "error",
        inputs: [{ name: "account", internalType: "address", type: "address" }],
        name: "OwnableUnauthorizedAccount",
    },
    {
        type: "error",
        inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
        name: "WithdrawOracleFeeFailed",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "maxPriceAge", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldMaxPriceAge", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "MaxPriceAgeSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "priceFeedId", internalType: "bytes32", type: "bytes32", indexed: false },
            { name: "price", internalType: "uint256", type: "uint256", indexed: false },
            { name: "decimals", internalType: "uint256", type: "uint256", indexed: false },
            { name: "expirationTime", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "OracleDataUsed",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "from", internalType: "address", type: "address", indexed: false },
            { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "OracleFeeDeposited",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "to", internalType: "address", type: "address", indexed: false },
            { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "OracleFeeWithdrawn",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "previousOwner", internalType: "address", type: "address", indexed: true },
            { name: "newOwner", internalType: "address", type: "address", indexed: true },
        ],
        name: "OwnershipTransferStarted",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "previousOwner", internalType: "address", type: "address", indexed: true },
            { name: "newOwner", internalType: "address", type: "address", indexed: true },
        ],
        name: "OwnershipTransferred",
    },
    { type: "function", inputs: [], name: "acceptOwnership", outputs: [], stateMutability: "nonpayable" },
    { type: "function", inputs: [], name: "depositOracleFee", outputs: [], stateMutability: "payable" },
    {
        type: "function",
        inputs: [],
        name: "getMaxPriceAge",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "priceFeedId", internalType: "bytes32", type: "bytes32" }],
        name: "getPrice",
        outputs: [
            { name: "", internalType: "uint256", type: "uint256" },
            { name: "", internalType: "uint256", type: "uint256" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getPyth",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "owner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "pendingOwner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "priceFeedId", internalType: "bytes32", type: "bytes32" }],
        name: "priceFeedExists",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    { type: "function", inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable" },
    {
        type: "function",
        inputs: [{ name: "maxPriceAge", internalType: "uint256", type: "uint256" }],
        name: "setMaxPriceAge",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "priceFeedId", internalType: "bytes32", type: "bytes32" },
            { name: "signedData", internalType: "bytes", type: "bytes" },
        ],
        name: "updatePrice",
        outputs: [],
        stateMutability: "nonpayable",
    },
    { type: "function", inputs: [], name: "withdrawOracleFee", outputs: [], stateMutability: "nonpayable" },
] as const

export const pythOracleAdapterAddress = "0xb53A7d72851233e32D345Ffb9c535FE3Dfa3DA0E" as const

export const pythOracleAdapterConfig = { address: pythOracleAdapterAddress, abi: pythOracleAdapterAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Quoter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const quoterAbi = [
    {
        type: "constructor",
        inputs: [{ name: "addressManager", internalType: "address", type: "address" }],
        stateMutability: "nonpayable",
    },
    { type: "error", inputs: [], name: "InternalQuoteShouldRevert" },
    { type: "error", inputs: [], name: "InvalidInitialization" },
    { type: "error", inputs: [], name: "NotInitializing" },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint64", type: "uint64", indexed: false }],
        name: "Initialized",
    },
    {
        type: "function",
        inputs: [],
        name: "getAddressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            {
                name: "params",
                internalType: "struct IClearingHouse.OpenPositionParams",
                type: "tuple",
                components: [
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "maker", internalType: "address", type: "address" },
                    { name: "isBaseToQuote", internalType: "bool", type: "bool" },
                    { name: "isExactInput", internalType: "bool", type: "bool" },
                    { name: "amount", internalType: "uint256", type: "uint256" },
                    { name: "oppositeAmountBound", internalType: "uint256", type: "uint256" },
                    { name: "deadline", internalType: "uint256", type: "uint256" },
                    { name: "makerData", internalType: "bytes", type: "bytes" },
                ],
            },
        ],
        name: "quote",
        outputs: [
            { name: "", internalType: "int256", type: "int256" },
            { name: "", internalType: "int256", type: "int256" },
        ],
        stateMutability: "nonpayable",
    },
] as const

export const quoterAddress = "0x8F6211cf5DE4f50EC5bD888De6315B89979315eD" as const

export const quoterConfig = { address: quoterAddress, abi: quoterAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vaultAbi = [
    { type: "constructor", inputs: [], stateMutability: "nonpayable" },
    { type: "error", inputs: [{ name: "target", internalType: "address", type: "address" }], name: "AddressEmptyCode" },
    {
        type: "error",
        inputs: [{ name: "account", internalType: "address", type: "address" }],
        name: "AddressInsufficientBalance",
    },
    { type: "error", inputs: [], name: "AuthorizationAlreadySet" },
    {
        type: "error",
        inputs: [
            { name: "authorizer", internalType: "address", type: "address" },
            { name: "authorized", internalType: "address", type: "address" },
        ],
        name: "AuthorizerNotAllow",
    },
    { type: "error", inputs: [], name: "DepositCapExceeded" },
    { type: "error", inputs: [], name: "FailedInnerCall" },
    {
        type: "error",
        inputs: [
            { name: "trader", internalType: "address", type: "address" },
            { name: "fund", internalType: "uint256", type: "uint256" },
            { name: "delta", internalType: "int256", type: "int256" },
        ],
        name: "InsufficientFund",
    },
    { type: "error", inputs: [], name: "InvalidInitialization" },
    { type: "error", inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }], name: "InvalidMarket" },
    {
        type: "error",
        inputs: [
            { name: "actual", internalType: "uint256", type: "uint256" },
            { name: "target", internalType: "uint256", type: "uint256" },
        ],
        name: "MismatchedTransferAmount",
    },
    {
        type: "error",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "NotEnoughFreeCollateral",
    },
    { type: "error", inputs: [], name: "NotInitializing" },
    { type: "error", inputs: [], name: "NotWhitelistedAuthorization" },
    { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
    {
        type: "error",
        inputs: [{ name: "value", internalType: "int256", type: "int256" }],
        name: "SafeCastOverflowedIntToUint",
    },
    {
        type: "error",
        inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
        name: "SafeCastOverflowedUintToInt",
    },
    {
        type: "error",
        inputs: [{ name: "token", internalType: "address", type: "address" }],
        name: "SafeERC20FailedOperation",
    },
    { type: "error", inputs: [], name: "Unauthorized" },
    { type: "error", inputs: [], name: "ZeroAmount" },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "authorizer", internalType: "address", type: "address", indexed: true },
            { name: "authorized", internalType: "address", type: "address", indexed: true },
            { name: "isAuthorized", internalType: "bool", type: "bool", indexed: false },
        ],
        name: "AuthorizationSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "badDebtDelta", internalType: "int256", type: "int256", indexed: false },
        ],
        name: "BadDebtChanged",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "trader", internalType: "address", type: "address", indexed: true },
            { name: "fundDelta", internalType: "int256", type: "int256", indexed: false },
        ],
        name: "FundChanged",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint64", type: "uint64", indexed: false }],
        name: "Initialized",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "trader", internalType: "address", type: "address", indexed: true },
            { name: "marginDelta", internalType: "int256", type: "int256", indexed: false },
        ],
        name: "MarginChanged",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "trader", internalType: "address", type: "address", indexed: true },
            { name: "realizedPnl", internalType: "int256", type: "int256", indexed: false },
            { name: "settledPnl", internalType: "int256", type: "int256", indexed: false },
            { name: "margin", internalType: "uint256", type: "uint256", indexed: false },
            { name: "unsettledPnl", internalType: "int256", type: "int256", indexed: false },
            { name: "pnlPoolBalance", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "PnlSettled",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256", indexed: true },
            { name: "trader", internalType: "address", type: "address", indexed: true },
            { name: "maker", internalType: "address", type: "address", indexed: false },
            { name: "positionSizeDelta", internalType: "int256", type: "int256", indexed: false },
            { name: "openNotionalDelta", internalType: "int256", type: "int256", indexed: false },
            { name: "realizedPnl", internalType: "int256", type: "int256", indexed: false },
            { name: "reason", internalType: "enum PositionChangedReason", type: "uint8", indexed: false },
        ],
        name: "PositionChanged",
    },
    {
        type: "function",
        inputs: [
            { name: "trader", internalType: "address", type: "address" },
            { name: "amountXCD", internalType: "uint256", type: "uint256" },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getAccountValue",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getAddressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getBadDebt",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getCollateralToken",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getFreeCollateral",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
            { name: "marginRequirementType", internalType: "enum MarginRequirementType", type: "uint8" },
        ],
        name: "getFreeCollateralForTrade",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getFreeMargin",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "trader", internalType: "address", type: "address" }],
        name: "getFund",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getMargin",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getMarginRatio",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "marginRequirementType", internalType: "enum MarginRequirementType", type: "uint8" },
        ],
        name: "getMarginRequirement",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getOpenNotional",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getPendingMargin",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getPnlPoolBalance",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getPositionSize",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getSettledMargin",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getUnrealizedPnl",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getUnsettledPnl",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "addressManager", internalType: "address", type: "address" },
            { name: "collateralToken", internalType: "address", type: "address" },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "authorizer", internalType: "address", type: "address" },
            { name: "authorized", internalType: "address", type: "address" },
        ],
        name: "isAuthorized",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "authorized", internalType: "address", type: "address" },
            { name: "isAuthorized_", internalType: "bool", type: "bool" },
        ],
        name: "setAuthorization",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            {
                name: "params",
                internalType: "struct IVault.SettlePositionParams",
                type: "tuple",
                components: [
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "taker", internalType: "address", type: "address" },
                    { name: "maker", internalType: "address", type: "address" },
                    { name: "takerPositionSize", internalType: "int256", type: "int256" },
                    { name: "takerOpenNotional", internalType: "int256", type: "int256" },
                    { name: "reason", internalType: "enum PositionChangedReason", type: "uint8" },
                ],
            },
        ],
        name: "settlePosition",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "amountXCD", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFund",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "amountXCD", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFundToMargin",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "amountXCD", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFundToMargin",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
        ],
        name: "transferMargin",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "amountXCD", internalType: "uint256", type: "uint256" },
        ],
        name: "transferMarginToFund",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "amountXCD", internalType: "uint256", type: "uint256" },
        ],
        name: "transferMarginToFund",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "amountXCD", internalType: "uint256", type: "uint256" }],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const

export const vaultAddress = "0xF957577b04c6964276FEC51B3AA4AAC419B3b44b" as const

export const vaultConfig = { address: vaultAddress, abi: vaultAbi } as const
