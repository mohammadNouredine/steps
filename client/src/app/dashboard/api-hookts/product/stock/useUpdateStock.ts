import { useUpdateData } from "@/api/api-service/useUpdateData";
import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";

export function useUpdateStock({
  productId,
  onSuccess,
}: {
  productId: number;
  onSuccess?: () => void;
}) {
  return useUpdateData<{ quantity: number }>({
    queryKeysToInvalidate: [["products"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_STOCK_OF_PRODUCT(productId),
    callBackOnSuccess: onSuccess,
  });
}
