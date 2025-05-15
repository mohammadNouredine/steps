import React from "react";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { cn } from "@/utils/cn";
import { useFormikContext } from "formik";

function PlusMinusF({ name, min = 0 }: { name: string; min?: number }) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: any;
  }>();
  const quantity = values[name];
  const activeMinus = quantity > min;

  const handleMinus = () => {
    if (quantity > min) {
      setFieldValue(name, quantity - 1);
    }
  };
  return (
    <div className="flex items-center gap-x-1 ">
      <button
        type="button"
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
        type="button"
        onClick={() => setFieldValue(name, quantity + 1)}
        className="border  rounded-lg p-2 text-primary border-primary"
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default PlusMinusF;
