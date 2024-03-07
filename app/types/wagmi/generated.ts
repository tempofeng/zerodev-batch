//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ClearingHouse
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const clearingHouseABI = [
    { stateMutability: "nonpayable", type: "constructor", inputs: [] },
    { type: "error", inputs: [], name: "AuthorizationAlreadySet" },
    { type: "error", inputs: [], name: "CannotLiquidateMaker" },
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
            { name: "base", internalType: "int256", type: "int256" },
            { name: "quote", internalType: "int256", type: "int256" },
        ],
        name: "QuoteResult",
    },
    { type: "error", inputs: [], name: "Unauthorized" },
    { type: "error", inputs: [], name: "ZeroAmount" },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "authorizer", internalType: "address", type: "address", indexed: true },
            { name: "authroized", internalType: "address", type: "address", indexed: true },
            { name: "isAuthorized", internalType: "bool", type: "bool", indexed: false },
        ],
        name: "AuthorizationSet",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint8", type: "uint8", indexed: false }],
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
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "addressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
    },
    {
        stateMutability: "nonpayable",
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
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "taker", internalType: "address", type: "address" },
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
        name: "closePositionFor",
        outputs: [
            { name: "", internalType: "int256", type: "int256" },
            { name: "", internalType: "int256", type: "int256" },
        ],
    },
    {
        stateMutability: "pure",
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
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getLiquidatablePositionSize",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getMarginProfile",
        outputs: [
            {
                name: "",
                internalType: "struct IClearingHouse.MarginProfile",
                type: "tuple",
                components: [
                    { name: "positionSize", internalType: "int256", type: "int256" },
                    { name: "openNotional", internalType: "int256", type: "int256" },
                    { name: "accountValue", internalType: "int256", type: "int256" },
                    { name: "unrealizedPnl", internalType: "int256", type: "int256" },
                    { name: "freeCollateral", internalType: "uint256", type: "uint256" },
                    { name: "freeCollateralForOpen", internalType: "int256", type: "int256" },
                    { name: "freeCollateralForReduce", internalType: "int256", type: "int256" },
                    { name: "marginRatio", internalType: "int256", type: "int256" },
                ],
            },
        ],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "_addressManager", internalType: "address", type: "address" }],
        name: "initialize",
        outputs: [],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "authorizer", internalType: "address", type: "address" },
            { name: "authorized", internalType: "address", type: "address" },
        ],
        name: "isAuthorized",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "isLiquidatable",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            {
                name: "params",
                internalType: "struct IClearingHouse.LiquidatePositionParams",
                type: "tuple",
                components: [
                    { name: "marketId", internalType: "uint256", type: "uint256" },
                    { name: "liquidator", internalType: "address", type: "address" },
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
    },
    {
        stateMutability: "nonpayable",
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
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            {
                name: "params",
                internalType: "struct IClearingHouse.OpenPositionForParams",
                type: "tuple",
                components: [
                    {
                        name: "info",
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
    },
    {
        stateMutability: "nonpayable",
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
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "authorized", internalType: "address", type: "address" },
            { name: "isAuthorized_", internalType: "bool", type: "bool" },
        ],
        name: "setAuthorization",
        outputs: [],
    },
] as const

export const clearingHouseAddress = "0x38b23dA875Bd4103f052BDDF35807eff642B72A8" as const

export const clearingHouseConfig = { address: clearingHouseAddress, abi: clearingHouseABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Config
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const configABI = [
    { stateMutability: "nonpayable", type: "constructor", inputs: [] },
    {
        type: "error",
        inputs: [{ name: "priceFeedId", internalType: "bytes32", type: "bytes32" }],
        name: "IllegalPriceFeed",
    },
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
    { type: "error", inputs: [], name: "ZeroAddress" },
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
        inputs: [{ name: "version", internalType: "uint8", type: "uint8", indexed: false }],
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
            { name: "newRate", internalType: "uint256", type: "uint256", indexed: false },
            { name: "oldRate", internalType: "uint256", type: "uint256", indexed: false },
        ],
        name: "MaxBorrowingFeeRateSet",
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
            { name: "newMinExecutionFee", internalType: "uint256", type: "uint256", indexed: true },
            { name: "oldMinExecutionFee", internalType: "uint256", type: "uint256", indexed: true },
        ],
        name: "MinExecutionFeeSet",
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
            { name: "newRelayerFee", internalType: "uint256", type: "uint256", indexed: true },
            { name: "oldRelayerFee", internalType: "uint256", type: "uint256", indexed: true },
        ],
        name: "RelayerFeeSet",
    },
    { stateMutability: "nonpayable", type: "function", inputs: [], name: "acceptOwnership", outputs: [] },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "addressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "priceFeedId", internalType: "bytes32", type: "bytes32" },
        ],
        name: "createMarket",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "getDepositCap",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
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
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getInitialMarginRatio",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getLiquidationFeeRatio",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getLiquidationPenaltyRatio",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getMaintenanceMarginRatio",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "getMaxBorrowingFeeRate",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "getMaxOrderValidDuration",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "getMaxRelayFee",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "getMinExecutionFee",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "getOrderDelaySeconds",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getPriceFeedId",
        outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "_addressManager", internalType: "address", type: "address" }],
        name: "initialize",
        outputs: [],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "isWhitelistedMaker",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "owner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "pendingOwner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "maker", internalType: "address", type: "address" },
        ],
        name: "registerMaker",
        outputs: [],
    },
    { stateMutability: "nonpayable", type: "function", inputs: [], name: "renounceOwnership", outputs: [] },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "depositCap", internalType: "uint256", type: "uint256" }],
        name: "setDepositCap",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "fundingFactor", internalType: "uint256", type: "uint256" },
            { name: "fundingExponentFactor", internalType: "uint256", type: "uint256" },
            { name: "basePool", internalType: "address", type: "address" },
        ],
        name: "setFundingConfig",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "ratio", internalType: "uint256", type: "uint256" },
        ],
        name: "setInitialMarginRatio",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "ratio", internalType: "uint256", type: "uint256" },
        ],
        name: "setLiquidationFeeRatio",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "ratio", internalType: "uint256", type: "uint256" },
        ],
        name: "setLiquidationPenaltyRatio",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "ratio", internalType: "uint256", type: "uint256" },
        ],
        name: "setMaintenanceMarginRatio",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "maxBorrowingFeeRate", internalType: "uint256", type: "uint256" }],
        name: "setMaxBorrowingFeeRate",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "maxOrderValidDuration", internalType: "uint256", type: "uint256" }],
        name: "setMaxOrderValidDuration",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "minExecutionFee", internalType: "uint256", type: "uint256" }],
        name: "setMinExecutionFee",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "orderDelaySecondsArg", internalType: "uint256", type: "uint256" }],
        name: "setOrderDelaySeconds",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "relayerFee", internalType: "uint256", type: "uint256" }],
        name: "setRelayerFee",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
        name: "transferOwnership",
        outputs: [],
    },
] as const

