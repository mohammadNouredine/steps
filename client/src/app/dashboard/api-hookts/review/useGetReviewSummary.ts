import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useGetReviewSummary() {
  return useReadData<{
    average: number;
    total: number;
  }>({
    queryKey: ["reviews_summary"],
    endpoint: DASHBOARD_ENDPOINTS.GET_REVIEWS_SUMMARY,
  });
}
