import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";

export const useDeleteSectionFromContent = () => {
  return useDeleteData({
    queryKeysToInvalidate: [["content"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_CONTENT_SECTION,
  });
};
