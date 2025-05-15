import SearchInput from "@/components/fields/form/SearchInput";
import React, { useEffect } from "react";
import Filter from "./Filter";
import AllProducts from "./AllProducts";
import useDebounce from "@/hooks/useDebounce";
import { useQueryStrings } from "@/hooks/useQueryStrings";
import ReviewModal from "./ReviewModal";
import Sorting from "./Sorting";

function ShopComponent() {
  const [search, setSearch] = React.useState("");
  const debouncedQuery = useDebounce(search, 500);
  const { appendQueries } = useQueryStrings();

  useEffect(() => {
    // Always call appendQueries whenever debouncedQuery changes
    appendQueries({ search: debouncedQuery });
  }, [debouncedQuery, appendQueries]);

  return (
    <div>
      <div className="flex gap-x-2 items-center">
        <div className="flex-grow">
          <SearchInput value={search} setValue={setSearch} />
        </div>

        <Filter />
      </div>

      <Sorting />
      <AllProducts />
      <ReviewModal />
    </div>
  );
}

export default ShopComponent;
