import { lendingPoolContract } from "@/lib/constants/wagmiConfig/wagmiConfig";
import { bigIntToDecimal } from "@/lib/helpers/main.helpers";
import { ReserveInfo } from "@/lib/types/save.types";
import { Address } from "viem";
import { useAccount, useReadContracts } from "wagmi";

const useGetLenderSupply: (reserveInfos: ReserveInfo[]) => Record<Address, bigint> = (reserveInfos) => {
  const { isConnected, address } = useAccount();

  const { data } = useReadContracts({
    contracts: reserveInfos.map((reserve) => ({
      ...lendingPoolContract,
      functionName: "getLenderSupply",
      args: [reserve.address, address as string],
    })) as any,
    query: {
      enabled: isConnected,
      refetchInterval: 10000,
    },
  });

  if (!data) return {};

  return Object.fromEntries(data.map((item, i) => ([reserveInfos[i].address, BigInt(item.result as string)])))
};

export default useGetLenderSupply;
