import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeletePurchase() {
  return useDeleteData({
    queryKeysToInvalidate: [["purchases"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_PURCHASE,
  });
}
