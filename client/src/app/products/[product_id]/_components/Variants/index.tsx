import { useCartStore } from "@/store/cart/useCartStore";
import { Form, Formik } from "formik";
import React from "react";
import Variant from "./Variant";
import PlusMinusF from "@/components/fields/form/PlusMinusF";
import { useRouter } from "next/navigation";
import { CustomerProduct } from "@/types/product";
import OutOfStockPopup from "@/app/_components/popups/OutOfStockPopup";
interface FormValues {
  quantity: number;
  [key: string]: number | string; // Assuming all variant values are either number or string
}
function Variants({ product }: { product: CustomerProduct }) {
  const initialVariantValues = product?.variants?.reduce((acc, variant) => {
    acc[variant.name] = variant?.variant_options?.[0].value; // Defaulting to the first option
    return acc;
  }, {} as { [key: string]: string });
  const initialValues: FormValues = {
    ...initialVariantValues,
    quantity: 1,
  };
  const { addProduct } = useCartStore();
  const [isOpenOutOfStock, setIsOpenOutOfStock] = React.useState(false);
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const { variants } = product;

          const variantCombinations = variants?.map((variant) =>
            values[variant.name].toString()
          );
          const chosenProductVariant = product?.productVariants?.find(
            (productVariant) =>
              productVariant.options.every(
                (option) => values[option.variant.name] === option.value
              )
          );
          if (chosenProductVariant?.outOfStock) {
            setIsOpenOutOfStock(true);
            return;
          }
          const idWithVariant = `${product.id}-${variantCombinations
            ?.map((variant) => variant.toString())
            .join("-")}`;
          addProduct({
            id: product.id,
            variantId: chosenProductVariant?.id,
            idWithVariant: idWithVariant,
            productId: product.id,
            name: product.name,
            weight: product.base_weight || 0,
            price: product.base_price || 0,
            discount: product.activeDiscount ? product.base_discount : 0,
            quantity: values.quantity,
            variantCombinations: variantCombinations || [],
            image: product.media?.[0]?.url || "",
          });
          router.push(`/cart`);
        }}
      >
        {({ values }) => {
          const variantCombinations = product?.variants?.map((variant) =>
            values[variant.name].toString()
          );
          const allVariantsAreSelected =
            variantCombinations?.length === product?.variants?.length;

          return (
            <Form>
              <div className="space-y-2 mt-4 mb-4 relative">
                {product?.variants?.map((variant) => {
                  return (
                    <Variant
                      key={variant.id}
                      label={variant.name}
                      name={variant.name}
                      options={variant.variant_options.map((option) => ({
                        label: option.value,
                        value: option.value,
                      }))}
                    />
                  );
                })}
              </div>
              <div className="mt-4">
                <p className="font-medium">Amount</p>
                <PlusMinusF name="quantity" min={1} />
              </div>
              <button
                disabled={!allVariantsAreSelected}
                type="submit"
                className="bg-primary text-white rounded-t-xl fixed bottom-0 left-0 px-6 py-3 font-medium w-full mt-4 disabled:opacity-50"
              >
                Add to cart
              </button>
            </Form>
          );
        }}
      </Formik>
      <OutOfStockPopup
        isOpen={isOpenOutOfStock}
        setIsOpen={setIsOpenOutOfStock}
      />
    </>
  );
}

export default Variants;
