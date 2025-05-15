import React from "react";
import SquareHorizontalItemCart from "@/components/common/products/SquareHorizontalItemCart";
import { useCartStore } from "@/store/cart/useCartStore";

function CartList() {
  const { products } = useCartStore();
  return (
    <div className="space-y-2 mt-5">
      {products.map((item, index) => (
        <div key={index}>
          <SquareHorizontalItemCart isEditableQuantity={true} item={item} />
        </div>
      ))}
    </div>
  );
}

export default CartList;
