import { useCartStore } from "@/store/cart/useCartStore";
import React from "react";

const Totals = () => {
  const { total, discount, subtotal } = useCartStore();
  return (
    <div className="p-4 bg-white shadow-[0_0_4px_0_rgba(0,0,0,.1)] rounded mt-4">
      <div className="text-lg font-semibold text-gray-800">Bill Summary</div>
      <div className="mt-2 text-gray-700">
        <p className="flex justify-between">
          Subtotal:
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          Discount:
          <span className="font-semibold">-${discount.toFixed(2)}</span>
        </p>
        <p className="mt-2 text-green text-lg flex justify-between">
          Total: <span className="font-bold">${total.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default Totals;
