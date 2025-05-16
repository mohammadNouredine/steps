import { useReadData } from "@/api/api-service/useReadData";
import { apiEndpoints } from "@/api/apiEndpoints";

export default function useIsAuthenticated() {
  const { data, isLoading, isError, isPending, isSuccess, error, status } =
    useReadData<{
      user: {
        id: number;
        role: string;
        username: string;
      };
    }>({
      queryKey: [["auth"]],
      endpoint: apiEndpoints.isAuthenticated,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    });
  console.log("DATA: ", data);
  return {
    isAuthenticated: !!data && isSuccess,
    user: data?.user,
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
