"use client";
import React from "react";
import Basket from "../../../../../public/icons/basket";
// import BurgerMenu from "./BurgerMenu";
import { useCartStore } from "@/store/cart/useCartStore";
import DesktopNavItems from "./DesktopNavItems";

function Header() {
  const { unreadItems } = useCartStore();
  return (
    <div className="w-full py-4 px-5 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="lg:hidden">{/* <BurgerMenu /> */}</div>
        <div className="hidden lg:block">
          <DesktopNavItems />
        </div>
        <div className="rounded-full bg-gray-100 px-2 py-2">
          <Basket
            size={30}
            stroke="#212121"
            number={unreadItems}
            isPulsing={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
