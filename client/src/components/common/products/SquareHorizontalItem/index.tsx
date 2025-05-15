import Image from "next/image";
import React from "react";
import Link from "next/link";
import AddToCartHeart from "../AddToCartHeart";
import { cn } from "@/utils/cn";
import { CustomerProduct } from "@/types/product";

function SquareHorizontalItem({
  item,
  showHeart = true,
  showDescription = true,
  imageSize,
}: {
  item: CustomerProduct;
  showHeart?: boolean;
  showDescription?: boolean;
  imageSize?: string;
}) {
  return (
    <div className="w-full flex items-center ">
      <Link href={`/products/${item.id}`}>
        {item?.media && item?.media?.length > 0 && (
          <Image
            className={cn("rounded-xl aspect-square object-cover", imageSize)}
            src={item.media[0]?.url || ""}
            alt="Zaytoona"
            width={100}
            height={100}
          />
        )}
      </Link>

      <div className="mt-1 pl-2 w-full">
        <Link href={`/products/${item.id}`}>
          <p className=" text-neutral-600 font-medium text-sm ">{item?.name}</p>
          {showDescription && (
            <p className="text-[12px] text-neutral-400 font-medium mt-0 line-clamp-2">
              {item?.shortDescription}
            </p>
          )}
        </Link>
        <div className="w-full flex justify-between">
          <p className="text-base text-neutral-700 font-medium mt-0">
            {item?.base_price}$
          </p>
        </div>
      </div>
      {showHeart && (
        <div>
          <AddToCartHeart item={item} />
        </div>
      )}
    </div>
  );
}

export default SquareHorizontalItem;
