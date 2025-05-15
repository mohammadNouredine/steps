import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { CreateDashboardOrder } from "../../_common/types/order";

export function useCreateOrder({ onSuccess }: { onSuccess?: () => void }) {
  return usePostData<CreateDashboardOrder>({
    queryKeysToInvalidate: [["orders"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_ORDER,
    callBackOnSuccess: onSuccess,
  });
}
