import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export const useDeleteSubscription = () => {
  return useDeleteData({
    queryKeysToInvalidate: [["subscriptions"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_SUBSCRIPTION,
  });
};
