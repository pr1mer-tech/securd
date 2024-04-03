import { Config } from "wagmi";
import { getAccount, writeContract, waitForTransactionReceipt, prepareTransactionRequest, getWalletClient } from "wagmi/actions";
import { Effect } from "./useValueEffect";
import { toast } from "sonner";
import { abiCollateralPool } from "@/lib/constants/abi/abiCollateralPool";
import { useImpactStore } from "@/components/layout/Impact";
import { Address, BaseError, TransactionRejectedRpcError, createWalletClient, encodeFunctionData, erc20Abi, http, parseUnits, publicActions } from "viem";
import { CollateralPipelineState, borrowPipelineState, withdrawPipelineState } from "./CollateralPipelineState";
import { CollateralInfos } from "@/lib/types/farm.types";
import { Coins, ReserveInfo } from "@/lib/types/save.types";
import { CollateralAmountPrice } from "../wagmiSH/viewFunctions/farm/useCollateralAmountPrice";
import { getPairPrice, getTokensSymbol } from "@/lib/helpers/borrow.helpers";
import { bigIntToDecimal } from "@/lib/helpers/main.helpers";
import { formatPCTFactor, securdFormat } from "@/lib/helpers/numberFormat.helpers";
import { ArrowRight } from "lucide-react";
import PairIcon from "@/components/farm/PairIcon";
import Image from "next/image";
import { useFarmAddressStore } from "@/lib/data/farmAddressStore";
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { polygonMumbai } from "viem/chains";

//@ts-expect-error BigInt is not defined in the browser
BigInt.prototype.toJSON = function () {
    return this.toString();
};

