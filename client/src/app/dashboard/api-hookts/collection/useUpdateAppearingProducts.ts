import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";

export function useUpdateAppearingProducts({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<{
    appearingProductsIds: number[];
  }>({
    queryKeysToInvalidate: [["collections"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_COLLECTION_APPEARING_PRODUCTS(id),
    callBackOnSuccess: onSuccess,
  });
}
