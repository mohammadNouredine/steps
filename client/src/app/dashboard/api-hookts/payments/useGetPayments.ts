import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import {
  GetPaymentSchemaType,
  ReturnedPaymentResponse,
} from "@/app/api/payment/_dto/gets-payment.dto";

export function useGetPayments({ params }: { params: GetPaymentSchemaType }) {
  return useReadData<ReturnedPaymentResponse>({
    queryKey: ["payments", JSON.stringify(params)],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_PAYMENTS,
    params,
  });
}
