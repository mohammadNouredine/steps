import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeleteProduct() {
  return useDeleteData({
    queryKeysToInvalidate: [["products"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_PRODUCT,
  });
}
