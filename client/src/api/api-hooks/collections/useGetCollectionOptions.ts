import { useReadData } from "@/api/api-service/useReadData";
import { apiEndpoints } from "@/api/apiEndpoints";

export function useGetCollectionOptions() {
  return useReadData<{ id: number; name: string }[]>({
    queryKey: [["collections"]],
    endpoint: apiEndpoints.GET_ALL_COLLECTION_OPTIONS,
  });
}
