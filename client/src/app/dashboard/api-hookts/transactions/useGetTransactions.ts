import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import {
  GetTransactionSchemaType,
  ReturnedTransactionResponse,
} from "@/app/api/transaction/_dto/gets-transaction.dto";

export function useGetTransactions({
  params,
}: {
  params: GetTransactionSchemaType;
}) {
  return useReadData<ReturnedTransactionResponse>({
    queryKey: ["transactions", JSON.stringify(params)],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_TRANSACTIONS,
    params,
  });
}
