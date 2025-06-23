import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeleteUser({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return useDeleteData({
    queryKeysToInvalidate: [["users"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_USER,
    callBackOnSuccess,
  });
}
