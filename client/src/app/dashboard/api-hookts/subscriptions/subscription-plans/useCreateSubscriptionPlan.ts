import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";

export function useCreateSubscriptionPlan({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  return usePostData<FormData>({
    queryKeysToInvalidate: [["subscription-plans"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_SUBSCRIPTION_PLAN,
    callBackOnSuccess: onSuccess,
  });
}
