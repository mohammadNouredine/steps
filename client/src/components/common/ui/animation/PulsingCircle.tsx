import { cn } from "@/utils/cn";
import React from "react";

function PulsingCircle({ size = "size-3" }: { size?: string }) {
  return (
    <div className={cn("relative rounded-full bg-primary ", size)}>
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ",
          size
        )}
      >
        <div className=" rounded-full  size-full bg-primary animate-ping" />
      </div>
    </div>
  );
}

export default PulsingCircle;
