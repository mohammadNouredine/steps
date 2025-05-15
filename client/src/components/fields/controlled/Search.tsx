import { useGetAllCustomerProducts } from "@/api/api-hooks/product/useGetAllCustomerProducts";
import LoadingAndObservable from "@/components/common/LoadingAndObservable";
import SquareHorizontalItem from "@/components/common/products/SquareHorizontalItem";
import useDebounce from "@/hooks/useDebounce";
import { useInView } from "@/hooks/useInView";
import React, { useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { AutoComplete, InputGroup } from "rsuite";
import "rsuite/dist/rsuite.min.css";

export default function ProductSearch() {
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value, 500);
  // Filtered data based on user input

  const { products, loadMore, isFetching, isFetchingNextPage, hasNextPage } =
    useGetAllCustomerProducts({
      params: {
        searchQuery: debouncedValue,

        // gender: prevQueries.gender || "all",
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
    <div className="auto-complete">
      <InputGroup inside>
        <AutoComplete
          placeholder="Search Products"
          placement="bottom"
          nonce="search"
          onChange={setValue}
          data={products?.map((product) => product.name)}
          renderMenu={() => (
            <div className="max-w-[100vw] px-2 space-y-2">
              {products?.map((product, index) => (
                <SquareHorizontalItem
                  item={product}
                  key={index}
                  showHeart={false}
                  showDescription={false}
                />
              ))}
              <LoadingAndObservable
                ref={bottomRef}
                noMoreText="End of the list"
                loadMoreText="Scroll to load more products"
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
              />
            </div>
          )}
        />
        <InputGroup.Button tabIndex={-1}>
          <BiSearch className="text-xl" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}