export const configAddress = "0x94F242Ba5a54c06FeD5FEDF9fc7015963b7a2CB6" as const

export const configConfig = { address: configAddress, abi: configABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
    {
        type: "event",
        inputs: [
            { name: "owner", type: "address", indexed: true },
            { name: "spender", type: "address", indexed: true },
            { name: "value", type: "uint256", indexed: false },
        ],
        name: "Approval",
    },
    {
        type: "event",
        inputs: [
            { name: "from", type: "address", indexed: true },
            { name: "to", type: "address", indexed: true },
            { name: "value", type: "uint256", indexed: false },
        ],
        name: "Transfer",
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ type: "uint256" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "spender", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ type: "bool" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ type: "uint256" }],
    },
    { stateMutability: "view", type: "function", inputs: [], name: "decimals", outputs: [{ type: "uint8" }] },
    { stateMutability: "view", type: "function", inputs: [], name: "name", outputs: [{ type: "string" }] },
    { stateMutability: "view", type: "function", inputs: [], name: "symbol", outputs: [{ type: "string" }] },
    { stateMutability: "view", type: "function", inputs: [], name: "totalSupply", outputs: [{ type: "uint256" }] },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "recipient", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ type: "bool" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "sender", type: "address" },
            { name: "recipient", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ type: "bool" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "spender", type: "address" },
            { name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ type: "bool" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "spender", type: "address" },
            { name: "subtractedValue", type: "uint256" },
        ],
        name: "decreaseAllowance",
        outputs: [{ type: "bool" }],
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
    {
        type: "event",
        inputs: [
            { name: "owner", type: "address", indexed: true },
            { name: "spender", type: "address", indexed: true },
            { name: "tokenId", type: "uint256", indexed: true },
        ],
        name: "Approval",
    },
    {
        type: "event",
        inputs: [
            { name: "owner", type: "address", indexed: true },
            { name: "operator", type: "address", indexed: true },
            { name: "approved", type: "bool", indexed: false },
        ],
        name: "ApprovalForAll",
    },
    {
        type: "event",
        inputs: [
            { name: "from", type: "address", indexed: true },
            { name: "to", type: "address", indexed: true },
            { name: "tokenId", type: "uint256", indexed: true },
        ],
        name: "Transfer",
    },
    {
        stateMutability: "payable",
        type: "function",
        inputs: [
            { name: "spender", type: "address" },
            { name: "tokenId", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "tokenId", type: "uint256" }],
        name: "getApproved",
        outputs: [{ type: "address" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "owner", type: "address" },
            { name: "operator", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ type: "bool" }],
    },
    { stateMutability: "view", type: "function", inputs: [], name: "name", outputs: [{ type: "string" }] },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "tokenId", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ name: "owner", type: "address" }],
    },
    {
        stateMutability: "payable",
        type: "function",
        inputs: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "id", type: "uint256" },
            { name: "data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "operator", type: "address" },
            { name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
    },
    { stateMutability: "view", type: "function", inputs: [], name: "symbol", outputs: [{ type: "string" }] },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "index", type: "uint256" }],
        name: "tokenByIndex",
        outputs: [{ type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "owner", type: "address" },
            { name: "index", type: "uint256" },
        ],
        name: "tokenByIndex",
        outputs: [{ name: "tokenId", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "tokenId", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ type: "string" }],
    },
    { stateMutability: "view", type: "function", inputs: [], name: "totalSupply", outputs: [{ type: "uint256" }] },
    {
        stateMutability: "payable",
        type: "function",
        inputs: [
            { name: "sender", type: "address" },
            { name: "recipient", type: "address" },
            { name: "tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OrderGateway
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const orderGatewayABI = [
    { stateMutability: "nonpayable", type: "constructor", inputs: [] },
    {
        type: "error",
        inputs: [{ name: "deadline", internalType: "uint256", type: "uint256" }],
        name: "InvalidDeadline",
    },
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
    { type: "error", inputs: [], name: "LessThanMinExecutionFee" },
    { type: "error", inputs: [{ name: "orderId", internalType: "uint256", type: "uint256" }], name: "OrderNotExisted" },
    { type: "error", inputs: [], name: "PriceTimestampTooEarly" },
    { type: "error", inputs: [], name: "Unauthorized" },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint8", type: "uint8", indexed: false }],
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
            { name: "executionFee", internalType: "uint256", type: "uint256", indexed: false },
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
            { name: "executionFee", internalType: "uint256", type: "uint256", indexed: false },
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
            { name: "executionFee", internalType: "uint256", type: "uint256", indexed: false },
            { name: "keeper", internalType: "address", type: "address", indexed: false },
            { name: "orderData", internalType: "bytes", type: "bytes", indexed: false },
            { name: "reason", internalType: "bytes", type: "bytes", indexed: false },
        ],
        name: "OrderPurged",
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "addressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "orderId", internalType: "uint256", type: "uint256" }],
        name: "cancelOrder",
        outputs: [],
    },
    {
        stateMutability: "payable",
        type: "function",
        inputs: [
            { name: "orderType", internalType: "enum OrderGateway.DelayedOrderType", type: "uint8" },
            { name: "data", internalType: "bytes", type: "bytes" },
        ],
        name: "createOrder",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
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
    },
    {
        stateMutability: "nonpayable",
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
                    { name: "executionFee", internalType: "uint256", type: "uint256" },
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
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "getCurrentNonce",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
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
                    { name: "executionFee", internalType: "uint256", type: "uint256" },
                    { name: "createdAt", internalType: "uint256", type: "uint256" },
                    { name: "executableAt", internalType: "uint256", type: "uint256" },
                    { name: "data", internalType: "bytes", type: "bytes" },
                ],
            },
        ],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "start", internalType: "uint256", type: "uint256" },
            { name: "end", internalType: "uint256", type: "uint256" },
        ],
        name: "getOrderIds",
        outputs: [{ name: "", internalType: "uint256[]", type: "uint256[]" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "getOrdersCount",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "taker", internalType: "address", type: "address" },
            { name: "start", internalType: "uint256", type: "uint256" },
            { name: "end", internalType: "uint256", type: "uint256" },
        ],
        name: "getUserOrderIds",
        outputs: [{ name: "", internalType: "uint256[]", type: "uint256[]" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "taker", internalType: "address", type: "address" }],
        name: "getUserOrdersCount",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "_addressManager", internalType: "address", type: "address" }],
        name: "initialize",
        outputs: [],
    },
    { stateMutability: "nonpayable", type: "function", inputs: [], name: "withdrawAllEth", outputs: [] },
] as const

