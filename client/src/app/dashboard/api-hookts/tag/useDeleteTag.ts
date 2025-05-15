import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeleteTag() {
  return useDeleteData({
    queryKeysToInvalidate: [["tags"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_TAG,
  });
}
