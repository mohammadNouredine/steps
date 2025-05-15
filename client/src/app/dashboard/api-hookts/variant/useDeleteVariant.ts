import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeleteVariant() {
  return useDeleteData({
    queryKeysToInvalidate: [["variants"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_VARIANT,
  });
}
