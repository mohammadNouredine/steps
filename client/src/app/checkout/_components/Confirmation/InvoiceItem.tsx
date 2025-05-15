import { StoreItem } from "@/store/cart/useCartStore";
import React from "react";

function InvoiceItem({ item }: { item: StoreItem }) {
  return (
    <div className="grid grid-cols-12 gap-x-4 ">
      <div className="col-span-6">
        <p className="text-md font-semibold">{item.name}</p>
        <p className="mt-0 text-gray-500">
          {item.variantCombinations.join(" - ")}
        </p>
        <p className="mt-0 text-lg font-semibold">
          <span className="text-sm text-gray-400 line-through">
            $ {item.price.toFixed(2)}
          </span>{" "}
          <span className=" text-sm">$</span>
          {(item.price - item.discount).toFixed(2)}
        </p>
      </div>
      <div className="col-span-3">{item.quantity}</div>
      <div className="col-span-3">
        <p className="text-lg font-semibold">
          <span className=" text-sm">$</span>
          {(item.quantity * (item.price - item.discount)).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default InvoiceItem;
