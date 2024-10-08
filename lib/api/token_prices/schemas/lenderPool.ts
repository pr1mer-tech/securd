/**
 * Generated by orval v6.16.0 🍺
 * Do not edit manually.
 * Pyratzlabs API
 * Securd contracts
 * OpenAPI spec version: v1
 */
import type { LenderDataContract } from "./lenderDataContract";
import type { LenderModelContract } from "./lenderModelContract";
import type { Asset } from "./asset";
import type { DToken } from "./dToken";
import type { LightBorrowerPool } from "./lightBorrowerPool";

export interface LenderPool {
  data_contract: LenderDataContract;
  model_contract: LenderModelContract;
  asset: Asset;
  global_deposit?: number;
  readonly global_interest?: string;
  d_token: DToken;
  borrower_pool: LightBorrowerPool[];
}
