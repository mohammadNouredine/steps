import React, { useEffect, useRef } from "react";
import FloatingButton from "./FloatingButton";
import { useQueryStrings } from "@/hooks/useQueryStrings";
import { useGetAllCustomerProducts } from "@/api/api-hooks/product/useGetAllCustomerProducts";
import { useInView } from "@/hooks/useInView";
import LoadingAndObservable from "@/components/common/LoadingAndObservable";
import { Gender, ProductSortBy } from "@/types/product";
import SquareVerticalItem from "@/components/common/products/SquareVerticalItem";
import LoadingVerticalItem from "@/components/loaders/LoadingVerticalItem";
import { Language } from "@/common/constants/languages";

function AllProducts() {
  //
  const { prevQueries } = useQueryStrings();
  //-----------READING PRODUCTS INFINITE DATA
  const {
    products,
    loadMore,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isPending,
  } = useGetAllCustomerProducts({
    params: {
      searchQuery: prevQueries.search,
      minPrice: Number(prevQueries.minPrice) || undefined,
      maxPrice: Number(prevQueries.maxPrice) || undefined,
      minAge: Number(prevQueries.minAge) || undefined,
      maxAge: Number(prevQueries.maxAge) || undefined,
      language: (prevQueries.language as Language) || undefined,
      sortBy: (prevQueries.sortBy as ProductSortBy) || undefined,
      partial: true,
      collectionIds: prevQueries?.collectionIds
        ?.split(",")
        ?.map((id) => Number(id)),
      gender: (prevQueries?.gender as Gender) || undefined,
    },
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useInView(bottomRef, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px",
  });
  useEffect(() => {
    console.log("IS INTERSECTING = ", isIntersecting);
    console.log("IS FETCHING = ", isFetching);
    if (isIntersecting && !isFetching) {
      loadMore();
    }
  }, [isIntersecting, loadMore, isFetching]);

  return (
    <div>
      <div className=" mt-5 grid grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-4">
        {products?.map((item, index) => (
          <div key={index}>
            <SquareVerticalItem item={item} withHeart />
          </div>
        ))}
        {isPending &&
          Array(12)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <LoadingVerticalItem />
              </div>
            ))}
      </div>

      <LoadingAndObservable
        ref={bottomRef}
        noMoreText="End of the list"
        loadMoreText="Scroll to load more products"
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
      <FloatingButton />
    </div>
  );
}

export default AllProducts;
