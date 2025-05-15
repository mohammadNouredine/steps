import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { DashboardMedia } from "../../_common/types/media";

export function useGetSingleMedia(id: number) {
  return useReadData<DashboardMedia>({
    queryKey: ["media", id],
    endpoint: DASHBOARD_ENDPOINTS.GET_SINGLE_MEDIA(id),
  });
}
