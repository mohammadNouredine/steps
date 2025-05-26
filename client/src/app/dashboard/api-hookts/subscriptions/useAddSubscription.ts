import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { AddSubscriptionSchemaType } from "@/app/api/subscription/_dto/mutate-subscription.dto";

export function useAddSubscription({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return usePostData<AddSubscriptionSchemaType>({
    queryKeysToInvalidate: [["subscriptions"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_SUBSCRIPTION,
    callBackOnSuccess,
  });
}
