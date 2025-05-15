import { useReadData } from "@/api/api-service/useReadData";
import { DashboardCollection } from "../../_common/types/collection";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useGetAllCollections(params: { withProducts?: boolean }) {
  const jsonParams = JSON.stringify(params);
  return useReadData<DashboardCollection[]>({
    queryKey: ["collections", jsonParams],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_COLLECTIONS,
    params,
  });
}
