import Image from "next/image";
import React from "react";
import Link from "next/link";
import PlusMinus from "./PlusMinus";
import { StoreItem, useCartStore } from "@/store/cart/useCartStore";
import { IoClose } from "react-icons/io5";
import FalseTruePopup from "@/app/_components/popups/FalseTruePopup";

function SquareHorizontalItemCart({
  item,
  isEditableQuantity,
  canDelete = true,
}: {
  item: StoreItem;
  isEditableQuantity?: boolean;
  canDelete?: boolean;
}) {
  const { setQuantity, removeProduct } = useCartStore();
  const variantOptionsSelected = item.variantCombinations.join(" - ");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
  const handleSetQuantity = (quantity: number) => {
    setQuantity(item.idWithVariant, quantity);
  };
  return (
    <div className="w-full flex items-center ">
      <Link href={`/products/1234`}>
        <Image
          className="rounded-xl"
          src={item?.image}
          alt="Zaytoona"
          width={100}
          height={100}
        />
      </Link>

      <div className="mt-1 px-2 w-full">
        <Link href={`/products/1234`}>
          <p className=" text-neutral-600 font-medium text-sm ">{item?.name}</p>
          <p className="text-[12px] text-neutral-400 font-medium mt-0">
            {variantOptionsSelected}
          </p>
        </Link>
        <div className="w-full flex justify-between">
          <p className="text-base text-neutral-700 font-medium mt-0">
            {item?.discount > 0 && (
              <span className="text-gray-500 text-sm line-through">
                ${item?.price.toFixed(2)}
              </span>
            )}
            <span className="font-semibold">
              {" "}
              ${(item.price - item?.discount).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        {isEditableQuantity ? (
          <PlusMinus quantity={item.quantity} setQuantity={handleSetQuantity} />
        ) : (
          <p>{item.quantity}</p>
        )}
        {canDelete && (
          <button
            type="button"
            onClick={() => {
              setIsOpenDeleteModal(true);
            }}
          >
            <IoClose className="text-red-500" />
          </button>
        )}
        {/* {withHeart && <AddToCartHeart item={item} />} */}
      </div>
      <FalseTruePopup
        isOpenModal={isOpenDeleteModal}
        setIsOpenModal={setIsOpenDeleteModal}
        onClick={() => {
          removeProduct(item.idWithVariant);
          setIsOpenDeleteModal(false);
        }}
        title="Delete item"
        falseMessage="No, Cancel"
        truthMessage="Yes, Delete"
        messageTone="danger"
      />
    </div>
  );
}

export default SquareHorizontalItemCart;
