import { bigIntToDecimal } from "../helpers/main.helpers";
import type { CollateralInfos } from "../types/farm.types";
import type { CollateralAmountPrice } from "./wagmiSH/viewFunctions/farm/useCollateralAmountPrice";

const getFarmTotalBalance = (collateralsInfos: CollateralInfos[], collateralAmountPrices: Record<string, CollateralAmountPrice>) => {
  return collateralsInfos.reduce((acc, info, index) => acc + (bigIntToDecimal(collateralAmountPrices[info.addressLP]?.collateralValue, info.decimals) ?? 0), 0);
};

export default getFarmTotalBalance;
