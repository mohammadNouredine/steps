import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export const useDeletePayment = () => {
  return useDeleteData({
    queryKeysToInvalidate: [["payments"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_PAYMENT,
  });
};
