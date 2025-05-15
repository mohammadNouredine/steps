import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { DashboardReview } from "../../_common/types/review";

export function useGetAllReviews() {
  return useReadData<DashboardReview[]>({
    queryKey: ["reviews"],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_REVIEWS,
  });
}
