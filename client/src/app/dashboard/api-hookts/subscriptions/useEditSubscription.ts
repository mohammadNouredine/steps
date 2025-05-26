import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";
import { EditSubscriptionSchemaType } from "@/app/api/subscription/_dto/mutate-subscription.dto";

export function useEditSubscription({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return useUpdateData<EditSubscriptionSchemaType>({
    queryKeysToInvalidate: [["subscriptions"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_SUBSCRIPTION,
    callBackOnSuccess,
  });
}
