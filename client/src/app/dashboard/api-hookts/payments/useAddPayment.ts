import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { AddPaymentSchemaType } from "@/app/api/payment/_dto/mutate-payment.dto";

export function useAddPayment({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return usePostData<AddPaymentSchemaType>({
    queryKeysToInvalidate: [["payments"], ["kids"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_PAYMENT,
    callBackOnSuccess,
  });
}
