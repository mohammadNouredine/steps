import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";
import { UpdateDashboardProduct } from "../../_common/types/product";

export function useEditProduct({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<UpdateDashboardProduct>({
    queryKeysToInvalidate: [["products"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_PRODUCT(id),
    callBackOnSuccess: onSuccess,
  });
}
