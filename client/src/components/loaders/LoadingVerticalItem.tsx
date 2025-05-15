import React from "react";

function LoadingVerticalItem() {
  return (
    <div className="w-full aspect-[1.4] space-y-2">
      <div className="w-full aspect-square bg-gray-200 rounded-md animate-pulse" />
      <div className="w-3/4 h-4 rounded-md bg-gray-200 animate-pulse" />
      <div className="w-2/4 h-4 rounded-md bg-gray-200 animate-pulse" />
    </div>
  );
}

export default LoadingVerticalItem;
