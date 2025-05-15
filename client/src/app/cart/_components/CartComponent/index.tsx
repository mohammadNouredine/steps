"use client";
import React, { useEffect } from "react";
import { useCartStore } from "@/store/cart/useCartStore";
import BackBtn from "@/components/common/layout/BackBtn";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";
import Button from "@/components/common/ui/Button";

function CartComponent() {
  const { products, setUnreadItems, total, totalWeight, subtotal, discount } =
    useCartStore();
  useEffect(() => {
    setUnreadItems(0);
  }, []);
  const isEmpty = products.length === 0;
  return (
    <div className="min-h-screen pb-24 pt-4 flex flex-col">
      <BackBtn />

      {isEmpty ? <EmptyCart /> : <CartList />}
      <div className="fixed bottom-0 left-0 right-0 z-10  bg-white shadow-[0_0_4px_0_rgba(0,0,0,.1)] py-3 px-4   font-medium text-lg">
        <div className=" mb-2 pb-2">
          <div className="flex justify-between  ">
            <p className="text-gray-400 font-semibold text-sm">Total Weight</p>
            <p className="text-gray-400 font-semibold text-sm mt-0">
              <span className="">{totalWeight.toFixed(2)} kg</span>
            </p>
          </div>

          <div className="flex justify-between  ">
            <p className="text-gray-500 font-semibold text-md">Total</p>
            <p className="text-gray-600 font-semibold text-md mt-0">
              {discount > 0 && (
                <span className="text-gray-500 line-through text-sm mx-2">
                  $ {subtotal.toFixed(2)}
                </span>
              )}
              <span className="">${total.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <Button
          type="link"
          disabled={isEmpty}
          link={isEmpty ? "#" : `/checkout`}
          text="Checkout"
        />
      </div>
    </div>
  );
}

export default CartComponent;
