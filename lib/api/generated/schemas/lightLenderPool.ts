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

export interface LightLenderPool {
  data_contract: LenderDataContract;
  model_contract: LenderModelContract;
  asset: Asset;
  d_token: DToken;
}
