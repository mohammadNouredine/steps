"use client";
import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import ChooseVariantModal from "./ChooseVariantModal";
import { useCartStore } from "@/store/cart/useCartStore";
import { CustomerProduct } from "@/types/product";
import { cn } from "@/utils/cn";
import OutOfStockPopup from "@/app/_components/popups/OutOfStockPopup";

function AddToCartHeart({
  item,
  size = "medium",
}: {
  item: CustomerProduct;
  size?: "small" | "medium";
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenOutOfStock, setIsOpenOutOfStock] = React.useState(false);
  const { addProduct, products, removeProduct } = useCartStore();
  const isAdded = products.find((p) => p.productId === item.id);
  const isSmall = size === "small";
  return (
    <button
      onClick={() => {
        if (item?.outOfStock) {
          setIsOpenOutOfStock(true);
          return;
        }
        if (item?.variants && item.variants.length > 0) {
          setIsOpen(true);
        } else {
          if (isAdded) {
            removeProduct(item.id.toString());
          } else {
            addProduct({
              id: item.id,
              variantId: undefined,
              variantCombinations: [],
              productId: item.id,
              idWithVariant: item.id.toString(),
              name: item.name,
              weight: item.base_weight || 0,
              discount: item.activeDiscount ? item.base_discount : 0,
              price: item.base_price || 0,
              quantity: 1,
              image: item.media?.[0]?.url || "",
            });
          }
        }
      }}
      className={cn(
        " bg-white shadow-[0_0_4px_0_rgba(0,0,0,.1)] rounded-full aspect-square",
        isSmall ? "p-1 text-xl" : "p-2 text-2xl"
      )}
    >
      {isAdded ? (
        <IoMdHeart className=" text-red-500" />
      ) : (
        <IoMdHeartEmpty className=" text-neutral-300" />
      )}
      <OutOfStockPopup
        isOpen={isOpenOutOfStock}
        setIsOpen={setIsOpenOutOfStock}
      />
      <ChooseVariantModal item={item} isOpen={isOpen} setIsOpen={setIsOpen} />
    </button>
  );
}

export default AddToCartHeart;
