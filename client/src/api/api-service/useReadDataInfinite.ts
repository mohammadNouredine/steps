import {
  useInfiniteQuery,
  InfiniteQueryObserverResult,
  QueryKey,
  InfiniteData,
  keepPreviousData,
} from "@tanstack/react-query";
import { getFromApi } from "./api-methods";

interface UseInfiniteReadDataOptions<PageParam> {
  queryKey: QueryKey;
  endpoint: string;
  getNextPageParam: (
    lastPage: any,
    allPages: any[]
  ) => PageParam | null | undefined;
  initialPageParam: PageParam;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  enabled?: boolean;
  keepPreviousData?: boolean;
  retry?: boolean | number;
  params?: Record<string, unknown>;
}

export function useInfiniteReadData<ReturnedDataType, PageParam = number>({
  queryKey,
  endpoint,
  getNextPageParam,
  initialPageParam,
  refetchOnWindowFocus = true,
  refetchOnMount = true,
  enabled = true,
  keepPreviousData: shouldKeepPreviousData = false,
  retry = 3,
  params,
}: UseInfiniteReadDataOptions<PageParam>): InfiniteQueryObserverResult<
  InfiniteData<ReturnedDataType, PageParam>,
  Error
> {
  return useInfiniteQuery<
    ReturnedDataType,
    Error,
    InfiniteData<ReturnedDataType, PageParam>,
    QueryKey,
    PageParam
  >({
    queryKey,
    queryFn: ({ pageParam }) => {
      const url =
        pageParam !== initialPageParam
          ? `${endpoint}?lastId=${pageParam}`
          : endpoint;
      return getFromApi(url, false, params);
    },
    initialPageParam,
    getNextPageParam: (lastPage, allPages) => {
      // Compute nextPageParam based on the current page
      const nextPageParam = getNextPageParam(lastPage, allPages);
      return nextPageParam === null ? undefined : nextPageParam;
    },
    refetchOnWindowFocus,
    refetchOnMount,
    enabled,
    retry,
    placeholderData: shouldKeepPreviousData ? keepPreviousData : undefined,
  });
}
