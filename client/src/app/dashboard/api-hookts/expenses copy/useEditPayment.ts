import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";
import { EditPaymentSchemaType } from "@/app/api/payment/_dto/mutate-payment.dto";

export function useEditPayment({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return useUpdateData<EditPaymentSchemaType>({
    queryKeysToInvalidate: [["payment"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_EXPENSE,
    callBackOnSuccess,
  });
}
