import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";

function Basket({
  size,
  stroke,
  number = 0,
  isPulsing = false,
}: {
  size: number;
  stroke: string;
  number?: number;
  isPulsing?: boolean;
}) {
  return (
    <Link href="/cart" className="relative">
      <svg
        style={{
          width: size,
          height: size,
        }}
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 8H17.1597C18.1999 8 19.0664 8.79732 19.1528 9.83391L19.8195 17.8339C19.9167 18.9999 18.9965 20 17.8264 20H6.1736C5.00352 20 4.08334 18.9999 4.18051 17.8339L4.84718 9.83391C4.93356 8.79732 5.80009 8 6.84027 8H8M16 8H8M16 8L16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7L8 8M16 8L16 12M8 8L8 12"
          style={{
            stroke: stroke,
          }}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {number > 0 && (
        <div
          className={cn(
            "absolute top-0 right-0 -translate-y-1/2 z-10 translate-x-1/2 bg-primary rounded-full size-5 flex items-center justify-center"
          )}
        >
          <div
            className={cn(
              "absolute top-0.5 right-0.5 -z-10  bg-primary rounded-full size-3.5 flex items-center justify-center",
              isPulsing && "animate-ping"
            )}
          ></div>

          <p className="text-white text-xs"> {number}</p>
        </div>
      )}
    </Link>
  );
}

export default Basket;
