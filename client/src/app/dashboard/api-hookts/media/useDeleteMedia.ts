import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeleteMedia() {
  return useDeleteData({
    queryKeysToInvalidate: [["media"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_MEDIA,
  });
}
