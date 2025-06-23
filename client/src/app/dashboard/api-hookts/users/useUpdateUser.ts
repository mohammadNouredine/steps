import { useUpdateData } from "@/api/api-service/useUpdateData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { UpdateUserDto } from "@/backend/users/types/user.types";

export function useUpdateUser({
  userId,
  callBackOnSuccess,
}: {
  userId: number;
  callBackOnSuccess?: () => void;
}) {
  return useUpdateData<UpdateUserDto>({
    queryKeysToInvalidate: [["users"]],
    endpoint: DASHBOARD_ENDPOINTS.UPDATE_USER(userId),
    callBackOnSuccess,
  });
}
