import { useReadData } from "@/api/api-service/useReadData";
import { apiEndpoints } from "@/api/apiEndpoints";
import { CustomerContent } from "@/types/content";

export const useGetContentByPageName = ({ pageName }: { pageName: string }) => {
  return useReadData<CustomerContent>({
    queryKey: ["content"],
    endpoint: apiEndpoints.getSingleContentByPageName(pageName),
  });
};
