import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";
import { UpdateDashboardOrder } from "../../_common/types/order";

export function useEditOrder({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<UpdateDashboardOrder>({
    queryKeysToInvalidate: [["orders"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_ORDER(id),
    callBackOnSuccess: onSuccess,
  });
}
