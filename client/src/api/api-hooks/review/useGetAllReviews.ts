import { useReadData } from "@/api/api-service/useReadData";
import { apiEndpoints } from "@/api/apiEndpoints";
import { CustomerReview } from "@/types/review";

export const useGetAllReviews = () => {
  return useReadData<CustomerReview[]>({
    queryKey: ["reviews"],
    endpoint: apiEndpoints.getAllReviews,
  });
};
