import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";
import { EditExpenseSchemaType } from "@/app/api/expense/_dto/mutate-expense.dto";

export function useEditSubscription({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return useUpdateData<EditExpenseSchemaType>({
    queryKeysToInvalidate: [["subscriptions"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_SUBSCRIPTION,
    callBackOnSuccess,
  });
}
