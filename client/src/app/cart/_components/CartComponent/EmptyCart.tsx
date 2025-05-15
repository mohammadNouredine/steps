import Link from "next/link";
import React from "react";

function EmptyCart() {
  return (
    <div className=" flex-grow flex flex-col py-20">
      <div className=" flex-col bg-primary/10 flex items-center justify-center rounded-lg h-full flex-grow">
        <h1 className="text-xl">Your cart is empty</h1>
        <p className="text-neutral-500 mt-4">
          You can add items to your cart from the shop page
        </p>
        <Link
          href="/shop"
          className="bg-primary  text-white rounded-full px-6 py-3 font-medium mt-4"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default EmptyCart;
