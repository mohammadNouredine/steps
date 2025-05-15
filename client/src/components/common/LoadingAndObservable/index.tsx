import React, { forwardRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const LoadingAndObservable = forwardRef<
  HTMLDivElement,
  {
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    noMoreText?: string;
    loadMoreText?: string;
  }
>(
  (
    {
      isFetchingNextPage,
      hasNextPage,
      noMoreText = "No more data...",
      loadMoreText = "Scroll to load more",
    },
    ref
  ) => {
    return (
      <div className="w-full flex items-center justify-center my-10">
        <div ref={ref} className="h-1 flex items-center">
          {hasNextPage ? (
            isFetchingNextPage ? (
              <>
                <MoonLoader
                  color={"#A2A2A2"}
                  loading={true}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </>
            ) : (
              loadMoreText
            )
          ) : (
            <p className="text-gray-400">{noMoreText}</p>
          )}
        </div>
      </div>
    );
  }
);
LoadingAndObservable.displayName = "LoadingAndObservable";
export default LoadingAndObservable;
