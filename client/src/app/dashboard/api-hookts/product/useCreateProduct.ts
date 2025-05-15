import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { CreateDashboardProduct } from "../../_common/types/product";

export function useCreateProduct({ onSuccess }: { onSuccess?: () => void }) {
  return usePostData<CreateDashboardProduct>({
    queryKeysToInvalidate: [["products"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_PRODUCT,
    callBackOnSuccess: onSuccess,
  });
}
