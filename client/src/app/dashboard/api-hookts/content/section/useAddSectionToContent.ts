import { DASHBOARD_ENDPOINTS } from "../../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";

export const useAddSectionToContent = ({
  contentId,
  callBackOnSuccess,
}: {
  contentId: number;
  callBackOnSuccess?: () => void;
}) => {
  return useUpdateData<{
    contentType: "collection";
    collectionId: number;
  }>({
    queryKeysToInvalidate: [["content"]],
    endpoint: DASHBOARD_ENDPOINTS.ADD_SECTION_TO_CONTENT(contentId),
    callBackOnSuccess,
  });
};
