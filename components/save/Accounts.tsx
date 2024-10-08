"use client";

import getUserReservesInfo from "@/lib/hooks/getUserReservesInfo";
import type { Coins, ReserveInfo } from "@/lib/types/save.types";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import QuestionMark from "@/assets/icons/question-mark.svg";
import { useSaveStore } from "@/lib/data/saveStore";
import {
    TableCaption,
} from "@/components/ui/table"
import { AccountCard } from "./AccountCard";
import { cn } from "@/lib/utils";
import getUserDepositBalance from "@/lib/hooks/getUserDepositBalance";
import { bigIntToDecimal } from "@/lib/helpers/main.helpers";


export default function Accounts() {

    const reservesInfo = useSaveStore.use.reservesInfo();
    const balanceLDTokens = useSaveStore.use.balanceLDTokens();
    const coinPrices = useSaveStore.use.coinPrices();

    const userReservesInfo = getUserReservesInfo(reservesInfo, balanceLDTokens).filter(
        (userReserveInfo: ReserveInfo) => {
            const coin = userReserveInfo.symbol as keyof Coins;
            const price = coinPrices[coin] ?? 0;

            const userDepositBalance = getUserDepositBalance(userReserveInfo, balanceLDTokens[userReserveInfo.address]);
            const userDepositBalanceNumber = bigIntToDecimal(userDepositBalance, userReserveInfo.decimals);

            return price * (userDepositBalanceNumber ?? 0) > 0.001; // Filter out accounts with less than $0.001 value
        }
    );

    return <>
        <div className={cn("relative before:absolute before:inset-0 before:bg-securdPrimaryLight before:-top-[4.3rem] before:w-full before:z-[-1] pb-4",
            userReservesInfo.length > 0 ? "before:h-[calc(100%+4.25rem)]" : "before:h-0"
        )}>
            <div className="max-w-7xl mx-auto px-4">
                {userReservesInfo.length > 0 && <h2 className="text-xl font-bold mt-4">My Accounts ({userReservesInfo.length})</h2>}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
                >
                    {userReservesInfo?.map(
                        (userReserveInfo: ReserveInfo, key: number) => (
                            <AccountCard key={key} userReserveInfo={userReserveInfo} />
                        ))}
                </div>
            </div>
        </div>
    </>
}