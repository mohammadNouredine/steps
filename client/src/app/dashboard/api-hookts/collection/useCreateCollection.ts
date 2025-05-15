import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { CreateDashboardCollection } from "../../_common/types/collection";

export function useCreateCollection({ onSuccess }: { onSuccess?: () => void }) {
  return usePostData<CreateDashboardCollection>({
    queryKeysToInvalidate: [["collections"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_COLLECTION,
    callBackOnSuccess: onSuccess,
  });
}
