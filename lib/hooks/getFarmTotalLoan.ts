import type { CollateralInfos } from "../types/farm.types";
import {
  getPairReservesInfos,
  getTokensSymbol,
} from "../helpers/borrow.helpers";
import type { Coins, ReserveInfo } from "../types/save.types";
import getPairBorrowBalances from "./getPairBorrowBalances";
import type { CollateralAmountPrice } from "./wagmiSH/viewFunctions/farm/useCollateralAmountPrice";

const getFarmTotalLoan = (
  collateralInfos: CollateralInfos[],
  collateralAmountPrices: Record<string, CollateralAmountPrice>,
  reservesInfo: ReserveInfo[],
  coinPrices: Record<keyof Coins, number>
) => {
  return collateralInfos.reduce((totalLoan, collateralInfo) => {
    const pairReservesInfosUn = getPairReservesInfos(reservesInfo, collateralInfo);

    const borrowBalances = getPairBorrowBalances(
      collateralAmountPrices[collateralInfo.addressLP]?.debts,
      pairReservesInfosUn.reserveInfoTokenA,
      pairReservesInfosUn.reserveInfoTokenB
    );

    if (borrowBalances) {
      const loanA = borrowBalances.borrowBalanceA || 0;
      const loanB = borrowBalances.borrowBalanceB || 0;
      totalLoan +=
        loanA *
        coinPrices[
        pairReservesInfosUn.reserveInfoTokenA?.symbol as keyof Coins
        ];
      totalLoan +=
        loanB *
        coinPrices[
        pairReservesInfosUn.reserveInfoTokenB?.symbol as keyof Coins
        ];
    }

    return totalLoan;
  }, 0);
};
export default getFarmTotalLoan;