export const orderGatewayAddress = "0x7DA290C59dAdF3cbD3d5cA9307FaF00B0AbD5760" as const

export const orderGatewayConfig = { address: orderGatewayAddress, abi: orderGatewayABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OrderGatewayV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const orderGatewayV2ABI = [
    { stateMutability: "nonpayable", type: "constructor", inputs: [] },
    {
        type: "error",
        inputs: [
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
            { name: "totalFilledAmount", internalType: "uint256", type: "uint256" },
        ],
        name: "ExceedOrderAmount",
    },
    {
        type: "error",
        inputs: [
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
            { name: "orderFilledAmount", internalType: "uint256", type: "uint256" },
            { name: "clearingHouseFilledAmount", internalType: "uint256", type: "uint256" },
        ],
        name: "FilledAmountMismatched",
    },
    { type: "error", inputs: [{ name: "orderId", internalType: "bytes32", type: "bytes32" }], name: "OrderAmountZero" },
    { type: "error", inputs: [{ name: "orderId", internalType: "bytes32", type: "bytes32" }], name: "OrderHasExpired" },
    {
        type: "error",
        inputs: [
            { name: "takerOrderId", internalType: "bytes32", type: "bytes32" },
            { name: "makerOrderId", internalType: "bytes32", type: "bytes32" },
            { name: "takerMarketId", internalType: "uint256", type: "uint256" },
            { name: "makerMarketId", internalType: "uint256", type: "uint256" },
        ],
        name: "OrderMarketMismatched",
    },
    {
        type: "error",
        inputs: [
            { name: "takerOrderId", internalType: "bytes32", type: "bytes32" },
            { name: "makerOrderId", internalType: "bytes32", type: "bytes32" },
        ],
        name: "OrderSideMismatched",
    },
    {
        type: "error",
        inputs: [
            { name: "orderOwner", internalType: "address", type: "address" },
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
            { name: "reason", internalType: "bytes", type: "bytes" },
        ],
        name: "OrderSignatureOwnerError",
    },
    {
        type: "error",
        inputs: [{ name: "orderId", internalType: "bytes32", type: "bytes32" }],
        name: "OrderWasCanceled",
    },
    {
        type: "error",
        inputs: [
            { name: "orderId", internalType: "bytes32", type: "bytes32" },
            { name: "orderAmount", internalType: "int256", type: "int256" },
            { name: "takerPositionSize", internalType: "int256", type: "int256" },
        ],
        name: "ReduceOnlySideMismatch",
    },
    { type: "error", inputs: [], name: "SettleOrderParamsLengthError" },
    { type: "error", inputs: [{ name: "orderId", internalType: "bytes32", type: "bytes32" }], name: "UnableToFillFok" },
    {
        type: "error",
        inputs: [
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
        inputs: [{ name: "version", internalType: "uint8", type: "uint8", indexed: false }],
        name: "Initialized",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "orderId", internalType: "bytes32", type: "bytes32", indexed: true },
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
            { name: "margin", internalType: "uint256", type: "uint256", indexed: false },
            { name: "matcherFee", internalType: "uint256", type: "uint256", indexed: false },
            { name: "maker", internalType: "address", type: "address", indexed: false },
        ],
        name: "OrderFilled",
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "ORDER_TYPEHASH",
        outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "addressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
    },
    {
        stateMutability: "nonpayable",
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
                            { name: "margin", internalType: "uint256", type: "uint256" },
                            { name: "matcherFee", internalType: "uint256", type: "uint256" },
                            { name: "id", internalType: "bytes32", type: "bytes32" },
                        ],
                    },
                    { name: "signature", internalType: "bytes", type: "bytes" },
                ],
            },
        ],
        name: "cancelOrder",
        outputs: [],
    },
    {
        stateMutability: "view",
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
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "orderId", internalType: "bytes32", type: "bytes32" }],
        name: "getOrderFilledAmount",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
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
                    { name: "margin", internalType: "uint256", type: "uint256" },
                    { name: "matcherFee", internalType: "uint256", type: "uint256" },
                    { name: "id", internalType: "bytes32", type: "bytes32" },
                ],
            },
        ],
        name: "getOrderHash",
        outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "name", internalType: "string", type: "string" },
            { name: "version", internalType: "string", type: "string" },
            { name: "_addressManager", internalType: "address", type: "address" },
        ],
        name: "initialize",
        outputs: [],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "matcher", internalType: "address", type: "address" }],
        name: "isMatcher",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "orderId", internalType: "bytes32", type: "bytes32" }],
        name: "isOrderCanceled",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "matcher", internalType: "address", type: "address" },
            { name: "isMatcherArg", internalType: "bool", type: "bool" },
        ],
        name: "setMatcher",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
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
                                    { name: "margin", internalType: "uint256", type: "uint256" },
                                    { name: "matcherFee", internalType: "uint256", type: "uint256" },
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
    },
    {
        stateMutability: "nonpayable",
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
                            { name: "margin", internalType: "uint256", type: "uint256" },
                            { name: "matcherFee", internalType: "uint256", type: "uint256" },
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
                    { name: "margin", internalType: "uint256", type: "uint256" },
                    { name: "matcherFee", internalType: "uint256", type: "uint256" },
                    { name: "id", internalType: "bytes32", type: "bytes32" },
                ],
            },
        ],
    },
    { stateMutability: "nonpayable", type: "function", inputs: [], name: "withdrawMatcherFee", outputs: [] },
] as const

