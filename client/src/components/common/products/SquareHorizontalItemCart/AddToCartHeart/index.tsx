import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Modal from "../../../Modal";
import {
  dummyProduct,
  Product,
} from "../../../../../common/constants/dummyProducts";
import Variant from "@/app/products/[product_id]/_components/Variants/Variant";
import { Form, Formik } from "formik";

function AddToCartHeart({ item }: { item: Product }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <button
      onClick={() => {
        item?.variants && item.variants.length > 0
          ? setIsOpen(true)
          : setIsAdded(!isAdded);
      }}
      className="p-2 bg-white shadow-[0_0_4px_0_rgba(0,0,0,.1)] rounded-full aspect-square "
    >
      {isAdded ? (
        <IoMdHeart className="text-2xl text-red-500" />
      ) : (
        <IoMdHeartEmpty className="text-2xl text-neutral-300" />
      )}
      <Modal title="Choose Variant" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Formik
          initialValues={{
            color: "red",
            size: "small",
          }}
          onSubmit={() => {
            console.log("submit");
          }}
        >
          <Form>
            <div className="space-y-2 mt-4 mb-4 relative">
              {dummyProduct.variants.map((variant) => {
                return (
                  <Variant
                    key={variant.id}
                    label={variant.name}
                    name={variant.name}
                    options={variant.options.map(
                      (option: { name: string; id: number }) => {
                        return { label: option.name, value: option.id };
                      }
                    )}
                  />
                );
              })}
            </div>
          </Form>
        </Formik>

        <div className="px-2 absolute left-1/2  bottom-0 -translate-y-[150%] -translate-x-1/2 w-full">
          <button
            onClick={() => {
              setIsOpen(false);
              setIsAdded(true);
            }}
            className=" bg-primary text-white rounded-full px-6 py-3 font-medium w-full "
          >
            Add to cart
          </button>
        </div>
      </Modal>
    </button>
  );
}

export default AddToCartHeart;
