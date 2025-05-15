import React from "react";
import SquareHorizontalItemCart from "@/components/common/products/SquareHorizontalItemCart";
import { useCartStore } from "@/store/cart/useCartStore";

function Items() {
  const { products } = useCartStore();
  return (
    <div className="space-y-2 mt-5">
      {products.map((item, index) => (
        <div key={index}>
          <SquareHorizontalItemCart item={item} canDelete={false} />
        </div>
      ))}
    </div>
  );
}

export default Items;
