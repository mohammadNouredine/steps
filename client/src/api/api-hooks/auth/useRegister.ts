import { usePostData } from "@/api/api-service/usePostData";
import { apiEndpoints } from "@/api/apiEndpoints";
import { setAccessToken } from "@/utils/auth-storage";

const useRegister = ({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) => {
  return usePostData<RegisterUserData, ResponseData>({
    queryKeysToInvalidate: [["auth"]],
    endpoint: apiEndpoints.register,
    callBackOnSuccess: (data) => {
      callBackOnSuccess && callBackOnSuccess();
      setAccessToken(data.accessToken);
    },
  });
};

export { useRegister };

type RegisterUserData = {
  username: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  role?: string;
};

type ResponseData = {
  accessToken: string;
  refreshToken: string;
};
