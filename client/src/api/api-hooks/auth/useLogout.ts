import { clearAccessToken, clearRefreshToken } from "@/utils/auth-storage";
import { useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const queryClient = useQueryClient(); // Access the query client

  return {
    logout: () => {
      // Remove the access token & refresh token from local storage
      clearAccessToken();
      clearRefreshToken();

      // Invalidate the "auth" query key to ensure it's no longer considered valid
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "auth",
      });
    },
  };
}
