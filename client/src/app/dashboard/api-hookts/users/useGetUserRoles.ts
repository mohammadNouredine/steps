import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import axiosClient from "@/lib/axios-client";

interface Role {
  id: number;
  name: string;
}

interface GetUserRolesResponse {
  message: string;
  data: Role[];
}

export function useGetUserRoles() {
  return useQuery<GetUserRolesResponse>({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const response = await axiosClient.get(
        DASHBOARD_ENDPOINTS.GET_USER_ROLES
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
