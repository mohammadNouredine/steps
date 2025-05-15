import { CreateDashboardReview } from "../../_common/types/review";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";

export function useEditReview({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<CreateDashboardReview>({
    queryKeysToInvalidate: [["reviews"], ["reviews_summary"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_REVIEW(id),
    callBackOnSuccess: onSuccess,
  });
}
