import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";
import { EditPlanDto } from "@/app/api/subscription-plans/_dto/add-edit-plan.dto.ts";
export function useEditSubscriptionPlan({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<EditPlanDto>({
    queryKeysToInvalidate: [["subscription-plans"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_SUBSCRIPTION_PLAN(id),
    callBackOnSuccess: onSuccess,
  });
}
