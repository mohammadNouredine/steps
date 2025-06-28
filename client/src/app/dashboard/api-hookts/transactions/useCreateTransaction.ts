import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { AddTransactionSchemaType } from "@/app/api/transaction/_dto/mutate-transaction.dto";

export function useCreateTransaction({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  return usePostData<AddTransactionSchemaType>({
    queryKeysToInvalidate: [["transactions"], ["kids"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_TRANSACTION,
    callBackOnSuccess: onSuccess,
  });
}
