import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";

export function useEditMedia({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<FormData>({
    queryKeysToInvalidate: [["media"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_MEDIA(id),
    callBackOnSuccess: onSuccess,
  });
}
