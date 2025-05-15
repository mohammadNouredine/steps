import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";
import { CreateDashboardTag } from "../../_common/types/tag";

export function useEditTag({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<CreateDashboardTag>({
    queryKeysToInvalidate: [["tags"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_TAG(id),
    callBackOnSuccess: onSuccess,
  });
}
