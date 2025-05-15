import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { DashboardMedia } from "../../_common/types/media";
import { useInfiniteReadData } from "@/api/api-service/useReadDataInfinite";

export function useGetAllMedia(params?: { searchQuery?: string }) {
  //
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteReadData<DashboardMediaResponse>({
    queryKey: ["media", params],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_MEDIA,
    getNextPageParam: (lastPage) => lastPage.lastId,
    keepPreviousData: true,
    initialPageParam: 0,
    params,
  });
  const media = data?.pages.flatMap((page) => page.media) ?? [];
  const totalMedia = data?.pages.flatMap((page) => page.totalMedia) ?? [];
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    media,
    totalMedia,
    isLoading,
    loadMore,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  };
}
interface DashboardMediaResponse {
  media: DashboardMedia[];
  totalMedia: number;
  lastId: number | null;
}
