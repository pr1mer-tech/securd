import { useEffect, useState } from "react";
import { bigIntToDecimal } from "../helpers/main.helpers";
import type { ReserveInfo } from "../types/save.types";
import getLDtoken from "./wagmiSH/viewFunctions/useLDtokens";

const getUserDToken = (reserveInfo: ReserveInfo | undefined, balanceLDToken: {
  dToken: bigint;
  lToken: bigint;
}) => {
  // const { balanceLDToken } = getLDtoken(
  //   reserveInfo?.tokenInfo.dToken,
  //   reserveInfo?.tokenInfo.lToken
  // );

  const userDTokenAmount = balanceLDToken?.dToken

  return { userDTokenAmount };
};

export default getUserDToken;
