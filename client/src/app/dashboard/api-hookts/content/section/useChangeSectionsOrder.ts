import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";

export const useChangeSectionsOrder = () => {
  return usePostData<{
    sections: {
      sectionId: number;
      order: number;
    }[];
  }>({
    queryKeysToInvalidate: [["content"]],
    endpoint: DASHBOARD_ENDPOINTS.CHANGE_SECTIONS_ORDER,
  });
};
