import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import {
  GetExpenseSchemaType,
  ReturnedExpenseResponse,
} from "@/app/api/expense/_dto/gets-expense.dto";

export function useGetExpenses({ params }: { params: GetExpenseSchemaType }) {
  return useReadData<ReturnedExpenseResponse>({
    queryKey: ["expenses", JSON.stringify(params)],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_EXPENSES,
    params,
  });
}
