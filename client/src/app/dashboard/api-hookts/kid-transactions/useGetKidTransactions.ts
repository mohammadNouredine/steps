import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import {
  GetKidTransactionsParams,
  GetKidTransactionsResponse,
} from "../../_common/types/kidTransactions";

export function useGetKidTransactions({
  params,
}: {
  params?: GetKidTransactionsParams;
}) {
  return useReadData<GetKidTransactionsResponse>({
    queryKey: ["kid-transactions", JSON.stringify(params)],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_KID_TRANSACTIONS,
    params,
  });
}
