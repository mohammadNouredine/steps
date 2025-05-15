import { useInfiniteReadData } from "@/api/api-service/useReadDataInfinite";
import { apiEndpoints } from "@/api/apiEndpoints";
import { Language } from "@/common/constants/languages";
import { CustomerProduct, Gender, ProductSortBy } from "@/types/product";

export function useGetAllCustomerProducts({
  params,
}: {
  params?: {
    minPrice?: number;
    maxPrice?: number;
    minAge?: number;
    maxAge?: number;
    gender?: Gender;
    language?: Language;
    collectionIds?: number[];
    searchQuery?: string;
    partial?: boolean;
    sortBy?: ProductSortBy;
  };
}) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  } = useInfiniteReadData<CustomerProductResponse>({
    queryKey: ["products", params],
    endpoint: apiEndpoints.GET_ALL_PRODUCTS,
    getNextPageParam: (lastPage) => lastPage.lastId,
    keepPreviousData: false,
    initialPageParam: 0,
    params,
  });
  const products = data?.pages.flatMap((page) => page.products) ?? [];
  const totalProducts =
    data?.pages
      .flatMap((page) => page.total)
      .reduce((acc, curr) => acc + curr, 0) ?? 0;
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    products,
    totalProducts,
    isLoading,
    loadMore,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  };
}

interface CustomerProductResponse {
  products: CustomerProduct[];
  total: number;
  lastId: number | null;
}
