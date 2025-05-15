import React from "react";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { cn } from "@/utils/cn";

function PlusMinus() {
  const [quantity, setQuantity] = React.useState(0);
  const activeMinus = quantity > 0;

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="flex items-center gap-x-1 ">
      <button
        onClick={handleMinus}
        className={cn(
          "border rounded-lg p-2",

          activeMinus
            ? "border-gray-400 text-gray-400"
            : "border-gray-300 text-gray-300"
        )}
      >
        <FaMinus />
      </button>
      <p className="w-4 text-center">{quantity}</p>
      <button
        onClick={() => setQuantity(quantity + 1)}
        className="border  rounded-lg p-2 text-primary border-primary"
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default PlusMinus;
