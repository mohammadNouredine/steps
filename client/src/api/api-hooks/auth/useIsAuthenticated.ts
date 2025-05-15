import { useReadData } from "@/api/api-service/useReadData";
import { apiEndpoints } from "@/api/apiEndpoints";

export default function useIsAuthenticated() {
  const { data, isLoading, isError, isPending, isSuccess, error, status } =
    useReadData<User>({
      queryKey: [["auth"]],
      endpoint: apiEndpoints.isAuthenticated,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    });

  return {
    isAuthenticated: !!data && isSuccess,
    user: data,
    isError,
    isPending,
    isLoading,
    isSuccess,
    hasError: !!error,
    status,
  };
}
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phone?: string;
  profileImage?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};
