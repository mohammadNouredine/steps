import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";

export function useAddProductsToCollection({
  collectionId,
  onSuccess,
}: {
  collectionId: number;
  onSuccess?: () => void;
}) {
  return useUpdateData<{ productIds: number[] }>({
    queryKeysToInvalidate: [["products"], ["collections"]],
    endpoint: DASHBOARD_ENDPOINTS.ADD_PRODUCTS_TO_COLLECTION(collectionId),
    callBackOnSuccess: onSuccess,
  });
}
