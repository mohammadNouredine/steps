import { useInfiniteReadData } from "@/api/api-service/useReadDataInfinite";
import { GetNoteSchemaType } from "@/app/api/note/_dto/gets-note.dto";
import { DASHBOARD_ENDPOINTS } from "../dashboard-endpoints";
import { DashboardNote } from "../../_common/types/Notes";

export function useGetNotesInfinite({
  params,
}: {
  params?: GetNoteSchemaType;
}) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  } = useInfiniteReadData<CustomNotesResponse>({
    queryKey: ["notes", params],
    endpoint: DASHBOARD_ENDPOINTS.GET_ALL_NOTES,
    getNextPageParam: (lastPage) => lastPage.lastId,
    keepPreviousData: false,
    initialPageParam: 0,
    params,
  });
  const notes = data?.pages.flatMap((page) => page.data) ?? [];
  const totalNotes =
    data?.pages
      .flatMap((page) => page.total)
      .reduce((acc, curr) => acc + curr, 0) ?? 0;
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    notes,
    totalNotes,
    isLoading,
    loadMore,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  };
}

interface CustomNotesResponse {
  data: DashboardNote[];
  total: number;
  lastId: number | null;
}
