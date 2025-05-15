"use client";
import { useGetAllCustomerProducts } from "@/api/api-hooks/product/useGetAllCustomerProducts";
import LoadingAndObservable from "@/components/common/LoadingAndObservable";
import SquareVerticalItem from "@/components/common/products/SquareVerticalItem";
import LoadingVerticalItem from "@/components/loaders/LoadingVerticalItem";
import { useInView } from "@/hooks/useInView";
import React, { useEffect, useRef } from "react";

function CollectionProducts({ collectionId }: { collectionId: number }) {
  const {
    products,
    loadMore,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isPending,
  } = useGetAllCustomerProducts({
    params: {
      //   searchQuery: prevQueries.search,
      //   minPrice: Number(prevQueries.minPrice) || undefined,
      //   maxPrice: Number(prevQueries.maxPrice) || undefined,
      //   minAge: Number(prevQueries.minAge) || undefined,
      //   maxAge: Number(prevQueries.maxAge) || undefined,
      partial: true,
      collectionIds: [collectionId],
      //   gender: (prevQueries?.gender as Gender) || undefined,
    },
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useInView(bottomRef, {
    threshold: 1,
    rootMargin: "150px",
  });
  useEffect(() => {
    if (isIntersecting && !isFetching) {
      loadMore();
    }
  }, [isIntersecting, loadMore, isFetching]);

  return (
    <div className="px-2">
      <div className="grid grid-cols-3 gap-x-2 mt-4 gap-y-2">
        {products?.map((item, index) => (
          <div key={index} className="min-w-[50%]">
            <SquareVerticalItem item={item} />
          </div>
        ))}
        {isPending &&
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <LoadingVerticalItem />
              </div>
            ))}
      </div>
      <LoadingAndObservable
        ref={bottomRef}
        noMoreText=""
        loadMoreText="Scroll to load more products"
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}

export default CollectionProducts;
