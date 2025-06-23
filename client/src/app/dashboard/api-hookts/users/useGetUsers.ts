import { useReadData } from "@/api/api-service/useReadData";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { User } from "@/types/user";

export function useGetUsers() {
  return useReadData<{
    data: User[];
  }>({
    queryKey: ["users"],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_USERS,
  });
}
