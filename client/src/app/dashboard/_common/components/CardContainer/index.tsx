import { cn } from "@/utils/cn";
import React from "react";

function CardContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-4 py-4 bg-white rounded-lg border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}

export default CardContainer;
