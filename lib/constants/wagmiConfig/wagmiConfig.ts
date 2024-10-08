import type { Address } from "viem";
import { abiLendingPool } from "../abi/abiLendingPool";
import { abiCollateralPool } from "../abi/abiCollateralPool";
import { abiCollateralPrice } from "../abi/abiCollateralPrice";
import { abiAssetPriceOracle } from "../abi/abiPriceOracle";
import { abiBorrowerData } from "../abi/abiBorrowerData";

// POLYGON

export const lendingPoolContract = {
  address: process.env.NEXT_PUBLIC_LENDINGPOOL_CONTRACT_ADDRESS as Address,
  abi: abiLendingPool,
} as const;

export const collateralPoolContract = {
  address: process.env.NEXT_PUBLIC_COLLATERALPOOL_CONTRACT_ADDRESS as Address,
  abi: abiCollateralPool,
} as const;

export const borrowerDataContract = {
  address: process.env.NEXT_PUBLIC_BORROWERDATA_CONTRACT_ADDRESS as Address,
  abi: abiBorrowerData,
} as const;

export const assetPriceOracleContract = {
  address: process.env.NEXT_PUBLIC_ASSETPRICEORACLE_CONTRACT_ADDRESS as Address,
  abi: abiAssetPriceOracle,
} as const;

export const collateralPriceContract = {
  address: process.env.NEXT_PUBLIC_COLLATERALPRICE_CONTRACT_ADDRESS as Address,
  abi: abiCollateralPrice,
} as const;

// ARBITRUM

export const arbitrum_lendingPoolContract = {
  address: process.env
    .NEXT_PUBLIC_ARBITRUM_LENDINGPOOL_CONTRACT_ADDRESS as Address,
  abi: abiLendingPool,
} as const;

export const arbitrum_collateralPoolContract = {
  address: process.env
    .NEXT_PUBLIC_ARBITRUM_COLLATERALPOOL_CONTRACT_ADDRESS as Address,
  abi: abiCollateralPool,
} as const;

export const arbitrum_assetPriceOracleContract = {
  address: process.env
    .NEXT_PUBLIC_ARBITRUM_ASSETPRICEORACLE_CONTRACT_ADDRESS as Address,
  abi: abiAssetPriceOracle,
} as const;

export const arbitrum_collateralPriceContract = {
  address: process.env
    .NEXT_PUBLIC_ARBITRUM_COLLATERALPRICE_CONTRACT_ADDRESS as Address,
  abi: abiCollateralPrice,
} as const;
