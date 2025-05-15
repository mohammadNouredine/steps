import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface Queries {
  [key: string]: boolean | string | number | string[];
}

export function useQueryStrings() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function appendQueries(queries: Queries) {
    //parse to the URLSearchParams
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    // Loop over queries and add or remove the key,value to the updated search params
    for (const [key, value] of Object.entries(queries)) {
      if (value === "" || value === null || value === undefined) {
        updatedSearchParams.delete(key);
      } else {
        updatedSearchParams.set(key, value.toString());
      }
    }

    // router.replace(`${pathname}?${updatedSearchParams}`);
    router.replace(`${pathname}?${updatedSearchParams}`, {
      scroll: false,
    });
  }

  const resetAllQueries = () => {
    router.replace(pathname, { scroll: false });
  };

  const prevQueries = Object.fromEntries(searchParams.entries());

  return {
    router,
    prevQueries,
    appendQueries,
    resetAllQueries,
  };
}
