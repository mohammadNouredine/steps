import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { GetPaymentSchemaType } from "@/app/api/payment/_dto/gets-payment.dto";
import { DashboardPaymentType } from "../../_common/types/payments";

export function useGetPayments({ params }: { params: GetPaymentSchemaType }) {
  return useReadData<GetPaymentsResponse>({
    queryKey: ["expenses", JSON.stringify(params)],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_EXPENSES,
    params,
  });
}

type GetPaymentsResponse = {
  data: DashboardPaymentType[];
};
