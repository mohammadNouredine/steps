import { usePostData } from "@/api/api-service/usePostData";
import { apiEndpoints } from "@/api/apiEndpoints";
import { setAccessToken, setRefreshToken } from "@/utils/auth-storage";

const useLogin = ({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: (data: ResponseData) => void;
}) => {
  console.log("TRYING TO LOGIN...");
  return usePostData<LoginUserData, ResponseData>({
    queryKeysToInvalidate: [["auth"]],

    endpoint: apiEndpoints.login,
    callBackOnSuccess: (data: ResponseData) => {
      callBackOnSuccess && callBackOnSuccess(data);
      if (data.accessToken) {
        setAccessToken(data.accessToken);
      }
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }
    },
  });
};

export { useLogin };

type LoginUserData = {
  username: string;
  password: string;
};

// Define the type for permissions in each category

type ResponseData = {
  accessToken?: string;
  refreshToken?: string;
};
