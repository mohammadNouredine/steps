import { usePostData } from "@/api/api-service/usePostData";
import { apiEndpoints } from "@/api/apiEndpoints";

export function useCreateReview({
  callBackOnSuccess,
}: {
  callBackOnSuccess?: () => void;
}) {
  return usePostData<{
    review_amount: number;
    description?: string;
    name?: string;
    type: "website" | "products";
  }>({
    queryKeysToInvalidate: [["reviews"]],
    endpoint: apiEndpoints.createReview,
    callBackOnSuccess,
  });
}
