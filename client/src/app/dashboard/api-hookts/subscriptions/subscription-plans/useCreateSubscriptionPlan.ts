import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";
import { AddPlanDto } from "@/app/api/subscription-plans/_dto/add-edit-plan.dto.ts";

export function useCreateSubscriptionPlan({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  return usePostData<AddPlanDto>({
    queryKeysToInvalidate: [["subscription-plans"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_SUBSCRIPTION_PLAN,
    callBackOnSuccess: onSuccess,
  });
}
