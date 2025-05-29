import { useReadData } from "@/api/api-service/useReadData";
import { SummaryResponse } from "@/app/api/summary/dto/summary.dto";

export function useGetSummary() {
  return useReadData<SummaryResponse>({
    queryKey: ["summary"],
    endpoint: "/summary",
  });
}
