import { usePostData } from "@/api/api-service/usePostData";
import { apiEndpoints } from "@/api/apiEndpoints";

export const useSendContactMessage = ({
  callBackOnSuccess,
}: { callBackOnSuccess?: () => void } = {}) => {
  return usePostData({
    endpoint: apiEndpoints.sendContactMessage,
    callBackOnSuccess,
  });
};
