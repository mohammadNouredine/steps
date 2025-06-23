import { usePostData } from "@/api/api-service/usePostData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { CreateUserDto } from "@/backend/users/types/user.types";

export function useAddUser({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return usePostData<CreateUserDto>({
    queryKeysToInvalidate: [["users"]],
    endpoint: DASHBOARD_ENDPOINTS.CREATE_USER,
    callBackOnSuccess,
  });
}
