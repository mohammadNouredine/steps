import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";

export function useEditSubscriptionPlan({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<FormData>({
    queryKeysToInvalidate: [["subscription-plans"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_SUBSCRIPTION_PLAN(id),
    callBackOnSuccess: onSuccess,
  });
}