export const orderGatewayV2Address = "0x578599Cb55150E78bb195bD7Ed0C0E40C17F01B5" as const

export const orderGatewayV2Config = { address: orderGatewayV2Address, abi: orderGatewayV2ABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PythOracleAdapter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pythOracleAdapterABI = [
    { stateMutability: "nonpayable", type: "constructor", inputs: [] },
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
        inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
        name: "WithdrawOracleFeeFailed",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint8", type: "uint8", indexed: false }],
        name: "Initialized",
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
    { stateMutability: "nonpayable", type: "function", inputs: [], name: "acceptOwnership", outputs: [] },
    { stateMutability: "payable", type: "function", inputs: [], name: "depositOracleFee", outputs: [] },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "priceFeedId", internalType: "bytes32", type: "bytes32" }],
        name: "getPrice",
        outputs: [
            { name: "", internalType: "uint256", type: "uint256" },
            { name: "", internalType: "uint256", type: "uint256" },
        ],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "_pyth", internalType: "address", type: "address" }],
        name: "initialize",
        outputs: [],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "owner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "pendingOwner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "priceFeedId", internalType: "bytes32", type: "bytes32" }],
        name: "priceFeedExists",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "pyth",
        outputs: [{ name: "", internalType: "contract IPyth", type: "address" }],
    },
    { stateMutability: "nonpayable", type: "function", inputs: [], name: "renounceOwnership", outputs: [] },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
        name: "transferOwnership",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "priceFeedId", internalType: "bytes32", type: "bytes32" },
            { name: "signedData", internalType: "bytes", type: "bytes" },
        ],
        name: "updatePrice",
        outputs: [],
    },
    { stateMutability: "nonpayable", type: "function", inputs: [], name: "withdrawOracleFee", outputs: [] },
] as const

