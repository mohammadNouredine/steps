import { CustomerProduct } from "@/types/product";
import Image from "next/image";
import React from "react";
import AddToCartHeart from "../AddToCartHeart";
import { CustomerMedia } from "@/types/media";
import Link from "next/link";

function SquareVerticalItem({
  item,
  partialItem,
  withHeart = false,
}: {
  item?: CustomerProduct;
  partialItem?: {
    name: string;
    media: CustomerMedia[];
    base_price: number;
    base_discount?: number;
  };
  withHeart?: boolean;
}) {
  const media = item ? item.media : partialItem?.media;
  const name = item ? item.name : partialItem?.name;
  const discount = item ? item.base_discount : partialItem?.base_discount;
  const price = item ? item.base_price : partialItem?.base_price || 0;

  return (
    <div className="w-full">
      <div className="relative">
        <Link href={`/products/${item?.id}`}>
          <Image
            className="rounded-xl w-full aspect-square object-cover"
            src={media?.[0]?.url ?? ""}
            alt="Zaytoona"
            width={400}
            height={400}
          />
        </Link>
        {withHeart && item && (
          <div className="absolute bottom-2 right-2">
            <AddToCartHeart item={item} size="small" />
          </div>
        )}
      </div>
      <div className="mt-1">
        <p className=" text-neutral-600 font-medium text-sm ">{name}</p>
        <p className="text-lg text-primary font-semibold mt-0">
          <span className="mx-1">{(price - (discount || 0)).toFixed(1)}$</span>
          {discount && discount > 0 ? (
            <span className="text-gray-400 line-through text-sm">
              {price?.toFixed(2)}$
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export default SquareVerticalItem;
