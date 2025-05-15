import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeleteOrder() {
  return useDeleteData({
    queryKeysToInvalidate: [["orders"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_ORDER,
  });
}
