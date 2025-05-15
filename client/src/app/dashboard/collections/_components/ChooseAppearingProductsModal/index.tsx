import React, { useEffect, useState } from "react";
import CenteredModal from "../../../../_components/popups/CenteredModal";
import { DashboardCollection } from "../../../_common/types/collection";
import { Form, Formik } from "formik";
import { CheckPicker } from "rsuite";
import AppearingProductsForm from "./AppearingProductsForm";
import { useUpdateAppearingProducts } from "@/app/dashboard/api-hookts/collection/useUpdateAppearingProducts";

function ChooseAppearingProductsModal({
  isOpen,
  setIsOpen,
  editingCollection,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingCollection: DashboardCollection | undefined;
}) {
  const { mutate: updateAppearingProducts } = useUpdateAppearingProducts({
    id: editingCollection?.id || -1,
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const handleProductSelectionChange = (value: number[]) => {
    console.log("VALUE IS ", value);
    const selectedProducts = editingCollection?.products?.filter((product) => {
      return value.includes(product.id);
    });
    const selectedOptions = selectedProducts?.map((product) => {
      return {
        label: product.name,
        value: product.id,
      };
    });
    setSelectedProducts(selectedOptions || []);
  };

  const [selectedProducts, setSelectedProducts] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    setSelectedProducts(
      editingCollection?.appearingProducts.map((p) => ({
        label: p.name,
        value: p.id,
      })) || []
    );
  }, [editingCollection]);
  console.log("SELECTED PRODUCTS= ", selectedProducts);
  return (
    <CenteredModal
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      title="Choose Appearing Products"
    >
      <div className="mb-4 w-full">
        <CheckPicker
          value={selectedProducts.map((item) => item.value)}
          className="w-full"
          menuClassName="!z-[100]"
          onChange={handleProductSelectionChange}
          data={
            editingCollection?.products?.map((product) => {
              return {
                label: product.name,
                value: product.id,
              };
            }) || []
          }
        />
      </div>
      <Formik
        initialValues={{
          appearingProducts: selectedProducts,
        }}
        enableReinitialize
        onSubmit={(values) => {
          updateAppearingProducts({
            appearingProductsIds: values.appearingProducts.map(
              (item) => item.value
            ),
          });
        }}
      >
        <Form>
          <AppearingProductsForm selectedProducts={selectedProducts} />
          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </CenteredModal>
  );
}

export default ChooseAppearingProductsModal;
