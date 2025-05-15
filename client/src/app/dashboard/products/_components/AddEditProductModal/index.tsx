import React from "react";
import CenteredModal from "../../../../_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import InputField from "@/components/fields/form/InputField";
import { DashboardProduct } from "../../../_common/types/product";
import { useEditProduct } from "../../../api-hookts/product/useEditProduct";
import { useCreateProduct } from "../../../api-hookts/product/useCreateProduct";
import NumberField from "@/components/fields/form/NumberField";
import SelectField from "@/components/fields/form/SelectField";
import ToggleField from "@/components/fields/form/Toggle";
import { useGetAllCollections } from "../../../api-hookts/collection/useGetAllCollections";
import { useGetAllTags } from "../../../api-hookts/tag/useGetAllTags";
import { useCreateTag } from "../../../api-hookts/tag/useCreateTag";
import ProductVariantsForm from "./ProductVariantsForm";
import Attributes from "./Attributes";
import {
  addProductValidationSchema,
  ProductFormValues,
} from "@/app/dashboard/_common/schema/product";
import ChooseProductMedia from "./ChooseProductMedia";
import { LANGUAGES_OPTIONS } from "@/common/constants/languages";

function AddEditProductModal({
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
  const { mutate: addProduct, isPending: isAddingProduct } = useCreateProduct({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: editProduct, isPending: isEditingProduct } = useEditProduct({
    onSuccess: () => {
      setIsOpen(false);
    },
    id: editingProduct?.id || -1,
  });
  const { data: collections } = useGetAllCollections({});
  const { data: tags } = useGetAllTags();
  const { mutate: addTag } = useCreateTag({});

  const isEditing = !!editingProduct?.id;
  return (
    <CenteredModal
      maxWidth="max-w-[80vw]"
      minHeight="min-h-[90vh]"
      title={isEditing ? "Edit Product" : "Create Product"}
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      onClose={() => {
        setEditingProduct(undefined);
      }}
    >
      <Formik<ProductFormValues>
        validationSchema={addProductValidationSchema}
        initialValues={{
          name: editingProduct?.name || "",
          description: editingProduct?.description || "",
          base_cost: editingProduct?.base_cost || 0,
          base_price: editingProduct?.base_price || 0,
          base_weight: editingProduct?.base_weight || 0,
          base_discount: editingProduct?.base_discount || 0,
          languages: editingProduct?.languages || [],
          stock: editingProduct?.stock || 0,
          activeDiscount: editingProduct?.activeDiscount || false,
          shortDescription: editingProduct?.shortDescription || "",
          gender: editingProduct?.gender || "UNISEX",
          width: editingProduct?.width || 0,
          height: editingProduct?.height || 0,
          minAge: editingProduct?.minAge || 0,
          maxAge: editingProduct?.maxAge || 20,
          isVisible: editingProduct?.isVisible || false,
          outOfStock: editingProduct?.outOfStock || false,
          isFeatured: editingProduct?.isFeatured || false,
          //--------------HELPERS
          variantsIds: editingProduct?.variants?.map((variant) => variant.id),
          //--------------
          attributes: editingProduct?.attributes || undefined,
          tagIds: editingProduct?.tags?.map((tag) => tag.id) || [],
          collectionIds:
            editingProduct?.collections?.map((collection) => collection.id) ||
            [],
          productVariants: editingProduct?.productVariants || [],
          mediaIds: editingProduct?.mediaIds || [],
          media: editingProduct?.media || [],
        }}
        onSubmit={(values) => {
          console.log(values.attributes);
          if (!isEditing) {
            const mediaAdded = {
              media: undefined,
              mediaIds: values?.media?.map((media) => media.id),
            };
            const valuesToBeCreated = {
              ...values,
              ...mediaAdded,
              variantsIds: undefined,
              attributes: values.attributes?.map((attribute) => {
                return {
                  name: attribute.name,
                  description: attribute.description,
                };
              }),
            };
            addProduct(valuesToBeCreated);
          } else {
            const valuesToBeUpdated = {
              ...values,
              media: undefined,
              stock: undefined,
              mediaIds: values?.media?.map((media) => media.id),
              variantsIds: undefined,
              attributes: values.attributes?.map((attribute) => {
                return {
                  name: attribute.name,
                  description: attribute.description,
                };
              }),
            };

            editProduct(valuesToBeUpdated);
          }
        }}
      >
        {({}) => {
          return (
            <Form className="grid grid-cols-3 gap-x-4">
              <div className="col-span-3">
                <ChooseProductMedia />
              </div>
              <InputField name="name" label="Name" />
              <InputField name="shortDescription" label="Short Description" />
              <SelectField
                name="gender"
                label="Gender"
                data={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                  { value: "UNISEX", label: "Unisex" },
                ]}
              />
              <SelectField
                name="languages"
                label="Languages"
                data={LANGUAGES_OPTIONS}
                multiSelect
              />
              <div className="col-span-3">
                <InputField
                  name="description"
                  label="Description"
                  type="textarea"
                />
              </div>
              <div className="col-span-3 grid grid-cols-4 gap-x-4">
                <NumberField name="base_cost" label="Base Cost" />
                <NumberField name="base_price" label="Base Price" />
                <NumberField name="base_weight" label="Base Weight" />
                <NumberField name="base_discount" label="Base Discount" />
              </div>

              <div className="grid grid-cols-4 gap-x-4 col-span-3">
                <NumberField name="width" label="Width" />
                <NumberField name="height" label="Height" />
                <NumberField name="minAge" label="Min Age" />
                <NumberField name="maxAge" label="Max Age" />
              </div>
              <SelectField
                onClickAdd={(searchValue) => {
                  if (searchValue.length === 0) return;
                  addTag({
                    name: searchValue,
                  });
                }}
                multiSelect
                searchable
                name="tagIds"
                label="Tags"
                data={
                  tags?.map((tag) => {
                    return { value: tag.id, label: tag.name };
                  }) || []
                }
              />

              <SelectField
                multiSelect
                searchable
                name="collectionIds"
                label="Collections"
                data={
                  collections?.map((collection) => {
                    return { value: collection.id, label: collection.name };
                  }) || []
                }
              />
              {!isEditing && <NumberField name="stock" label="Stock" />}
              <div className="col-span-3 mt-4 flex space-x-4">
                <ToggleField flexReverse name="isVisible" title="Is Visible" />
                <ToggleField
                  flexReverse
                  name="outOfStock"
                  title="Out Of Stock"
                />
                <ToggleField
                  flexReverse
                  name="isFeatured"
                  title="Is Featured"
                />
                <ToggleField
                  flexReverse
                  name="activeDiscount"
                  title="Active Discount"
                />
              </div>

              {/* ATTRIBUTES */}
              <Attributes />

              <div className="col-span-3">
                <ProductVariantsForm isEditing={isEditing} />
              </div>
              <button
                disabled={isEditing ? isEditingProduct : isAddingProduct}
                type="submit"
                className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full disabled:bg-opacity-70"
              >
                {isEditing ? "Update" : "Create"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </CenteredModal>
  );
}

export default AddEditProductModal;