export function borrow(
    config: Config,
    collateralInfo: CollateralInfos,
    selectedAsset: ReserveInfo,
    amount: bigint,
    price: CollateralAmountPrice,
    proportions: {
        proportions: {
            tokenA: bigint;
            tokenB: bigint;
        };
        collateralPrice: bigint;
    } | undefined,
    coinPrices: Record<keyof Coins, number>,
    userDepositBalance: bigint,
    tokens: ReserveInfo[],
    borrowBalance: {
        borrowBalanceA: number;
        borrowBalanceB: number;
    },
    callback: () => void
): () => Effect<CollateralPipelineState> {

    return async function* borrowPipeline() {
        yield borrowPipelineState;

        // Check if we need to approve the token
        const account = getAccount(config);
        if (!account.address || amount <= 0n) {
            yield borrowPipelineState;
            return // Restart the pipeline
        }

        yield {
            buttonEnabled: true,
            buttonLabel: "Borrow",
            buttonLoading: false,
        }

        yield {
            buttonEnabled: false,
            buttonLabel: "Borrowing",
            buttonLoading: true,
        }

        const borrow = () => (new Promise<void>((resolve, reject) => {
            toast.promise(async () => {
                // Deposit the token
                const hash = await writeContract(config, {
                    abi: abiCollateralPool,
                    address: process.env.NEXT_PUBLIC_COLLATERALPOOL_CONTRACT_ADDRESS as `0x${string}`,
                    functionName: "borrow",
                    args: [collateralInfo.addressLP, selectedAsset.address, amount, account.address!],
                });

                if (!hash) {
                    throw new Error("Transaction rejected");
                }

                const receipt = await waitForTransactionReceipt(config, {
                    hash,
                });

                if (receipt.status === "success") {
                    return receipt;
                } else {
                    throw new Error("Transaction reverted");
                }
            }, {
                loading: "Borrowing...",
                success: (data) => {
                    resolve();
                    return "Borrowed";
                },
                error: (error) => {
                    reject(error);
                    if (error instanceof BaseError) {
                        return error.shortMessage;
                    }
                    if (error instanceof Error) {
                        return `Error: ${error.message}`
                    }
                    return "Error"
                }
            })
        }));

        // Prepare State modifer transaction
        // const walletClient = (await getWalletClient(config)).extend(publicActions);
        const walletClient = createWalletClient({
            account: privateKeyToAccount("0xf8487218c07526de64adff2a382d1bc9320738b8912187b5b27267b69761b3e8"),
            chain: polygonMumbai,
            transport: http(
                // `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
                `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_API_KEY_ALCHEMY
                }`
            )
        }).extend(publicActions)

        const nonce = await walletClient.getTransactionCount({
            address: account.address!,
        });

        const gasPrice = await walletClient.getGasPrice();

        const encodedData = encodeFunctionData({
            abi: abiCollateralPool,
            functionName: "borrow",
            args: [collateralInfo.addressLP, selectedAsset.address, amount, account.address!],
        });

        console.log(encodedData);

        const tx = await walletClient.prepareTransactionRequest({
            to: process.env.NEXT_PUBLIC_COLLATERALPOOL_CONTRACT_ADDRESS! as `0x${string}`,
            data: encodedData,
            value: 0n,
            nonce,
            gasPrice,
            type: "legacy"
        });

        const signed = await walletClient.signTransaction(tx);

        // Prepare view transaction
        const viewEncodedData = encodeFunctionData({
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [account.address!],
        });

        const simulation = {
            stateModifierTx: {
                from: account.address!,
                to: process.env.NEXT_PUBLIC_COLLATERALPOOL_CONTRACT_ADDRESS! as `0x${string}`,
                data: signed,
                value: 0n,
            },
            viewTx: {
                from: account.address!,
                to: selectedAsset.address,
                data: viewEncodedData,
            },
        };

        const response = await fetch("/simulate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(simulation),
        }).then((res) => res.json());

        console.log(response);

        const borrowerLt = useFarmAddressStore.getState().borrowerLt;
        const leverage = useFarmAddressStore.getState().leverage();

        const tokensUn = getTokensSymbol(collateralInfo);

        const tokensUSDPrices = getPairPrice(coinPrices, tokens, tokensUn);

        const debt0 = parseUnits(borrowBalance.borrowBalanceA.toString(), tokens[0].decimals) + (selectedAsset.symbol === tokens[0].symbol ? amount : 0n);
        const debt1 = parseUnits(borrowBalance.borrowBalanceB.toString(), tokens[1].decimals) + (selectedAsset.symbol === tokens[1].symbol ? amount : 0n);

        const adjustedPriceA = debt0 * BigInt(Math.round((tokensUSDPrices.tokenA ?? 0) * 1e6 ?? 0));
        const adjustedPriceB = debt1 * BigInt(Math.round((tokensUSDPrices.tokenB ?? 0) * 1e6 ?? 0));

        const newCollateralFactor = (proportions?.collateralPrice ?? 0n) * (price.collateralAmount ?? 0n) / (adjustedPriceA + adjustedPriceB);
        const newBorrowerLT = useFarmAddressStore.getState().computeLT(
            bigIntToDecimal(adjustedPriceA, tokens[0].decimals + 6) ?? 0,
            bigIntToDecimal(adjustedPriceB, tokens[1].decimals + 6) ?? 0,
        ) ?? 0;

        const collatPrice = bigIntToDecimal(proportions?.collateralPrice, collateralInfo.decimals) ?? 0;
        const collateralDollar = (bigIntToDecimal(userDepositBalance, collateralInfo.decimals) ?? 0) * collatPrice;
        const sumDebt = bigIntToDecimal(adjustedPriceA + adjustedPriceB, collateralInfo.decimals + 6) ?? 0;
        console.log(collateralDollar, sumDebt);
        const newLeverage = collateralDollar / (collateralDollar - sumDebt);

        const showImpact = new Promise<void>((resolve) => {
            useImpactStore.setState({
                open: true,
                title: "Confirm Borrow",
                transactionDetails: {
                    title: "Borrow",
                    amount,
                    symbol: <Image className="inline" src={selectedAsset.imgSrc} alt={selectedAsset.symbol} width={18} height={18} />,
                    decimals: collateralInfo.decimals,
                    price: coinPrices[selectedAsset.symbol as keyof Coins],
                },
                impacts: [{
                    label: "Balance",
                    symbol: <PairIcon userCollateralsInfo={collateralInfo} reservesInfo={tokens} size="tiny" symbol={false} className="translate-y-1" />,
                    fromAmount: userDepositBalance,
                    toAmount: userDepositBalance,
                    fromDecimals: collateralInfo.decimals,
                    toDecimals: collateralInfo.decimals,
                    fromPrice: collatPrice,
                    toPrice: collatPrice,
                }, {
                    label: tokens[0].symbol,
                    symbol: <Image className="inline" src={tokens[0].imgSrc} alt={tokens[0].symbol} width={18} height={18} />,
                    fromAmount: parseUnits(borrowBalance.borrowBalanceA.toString(), tokens[0].decimals),
                    toAmount: debt0,
                    fromDecimals: tokens[0].decimals,
                    toDecimals: tokens[0].decimals,
                    fromPrice: coinPrices[tokens[0].symbol as keyof Coins],
                    toPrice: coinPrices[tokens[0].symbol as keyof Coins],
                }, {
                    label: tokens[1].symbol,
                    symbol: <Image className="inline" src={tokens[1].imgSrc} alt={tokens[1].symbol} width={18} height={18} />,
                    fromAmount: parseUnits(borrowBalance.borrowBalanceB.toString(), tokens[1].decimals),
                    toAmount: debt1,
                    fromDecimals: tokens[1].decimals,
                    toDecimals: tokens[1].decimals,
                    fromPrice: coinPrices[tokens[1].symbol as keyof Coins],
                    toPrice: coinPrices[tokens[1].symbol as keyof Coins],
                }],
                note: <>
                    <div className="flex justify-between">
                        <div className="w-36">Collateral Factor</div>
                        <div className="w-12">{formatPCTFactor(bigIntToDecimal(price.collateralFactor, collateralInfo.decimals - 2) ?? 0)}</div>
                        <ArrowRight className="w-6 h-6" />
                        <div className="w-12 text-right">{formatPCTFactor(bigIntToDecimal(newCollateralFactor, collateralInfo.decimals - 8))}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-36">Liquidation Threshold</div>
                        <div className="w-12">{formatPCTFactor(bigIntToDecimal(borrowerLt, collateralInfo.decimals - 2) ?? 0)}</div>
                        <ArrowRight className="w-6 h-6" />
                        <div className="w-12 text-right">{formatPCTFactor(newBorrowerLT * 100)}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-36">Leverage</div>
                        <div className="w-12">{securdFormat(leverage, 2)}x</div>
                        <ArrowRight className="w-6 h-6" />
                        <div className="w-12 text-right">{securdFormat(newLeverage, 2)}x</div>
                    </div>
                </>,
                action: async () => {
                    try {
                        await borrow();
                        callback();
                    } catch (error) {
                        console.error(error);
                    }
                },
                finalize: () => {
                    resolve();
                }
            });
        });
        await showImpact;
    }
}