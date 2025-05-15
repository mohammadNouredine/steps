import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { DashboardTag } from "../../_common/types/tag";

export function useGetAllTags() {
  return useReadData<DashboardTag[]>({
    queryKey: ["tags"],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_TAGS,
  });
}
