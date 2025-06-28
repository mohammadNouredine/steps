import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export const useDeleteTransaction = () => {
  return useDeleteData({
    queryKeysToInvalidate: [["transactions"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_TRANSACTION,
  });
};
