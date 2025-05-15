import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { Content } from "../../_common/types/content";

export const useGetAllContent = () => {
  return useReadData<Content[]>({
    queryKey: ["content"],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_CONTENT,
  });
};
