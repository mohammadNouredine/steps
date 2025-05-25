import { cn } from "@/utils/cn";
import React from "react";
import { IconType } from "react-icons";

type StyleType = "yellow" | "green" | "red" | "gray" | "lightGray";

interface IconButtonProps {
  Icon: IconType;
  style: StyleType;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const styleClasses: Record<StyleType, string> = {
  yellow:
    "bg-brandYellowL/20 hover:bg-brandYellow text-brandYellow hover:text-white",
  green:
    "bg-brandGreenL/20 hover:bg-brandGreen text-brandGreen hover:text-white",
  red: "bg-brandRedL/20 hover:bg-brandRed text-brandRed hover:text-white",
  gray: "bg-gray-200 hover:bg-gray-600 text-gray-700 hover:text-white",
  lightGray: "bg-gray-100 hover:bg-gray-500 text-gray-300 hover:text-white",
};

function IconButton({
  Icon,
  style,
  onClick,
  disabled = false,
}: IconButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        styleClasses[style],
        "px-2 rounded-md transition-all disabled:opacity-50"
      )}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
}

export default IconButton;
