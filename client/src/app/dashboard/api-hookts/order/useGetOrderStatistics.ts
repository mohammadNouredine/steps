// statistics;
import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { OrderStatistics } from "../../_common/types/order";

export function useGetOrderStatistics(params: {
  startDate?: Date;
  endDate?: Date;
}) {
  return useReadData<OrderStatistics>({
    queryKey: ["orders", params],
    endpoint: DASHBOARD_ENDPOINTS.GET_ORDER_STATISTICS,
    params,
  });
}
