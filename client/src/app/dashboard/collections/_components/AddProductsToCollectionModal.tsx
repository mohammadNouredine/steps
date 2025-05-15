import React from "react";
import CenteredModal from "../../../_components/popups/CenteredModal";
import { DashboardCollection } from "../../_common/types/collection";
import { useAddProductsToCollection } from "../../api-hookts/product/useChangeCollectionProducts";

import SelectField from "@/components/fields/form/SelectField";
import { Form, Formik } from "formik";
import { useGetAllProductsDashboard } from "../../api-hookts/product/useGetAllProducts";

function AddProductsToCollectionModal({
  isOpen,
  setIsOpen,
  editingCollection,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingCollection: DashboardCollection | undefined;
}) {
  const { mutate: addProductsToCollection } = useAddProductsToCollection({
    collectionId: editingCollection?.id || -1,
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  const { data: productsResp } = useGetAllProductsDashboard({});
  const products = productsResp?.products;
  return (
    <CenteredModal
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      title="Add Products to Collection"
    >
      <Formik
        initialValues={{
          productIds:
            products
              ?.filter((product) => {
                return !!editingCollection?.products?.find(
                  (collectionProduct) => collectionProduct.id === product.id
                );
              })
              .map((product) => product.id) || [],
        }}
        onSubmit={(values) => {
          addProductsToCollection(values);
        }}
      >
        <Form>
          <div>
            <SelectField
              name="productIds"
              multiSelect
              searchable
              label="Products"
              data={
                products?.map((product) => {
                  return { value: product.id, label: product.name };
                }) || []
              }
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full"
          >
            Add
          </button>
        </Form>
      </Formik>
    </CenteredModal>
  );
}

export default AddProductsToCollectionModal;
