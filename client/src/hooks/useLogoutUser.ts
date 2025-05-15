import { clearAccessToken, clearRefreshToken } from "@/utils/auth-storage";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const logout = () => {
    clearRefreshToken();
    clearAccessToken();
    queryClient.clear();
    router.push("/auth");
  };
  return logout;
};

export { useLogoutUser };
