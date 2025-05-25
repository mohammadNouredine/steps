import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export const useDeleteExpense = () => {
  return useDeleteData({
    queryKeysToInvalidate: [["expenses"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_EXPENSE,
  });
};
