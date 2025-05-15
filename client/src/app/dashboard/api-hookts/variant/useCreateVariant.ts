import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { CreateDashboardVariant } from "../../_common/types/variants";

export function useCreateVariant({ onSuccess }: { onSuccess?: () => void }) {
  return usePostData<CreateDashboardVariant>({
    queryKeysToInvalidate: [["variants"]],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_VARIANTS,
    callBackOnSuccess: onSuccess,
  });
}