export const pythOracleAdapterAddress = "0xe2986e0bC2e6D4A7c271e24f7b45309A23f1d496" as const

export const pythOracleAdapterConfig = { address: pythOracleAdapterAddress, abi: pythOracleAdapterABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Quoter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const quoterABI = [
    {
        stateMutability: "nonpayable",
        type: "constructor",
        inputs: [{ name: "_addressManager", internalType: "address", type: "address" }],
    },
    { type: "error", inputs: [], name: "InternalQuoteShouldRevert" },
    {
        type: "event",
        anonymous: false,
        inputs: [{ name: "version", internalType: "uint8", type: "uint8", indexed: false }],
        name: "Initialized",
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "addressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
    },
    {
        stateMutability: "nonpayable",
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
    },
] as const

export const quoterAddress = "0x466d56192b80f90e58f7C1602A6AE041542A377D" as const

export const quoterConfig = { address: quoterAddress, abi: quoterABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vaultABI = [
    { stateMutability: "nonpayable", type: "constructor", inputs: [] },
    { type: "error", inputs: [], name: "AuthorizationAlreadySet" },
    { type: "error", inputs: [], name: "DepositCapExceeded" },
    {
        type: "error",
        inputs: [
            { name: "trader", internalType: "address", type: "address" },
            { name: "fund", internalType: "uint256", type: "uint256" },
            { name: "delta", internalType: "int256", type: "int256" },
        ],
        name: "InsufficientFund",
    },
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
    { type: "error", inputs: [], name: "NotWhitelistedAuthorization" },
    { type: "error", inputs: [], name: "Unauthorized" },
    { type: "error", inputs: [], name: "ZeroAmount" },
    {
        type: "event",
        anonymous: false,
        inputs: [
            { name: "authorizer", internalType: "address", type: "address", indexed: true },
            { name: "authroized", internalType: "address", type: "address", indexed: true },
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
        inputs: [{ name: "version", internalType: "uint8", type: "uint8", indexed: false }],
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
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "addressManager",
        outputs: [{ name: "", internalType: "contract IAddressManager", type: "address" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "trader", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
        ],
        name: "deposit",
        outputs: [],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getAccountValue",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getBadDebt",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [],
        name: "getCollateralToken",
        outputs: [{ name: "", internalType: "address", type: "address" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getFreeCollateral",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
            { name: "marginRequirementType", internalType: "enum MarginRequirementType", type: "uint8" },
        ],
        name: "getFreeCollateralForTrade",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getFreeMargin",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "trader", internalType: "address", type: "address" }],
        name: "getFund",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getMargin",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getMarginRatio",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "marginRequirementType", internalType: "enum MarginRequirementType", type: "uint8" },
        ],
        name: "getMarginRequirement",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getOpenNotional",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getPendingMargin",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
        name: "getPnlPoolBalance",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getPositionSize",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getSettledMargin",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "price", internalType: "uint256", type: "uint256" },
        ],
        name: "getUnrealizedPnl",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
        ],
        name: "getUnsettledPnl",
        outputs: [{ name: "", internalType: "int256", type: "int256" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "_addressManager", internalType: "address", type: "address" },
            { name: "collateralToken", internalType: "address", type: "address" },
        ],
        name: "initialize",
        outputs: [],
    },
    {
        stateMutability: "view",
        type: "function",
        inputs: [
            { name: "authorizer", internalType: "address", type: "address" },
            { name: "authorized", internalType: "address", type: "address" },
        ],
        name: "isAuthorized",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "authorized", internalType: "address", type: "address" },
            { name: "isAuthorized_", internalType: "bool", type: "bool" },
        ],
        name: "setAuthorization",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
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
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
        ],
        name: "transfer",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFund",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFundToMargin",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "amount", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFundToMargin",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "trader", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
        ],
        name: "transferMarginToFund",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [
            { name: "marketId", internalType: "uint256", type: "uint256" },
            { name: "amount", internalType: "uint256", type: "uint256" },
        ],
        name: "transferMarginToFund",
        outputs: [],
    },
    {
        stateMutability: "nonpayable",
        type: "function",
        inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
        name: "withdraw",
        outputs: [],
    },
    { stateMutability: "nonpayable", type: "function", inputs: [], name: "withdrawAllCollateral", outputs: [] },
] as const

export const vaultAddress = "0x8e185D536134F3e37056eb5b03456Cd469B5b2b6" as const

export const vaultConfig = { address: vaultAddress, abi: vaultABI } as const
