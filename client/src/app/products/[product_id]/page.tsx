"use client";
import React from "react";
import BackBtn from "../../../components/common/layout/BackBtn";
import Image from "next/image";
import { cn } from "@/utils/cn";
import Variants from "./_components/Variants";
import Attributes from "./_components/Attributes";
import { useGetSingleProduct } from "@/api/api-hooks/product/useGetSingleProduct";
import { FaShare } from "react-icons/fa6";

function SingleProduct({ params }: { params: { product_id: string } }) {
  const { data: product } = useGetSingleProduct({
    id: Number(params.product_id),
  });
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product?.name,
          text: `${product?.name}تصفح هذا المنتج الجميل `,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      console.error("Web Share API is not supported in this browser.");
    }
  };
  if (!product) return null;
  return (
    <div className="pb-5 ">
      <div className="relative">
        <Image
          src={product?.media?.[0]?.url || ""}
          alt="Zaytoona"
          width={300}
          height={300}
          className="w-full -z-10"
        />
        <div className="absolute top-4 left-4">
          <BackBtn href="/shop" />
        </div>
      </div>
      <div className="bg-white rounded-t-xl -mt-4 z-[10] relative pt-3  px-4">
        <div className="w-full flex justify-between">
          <h2 className="text-lg font-semibold">{product?.name}</h2>
          <button
            onClick={handleShare}
            className="rounded-full p-2 bg-white border border-gray-300 text-gray-500"
          >
            <FaShare />
          </button>
        </div>

        <h3 className={cn("font-medium text-lg text-primary ", "text-primary")}>
          {(product?.base_price - product.base_discount).toFixed(2)}$
          {product.activeDiscount && (
            <span className="text-gray-400 text-sm mx-2 line-through">
              {product.base_price.toFixed(2)}$
            </span>
          )}
        </h3>

        {/* <DescriptionRenderer description={product?.description} /> */}
        <p>{product?.description}</p>
        <Variants product={product} />
      </div>

      <Attributes product={product} />
    </div>
  );
}

export default SingleProduct;
