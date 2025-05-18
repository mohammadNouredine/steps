import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useCreateKid({ onSuccess }: { onSuccess?: () => void }) {
  return usePostData<FormData>({
    queryKeysToInvalidate: [["kids"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_KID,
    callBackOnSuccess: onSuccess,
  });
}
