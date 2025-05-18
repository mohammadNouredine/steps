import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeleteKid() {
  return useDeleteData({
    queryKeysToInvalidate: [["kids"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_KID,
  });
}
