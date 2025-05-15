import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { DashboardVariant } from "../../_common/types/variants";

export function useGetAllVariants() {
  return useReadData<DashboardVariant[]>({
    queryKey: ["variants"],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_VARIANTS,
  });
}
