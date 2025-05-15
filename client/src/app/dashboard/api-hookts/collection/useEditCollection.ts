import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { CreateDashboardCollection } from "../../_common/types/collection";
import { useUpdateData } from "@/api/api-service/useUpdateData";

export function useEditCollection({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<CreateDashboardCollection>({
    queryKeysToInvalidate: [["collections"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_COLLECTION(id),
    callBackOnSuccess: onSuccess,
  });
}
