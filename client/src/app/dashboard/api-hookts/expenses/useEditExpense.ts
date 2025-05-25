import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";
import { EditExpenseSchemaType } from "@/app/api/expense/_dto/mutate-expense.dto";

export function useEditExpense({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return useUpdateData<EditExpenseSchemaType>({
    queryKeysToInvalidate: [["expenses"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_EXPENSE,
    callBackOnSuccess,
  });
}
