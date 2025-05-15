import { useUpdateData } from "@/api/api-service/useUpdateData";
import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";

export function useAddStock({
  productId,
  onSuccess,
}: {
  productId: number;
  onSuccess?: () => void;
}) {
  return useUpdateData<AddStockParams>({
    queryKeysToInvalidate: [["products"]],
    endpoint: DASHBOARD_ENDPOINTS.ADD_STOCK_TO_PRODUCT(productId),
    callBackOnSuccess: onSuccess,
  });
}
type AddStockParams = {
  quantity: number;
  productVariantsQuantities?: {
    productVariantId: number;
    quantity: number;
  }[];
};
