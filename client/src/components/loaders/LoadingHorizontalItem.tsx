import React from "react";

function LoadingHorizontalItem() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center justify-start gap-x-4">
        <div className="size-[70px] bg-gray-200 rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-200 rounded-md animate-pulse" />
          <div className="w-20 h-2 bg-gray-200 rounded-md animate-pulse" />
          <div className="w-10 h-4 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
      <div className="size-10 bg-gray-200 rounded-full animate-pulse" />
    </div>
  );
}

export default LoadingHorizontalItem;
