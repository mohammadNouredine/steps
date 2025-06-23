import { useUpdateData } from "@/api/api-service/useUpdateData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { UpdateUserPermissionsDto } from "@/backend/users/types/user.types";

export function useUpdateUserPermissions({
  userId,
  callBackOnSuccess,
}: {
  userId: number;
  callBackOnSuccess?: () => void;
}) {
  return useUpdateData<UpdateUserPermissionsDto>({
    queryKeysToInvalidate: [["users"]],
    endpoint: DASHBOARD_ENDPOINTS.EDIT_USER_PERMISSIONS(userId),
    callBackOnSuccess,
  });
}
