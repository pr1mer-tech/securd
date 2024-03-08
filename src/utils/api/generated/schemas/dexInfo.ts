/**
 * Generated by orval v6.16.0 🍺
 * Do not edit manually.
 * Pyratzlabs API
 * Securd contracts
 * OpenAPI spec version: v1
 */
import type { Asset } from "./asset";
import type { LpTokenContract } from "./lpTokenContract";

export interface DexInfo {
  token_a: Asset;
  token_b: Asset;
  lp: LpTokenContract;
  token_a_dex_supply?: number;
  token_b_dex_supply?: number;
  lp_total_supply?: number;
  dex_address?: string | null;
}
