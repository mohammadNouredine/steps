import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { DashboardOrder } from "../../_common/types/order";

export function useGetAllOrders() {
  return useReadData<DashboardOrder[]>({
    queryKey: ["orders"],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_ORDERS,
  });
}
