import { UpdateDashboardVariant } from "../../_common/types/variants";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";

export function useEditVariant({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<UpdateDashboardVariant>({
    queryKeysToInvalidate: [["variants"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_VARIANT(id),
    callBackOnSuccess: onSuccess,
  });
}
