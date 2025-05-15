import React from "react";
import LoadingVerticalItem from "./LoadingVerticalItem";

function LoadingContentSection({
  numberOfItems = 3,
  hasMainImage = true,
}: {
  numberOfItems?: number;
  hasMainImage?: boolean;
}) {
  return (
    <div className="space-y-4">
      {hasMainImage && (
        <div className="aspect-video w-full">
          <div className="h-full w-full bg-gray-100 rounded-md animate-pulse" />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="h-3 w-20 bg-gray-100 rounded-md animate-pulse" />
        <div className="h-4 w-32 bg-gray-100 rounded-md animate-pulse" />
      </div>
      <div className="grid grid-cols-3 gap-x-4">
        {Array(numberOfItems)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <LoadingVerticalItem />
            </div>
          ))}
      </div>
    </div>
  );
}

export default LoadingContentSection;
