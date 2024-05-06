export const abiBorrowerData = [
    {
        inputs: [
            {
                internalType: "address payable",
                name: "lendingPool_",
                type: "address"
            },
            {
                internalType: "address payable",
                name: "collateralPool_",
                type: "address"
            },
            {
                internalType: "address",
                name: "assetPriceOracle_",
                type: "address"
            },
            {
                internalType: "address",
                name: "collateralPriceOracle_",
                type: "address"
            },
            {
                internalType: "address",
                name: "liquidationThreshold_",
                type: "address"
            }
        ],
        stateMutability: "payable",
        type: "constructor"
    },
    {
        inputs: [],
        name: "assetPriceOracle",
        outputs: [
            {
                internalType: "contract AssetPriceOracle",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "collateralPool",
        outputs: [
            {
                internalType: "address payable",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "collateralPriceOracle",
        outputs: [
            {
                internalType: "contract CollateralPriceOracle",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "borrower_",
                type: "address"
            },
            {
                internalType: "address",
                name: "token_",
                type: "address"
            }
        ],
        name: "getCollateralFactor",
        outputs: [
            {
                internalType: "uint256",
                name: "value_",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "borrower_",
                type: "address"
            },
            {
                internalType: "address",
                name: "token_",
                type: "address"
            }
        ],
        name: "getLeverageFactor",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "borrower_",
                type: "address"
            },
            {
                internalType: "address",
                name: "token_",
                type: "address"
            }
        ],
        name: "getMaxBorrowA",
        outputs: [
            {
                internalType: "uint256",
                name: "maxBorrowA_",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "borrower_",
                type: "address"
            },
            {
                internalType: "address",
                name: "token_",
                type: "address"
            }
        ],
        name: "getMaxBorrowB",
        outputs: [
            {
                internalType: "uint256",
                name: "maxBorrowB_",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "borrower_",
                type: "address"
            },
            {
                internalType: "address",
                name: "token_",
                type: "address"
            }
        ],
        name: "getMaxIncrease",
        outputs: [
            {
                internalType: "uint256",
                name: "maxIncrease_",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "borrower_",
                type: "address"
            },
            {
                internalType: "address",
                name: "token_",
                type: "address"
            }
        ],
        name: "getMaxRelease",
        outputs: [
            {
                internalType: "uint256",
                name: "maxRelease_",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "token",
                        type: "address"
                    },
                    {
                        internalType: "address",
                        name: "borrower",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "amount0",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "amount1",
                        type: "uint256"
                    },
                    {
                        internalType: "bool",
                        name: "direction",
                        type: "bool"
                    },
                    {
                        internalType: "bool",
                        name: "direction0",
                        type: "bool"
                    },
                    {
                        internalType: "bool",
                        name: "direction1",
                        type: "bool"
                    }
                ],
                internalType: "struct DataIn",
                name: "dataIn_",
                type: "tuple"
            }
        ],
        name: "getPositionData",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "collateral",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "collateralValue",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "debt0",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "debtValue0",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "debt1",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "debtValue1",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "collateralFactor",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "liquidationFactor",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "leverageFactor",
                        type: "uint256"
                    }
                ],
                internalType: "struct DataOut",
                name: "data_",
                type: "tuple"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "lendingPool",
        outputs: [
            {
                internalType: "address payable",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "liquidationThreshold",
        outputs: [
            {
                internalType: "contract LiquidationThreshold",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
] as const;