import { cn } from "@/utils/cn";
import React from "react";

function Divider({ height, bgColor }: { height?: string; bgColor?: string }) {
  return (
    <div
      className={cn(
        "w-full h-px  my-4",
        bgColor ? bgColor : "bg-gray-300",
        height ? height : "h-px"
      )}
    />
  );
}

export default Divider;
