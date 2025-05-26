import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";
import { EditPurchaseDto } from "@/app/api/purchase/_dto/mutatePurchase.dto";

export function useEditPurchase({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<EditPurchaseDto>({
    queryKeysToInvalidate: [["purchases"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_PURCHASE(id),
    callBackOnSuccess: onSuccess,
  });
}
