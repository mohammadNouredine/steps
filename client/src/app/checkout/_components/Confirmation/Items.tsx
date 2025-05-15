import React from "react";
import InvoiceItem from "./InvoiceItem";
import { cn } from "@/utils/cn";
import { useCartStore } from "@/store/cart/useCartStore";

function Items() {
  const { products } = useCartStore();
  return (
    <div className="space-y-2 mt-5 bg-lightPurple/50 p-2 rounded-lg shadow-[0_0_4px_0_rgba(0,0,0,.1)]">
      <div className="grid grid-cols-12 gap-x-4 text-purple font-semibold">
        <div className="col-span-6">Name</div>
        <div className="col-span-3">Quantity</div>
        <div className="col-span-3">Subtotal</div>
      </div>
      {products.map((item, index) => (
        <div key={index} className={cn(index !== 0 && "border-t pt-3")}>
          <InvoiceItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default Items;
