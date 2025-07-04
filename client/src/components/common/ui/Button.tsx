import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

function Button({
  type = "button",
  isLoading = false,
  loadingText = "Submitting...",
  link = "#",
  disabled,
  icon,
  buttonType,
  text,
  onClick,
  className,
}: {
  type?: "button" | "link";
  isLoading?: boolean;
  loadingText?: string;
  link?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  buttonType?: "submit" | "button";
  text: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-primary rounded-lg !text-white decoration-0 w-full relative",
        className,
        disabled || isLoading ? "brightness-50 cursor-not-allowed" : ""
      )}
    >
      {type === "button" ? (
        <button
          disabled={disabled || isLoading}
          onClick={onClick}
          type={buttonType}
          className="py-2.5 size-full flex items-center justify-center gap-2"
        >
          {icon}
          {isLoading ? loadingText : text}
        </button>
      ) : (
        <Link
          href={link}
          className="py-2.5 size-full flex items-center justify-center text-white"
        >
          {isLoading ? loadingText : text}
        </Link>
      )}

      <div className="absolute left-[40%] -translate-x-full top-1/2 -translate-y-1/2 flex items-center justify-center">
        {isLoading && (
          <PulseLoader
            className="mx-2 "
            color={"#FFFFFF"}
            loading={true}
            size={10}
          />
        )}
      </div>
    </div>
  );
}

export default Button;
