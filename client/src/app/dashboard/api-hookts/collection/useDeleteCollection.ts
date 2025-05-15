import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeleteCollection() {
  return useDeleteData({
    queryKeysToInvalidate: [["collections"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_COLLECTION,
  });
}
