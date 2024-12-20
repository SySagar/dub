import { fetcher } from "@dub/utils";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import useSWR from "swr";
import { PayoutMethod } from "../dots/types";
import useDotsUser from "./use-dots-user";

export default function usePayoutMethods() {
  const { partnerId } = useParams();

  const { dotsUser } = useDotsUser();

  const {
    data: payoutMethods,
    error,
    isLoading,
    mutate,
  } = useSWR<PayoutMethod[]>(
    partnerId ? `/api/partners/${partnerId}/payout-methods` : null,
    fetcher,
  );

  const payoutMethodsWithDefault = useMemo(() => {
    return payoutMethods?.map((method) => ({
      ...method,
      default: dotsUser?.default_payout_method === method.platform,
    }));
  }, [payoutMethods, dotsUser]);

  return {
    payoutMethods: payoutMethodsWithDefault || [],
    error,
    isLoading,
    mutate,
  };
}
