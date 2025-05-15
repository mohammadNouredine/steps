import CenteredModal from "@/app/_components/popups/CenteredModal";
import { DashboardProduct } from "@/app/dashboard/_common/types/product";
import { useAddStock } from "@/app/dashboard/api-hookts/product/stock/useAddStock";
import NumberField from "@/components/fields/form/NumberField";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

function AddStockModal({
  isOpen,
  setIsOpen,
  editingProduct,
  setEditingProduct,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingProduct?: DashboardProduct;
  setEditingProduct: React.Dispatch<
    React.SetStateAction<DashboardProduct | undefined>
  >;
}) {
  const { mutate: addStock } = useAddStock({
    productId: editingProduct?.id || -1,
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const productVariants = editingProduct?.productVariants?.map((variant) => {
    return {
      id: variant.id,
      name: variant.options.map((option) => option.name).join(" - "),
      stock: variant.stock,
      stockToBeAdded: 0,
    };
  });
  const hasVariants = productVariants && productVariants?.length > 0;
  return (
    <CenteredModal
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      title="Add Stock"
      onClose={() => {
        setEditingProduct(undefined);
      }}
    >
      <Formik
        initialValues={{
          quantity: 0,
          productVariants: productVariants || [],
        }}
        onSubmit={(values) => {
          addStock({
            quantity: values.quantity,
            productVariantsQuantities:
              values.productVariants.length > 0
                ? values.productVariants.map((variant) => {
                    return {
                      productVariantId: variant.id,
                      quantity: variant.stockToBeAdded,
                    };
                  })
                : undefined,
          });
        }}
        validationSchema={Yup.object().shape({
          quantity: Yup.number().required("Required"),
        })}
      >
        {(formik) => (
          <Form>
            {!hasVariants && <NumberField name="quantity" label="Quantity" />}
            {formik.values.productVariants.map((variant, index) => (
              <div key={variant.id} className="mt-4">
                <div className="mb-2 font-medium">
                  {variant.name} (Current Stock: {variant.stock})
                </div>
                <NumberField
                  name={`productVariants.${index}.stockToBeAdded`}
                  label="Add Stock"
                />
              </div>
            ))}
            <button
              type="submit"
              className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full disabled:bg-opacity-70"
            >
              Add
            </button>
          </Form>
        )}
      </Formik>
    </CenteredModal>
  );
}

export default AddStockModal;
