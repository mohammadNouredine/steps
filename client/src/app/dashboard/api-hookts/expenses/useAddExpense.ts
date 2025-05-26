import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { AddExpenseSchemaType } from "@/app/api/expense/_dto/mutate-expense.dto";

export function useAddExpense({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return usePostData<AddExpenseSchemaType>({
    queryKeysToInvalidate: [["expenses"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_EXPENSE,
    callBackOnSuccess,
  });
}
