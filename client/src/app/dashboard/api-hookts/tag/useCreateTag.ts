import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { CreateDashboardTag } from "../../_common/types/tag";

export function useCreateTag({ onSuccess }: { onSuccess?: () => void }) {
  return usePostData<CreateDashboardTag>({
    queryKeysToInvalidate: [["tags"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_TAG,
    callBackOnSuccess: onSuccess,
  });
}
