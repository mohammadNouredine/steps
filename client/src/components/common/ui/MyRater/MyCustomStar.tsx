import { cn } from "@/utils/cn";
import { FaStar } from "react-icons/fa";

const MyCustomStar = ({
  starSize,
  isActive,
  isActiveHalf,
  isDisabled,
}: {
  starSize?: number;
  isActive: boolean;
  isActiveHalf: boolean;
  isDisabled: boolean;
}) => {
  return (
    <div
      className={cn(
        isActiveHalf ? "" : "",
        isDisabled ? " cursor-not-allowed opacity-90" : `cursor-pointer `,
        isActive ? " text-yellow-400 " : "text-gray-200"
      )}
    >
      <FaStar size={starSize ? starSize : 30} />
    </div>
  );
};

export default MyCustomStar;
