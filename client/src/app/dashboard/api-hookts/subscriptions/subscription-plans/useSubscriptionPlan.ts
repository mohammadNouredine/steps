import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";

export function useDeleteSubscriptionPlan() {
  return useDeleteData({
    queryKeysToInvalidate: [["subscription-plans"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_SUBSCRIPTION_PLAN,
  });
}
