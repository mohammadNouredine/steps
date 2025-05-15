import { useCartStore } from "@/store/cart/useCartStore";
import Link from "next/link";
import React from "react";

function FloatingButton() {
  const { products } = useCartStore();
  return (
    <>
      {products.length > 0 && (
        <Link
          href={"/cart"}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full"
        >
          Submit Order
        </Link>
      )}
    </>
  );
}

export default FloatingButton;
