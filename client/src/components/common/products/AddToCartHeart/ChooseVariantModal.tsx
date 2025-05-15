import Variant from "@/app/products/[product_id]/_components/Variants/Variant";
import Modal from "@/components/common/Modal";
import { Form, Formik } from "formik";
import React from "react";
import PlusMinusF from "@/components/fields/form/PlusMinusF";
import { useCartStore } from "@/store/cart/useCartStore";
import { CustomerProduct } from "@/types/product";
import SquareHorizontalItemCart from "../SquareHorizontalItemCart";
import OutOfStockPopup from "@/app/_components/popups/OutOfStockPopup";
interface FormValues {
  quantity: number;
  [key: string]: number | string; // Assuming all variant values are either number or string
}

function ChooseVariantModal({
  item,
  isOpen,
  setIsOpen,
}: {
  item: CustomerProduct;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { addProduct, products } = useCartStore();
  const [isOpenOutOfStock, setIsOpenOutOfStock] = React.useState(false);
  // Generate initial form values based on the variants
  const initialVariantValues = item?.variants?.reduce((acc, variant) => {
    acc[variant.name] = variant?.variant_options?.[0].value; // Defaulting to the first option
    return acc;
  }, {} as { [key: string]: string });
  const initialValues: FormValues = {
    ...initialVariantValues,
    quantity: 1,
  };
  const sameInCart = products.filter((p) => p.id === item.id);
  return (
    <Modal title="Choose Variant" isOpen={isOpen} setIsOpen={setIsOpen}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const variantCombinations = item?.variants?.map((variant) =>
            values[variant.name].toString()
          );
          const chosenProductVariant = item?.productVariants?.find(
            (productVariant) =>
              productVariant.options.every(
                (option) => values[option.variant.name] === option.value
              )
          );
          if (chosenProductVariant?.outOfStock) {
            setIsOpenOutOfStock(true);
            return;
          }
          const idWithVariant = `${item.id}-${variantCombinations
            ?.map((variant) => variant.toString())
            .join("-")}`;
          if (chosenProductVariant) {
            addProduct({
              id: item.id,
              variantId: chosenProductVariant?.id,
              idWithVariant: idWithVariant,
              productId: item.id,
              name: item.name,
              price: chosenProductVariant?.price || 0,
              weight: chosenProductVariant?.weight || 0,
              discount: item.activeDiscount
                ? chosenProductVariant?.discount
                : 0,
              quantity: values.quantity,
              variantCombinations: variantCombinations || [],
              image: item.media?.[0]?.url || "",
            });
          }

          setIsOpen(false);
        }}
      >
        {({ values }) => {
          const variantCombinations = item?.variants?.map((variant) =>
            values[variant.name].toString()
          );
          const allVariantsAreSelected =
            variantCombinations?.length === item?.variants?.length;

          const chosenProductVariant = item?.productVariants?.find(
            (productVariant) =>
              productVariant.options.every(
                (option) => values[option.variant.name] === option.value
              )
          );
          return (
            <Form className="h-full flex-grow flex flex-col">
              <div className="flex-grow">
                <div className="space-y-2 mt-4 mb-4 relative">
                  {item?.variants?.map((variant) => {
                    return (
                      <Variant
                        key={variant.id}
                        label={variant.name}
                        name={variant.name}
                        options={variant?.variant_options?.map((option) => ({
                          label: option.value,
                          value: option.value,
                        }))}
                      />
                    );
                  })}
                </div>

                <div className="mt-4">
                  <p className="font-medium">Price</p>
                  {chosenProductVariant?.price}
                </div>

                <div className="mt-4">
                  <p className="font-medium">Amount</p>
                  <PlusMinusF name="quantity" />
                </div>
              </div>
              <button
                disabled={!allVariantsAreSelected}
                type="submit"
                className="bg-primary text-white rounded-full px-6 py-3 font-medium w-full mt-4 disabled:opacity-50"
              >
                Add to cart
              </button>
            </Form>
          );
        }}
      </Formik>

      {sameInCart?.length > 0 && (
        <div className="py-4 border-t border-neutral-200 mt-4">
          <p className="font-medium">Same item in cart</p>
          <div className="divide-y">
            {sameInCart?.map((item, index) => (
              <div key={index} className="py-2">
                <SquareHorizontalItemCart item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
      <OutOfStockPopup
        isOpen={isOpenOutOfStock}
        setIsOpen={setIsOpenOutOfStock}
      />
    </Modal>
  );
}

export default ChooseVariantModal;
