import { useUpdateData } from "@/api/api-service/useUpdateData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";

export function useMarkOrdersWasPrinted({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  return useUpdateData<{
    ids: number[];
  }>({
    queryKeysToInvalidate: [["orders"]],
    showSuccessToast: false,
    endpoint: DASHBOARD_ENDPOINTS.MARK_AS_PRINTED,
    callBackOnSuccess: onSuccess,
  });
}
