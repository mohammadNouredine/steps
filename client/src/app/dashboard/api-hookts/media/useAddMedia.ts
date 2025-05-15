import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useAddMedia({ onSuccess }: { onSuccess?: () => void }) {
  return usePostData<FormData>({
    queryKeysToInvalidate: [["media"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_MEDIA,
    callBackOnSuccess: onSuccess,
  });
}
