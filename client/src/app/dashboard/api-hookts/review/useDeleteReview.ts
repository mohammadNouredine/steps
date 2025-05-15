import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useDeleteReview() {
  return useDeleteData({
    queryKeysToInvalidate: [["reviews"], ["reviews_summary"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_REVIEW,
  });
}
