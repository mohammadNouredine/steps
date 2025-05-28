import { useDeleteData } from "@/api/api-service/useDeleteData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export const useDeleteNote = ({
  id,
  callBackOnSuccess,
}: {
  id: number;
  callBackOnSuccess?: () => void;
}) => {
  return useDeleteData({
    queryKeysToInvalidate: [["notes"]],
    endpoint: DASHBOARD_ENDPOINTS.DELETE_NOTE(id),
    callBackOnSuccess,
  });
};
