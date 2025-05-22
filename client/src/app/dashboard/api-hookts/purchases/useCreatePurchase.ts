import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { AddPurchaseDto } from "@/app/api/purchase/_dto/mutatePurchase.dto";

export function useCreatePurchase({ onSuccess }: { onSuccess?: () => void }) {
  return usePostData<AddPurchaseDto>({
    queryKeysToInvalidate: [["purchases"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_PURCHASE,
    callBackOnSuccess: onSuccess,
  });
}
