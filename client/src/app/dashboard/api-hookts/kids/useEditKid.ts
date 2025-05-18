import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { useUpdateData } from "@/api/api-service/useUpdateData";
import { Kid } from "@prisma/client";

export function useEditKid({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: number;
}) {
  return useUpdateData<FormData>({
    queryKeysToInvalidate: [["kids"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_KID(id),
    callBackOnSuccess: onSuccess,
  });
}
