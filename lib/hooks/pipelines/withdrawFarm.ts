import { ReserveInfo } from "@/lib/types/save.types";
import { Config } from "wagmi";
import { getAccount, writeContract, waitForTransactionReceipt } from "wagmi/actions";
import { Effect } from "./useValueEffect";
import { SavePipelineState, savePipelineState2 } from "./SavePipelineState";
import { toast } from "sonner";
import { abiCollateralPool } from "@/lib/constants/abi/abiCollateralPool";
import { useImpactStore } from "@/components/layout/Impact";
import { BaseError, TransactionRejectedRpcError } from "viem";
import { CollateralPipelineState, withdrawPipelineState } from "./CollateralPipelineState";
import { CollateralInfos } from "@/lib/types/farm.types";

export function withdraw(config: Config, collateralInfo: CollateralInfos, amount: bigint, price: number, userDepositBalance: bigint, userBalance: bigint, callback: () => void): () => Effect<CollateralPipelineState> {
    return async function* withdrawPipeline() {
        yield withdrawPipelineState;

        // Check if we need to approve the token
        const account = getAccount(config);
        if (!account.address || amount <= 0n || userDepositBalance < amount) {
            yield withdrawPipelineState;
            return // Restart the pipeline
        }

        yield {
            buttonEnabled: true,
            buttonLabel: "Withdraw",
            buttonLoading: false,
        }

        yield {
            buttonEnabled: false,
            buttonLabel: "Withdrawing",
            buttonLoading: true,
        }

        const withdraw = () => (new Promise<void>((resolve, reject) => {
            toast.promise(async () => {
                // Deposit the token
                const hash = await writeContract(config, {
                    abi: abiCollateralPool,
                    address: process.env.NEXT_PUBLIC_COLLATERALPOOL_CONTRACT_ADDRESS as `0x${string}`,
                    functionName: "withdraw",
                    args: [collateralInfo.addressLP, amount, account.address!],
                });

                const receipt = await waitForTransactionReceipt(config, {
                    hash,
                });

                if (receipt.status === "success") {
                    return receipt;
                } else {
                    throw new Error("Transaction reverted");
                }
            }, {
                loading: "Withdrawing...",
                success: (data) => {
                    resolve();
                    return "Withdrawn";
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

        const showImpact = new Promise<void>((resolve) => {
            useImpactStore.setState({
                open: true,
                title: "Confirm Withdrawal",
                transactionDetails: {
                    title: "Withdraw",
                    amount,
                    symbol: collateralInfo.symbol,
                    decimals: collateralInfo.decimals,
                    price: price,
                },
                impacts: [{
                    label: "Balance",
                    fromAmount: userDepositBalance,
                    toAmount: userDepositBalance - amount,
                    fromDecimals: collateralInfo.decimals,
                    toDecimals: collateralInfo.decimals,
                    fromPrice: price,
                    toPrice: price,
                }],
                action: async () => {
                    try {
                        await withdraw();
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