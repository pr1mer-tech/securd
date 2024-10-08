import { useEffect, useState } from "react";
import { useLendingPool } from "./wagmiSH/viewFunctions/useLendingPool";
import type { ReserveInfo } from "../types/save.types";
import getUserDToken from "./getUserDToken";
import type { BalanceLDToken } from "../types/global.types";
import type { Address } from "viem";

const getUserReservesInfo = (reserveInfos: ReserveInfo[], balanceLDToken: Record<Address, BalanceLDToken>) => {
  return reserveInfos.filter((reserveInfo) => {
    const userDToken = getUserDToken(reserveInfo, balanceLDToken[reserveInfo.address]);
    return userDToken.userDTokenAmount;
  });
};
export default getUserReservesInfo;
