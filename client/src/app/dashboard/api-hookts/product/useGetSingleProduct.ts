import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { DashboardProduct } from "../../_common/types/product";

export function useGetSingleProduct({ id }: { id: number }) {
  return useReadData<DashboardProduct>({
    queryKey: ["products"],
    endpoint: DASHBOARD_ENDPOINTS.GET_SINGLE_PRODUCT(id),
  });
}
