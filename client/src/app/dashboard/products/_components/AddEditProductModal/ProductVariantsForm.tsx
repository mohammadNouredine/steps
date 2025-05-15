import { ProductVariant } from "@/app/dashboard/_common/types/product";
import { DashboardVariantOption } from "@/app/dashboard/_common/types/variants";
import { useGetAllVariants } from "@/app/dashboard/api-hookts/variant/useGetAllVariants";
import NumberField from "@/components/fields/form/NumberField";
import SelectField from "@/components/fields/form/SelectField";
import ToggleField from "@/components/fields/form/Toggle";
import { FieldArray, useFormikContext } from "formik";
import React, { useEffect } from "react";

function ProductVariantsForm({ isEditing }: { isEditing: boolean }) {
  const { values, setFieldValue } = useFormikContext<{
    variantsIds: number[];
    productVariants: ProductVariant[];
  }>();
  const variantIds = values.variantsIds;
  const [disableVariants, setDisableVariants] = React.useState(isEditing);
  const { data: variants } = useGetAllVariants();

  const selectedVariants = variants?.filter((variant) =>
    variantIds?.includes(variant.id)
  );
  const variantOptionsLists =
    selectedVariants?.map((variant) => variant.variantOptions) || [];

  const combinations = generateCombinations(variantOptionsLists);

  useEffect(() => {
    if (!disableVariants) {
      setFieldValue(
        "productVariants",
        combinations?.map((options) => {
          return {
            variantOptionIds: options.map((option) => option.id),
            options: options,
            price: 0,
            cost: 0,
            discount: 0,
            weight: 0,
            outOfStock: false,
            isVisible: true,
          };
        })
      );
    }
  }, [variantIds]);
  console.log(values.productVariants);
  return (
    <div className="border border-gray-300 p-5 rounded-xl my-4">
      <div className="flex gap-x-4">
        <div className="flex-grow">
          <SelectField
            multiSelect
            searchable
            disabled={disableVariants}
            name="variantsIds"
            label="Variants"
            data={
              variants?.map((variant) => {
                return { value: variant.id, label: variant.name };
              }) || []
            }
          />
        </div>
        {disableVariants && (
          <button
            type="button"
            onClick={() => {
              console.log(values.productVariants);
              console.log("_______________");
              setDisableVariants(false);
            }}
            className="border border-red-500 mt-7 px-2 py-2 rounded-lg text-red-500"
          >
            Change Variants
          </button>
        )}
      </div>
      {values.productVariants && values.productVariants?.length > 0 && (
        <div className="grid grid-cols-12 gap-x-4 mt-4 ">
          <div className="col-span-2 flex items-start gap-x-2">
            <p className="!mt-0">Combination</p>
          </div>
          <p className="!mt-0 col-span-2">Price</p>
          <p className="!mt-0 col-span-2">Cost</p>
          <p className="!mt-0 col-span-2">Weight</p>
          <p className="!mt-0 col-span-2">Discount</p>
          <div className="grid grid-cols-2  col-span-2 ">
            <p className="!mt-0">Out Of Stock</p>
            <p className="!mt-0">Is Visible</p>
          </div>
        </div>
      )}
      <FieldArray
        name="productVariants"
        render={() => {
          return (
            <div>
              {values.productVariants?.map((productVariant, index) => {
                return (
                  <div key={index} className="grid grid-cols-6 gap-x-4 mt-4">
                    <div className="col-span-1 flex items-center">
                      <p className="text-start">
                        {productVariant.options
                          ?.map((option) => option.name)
                          .join(", ")}
                      </p>
                    </div>
                    <NumberField
                      value={productVariant.price}
                      name={`productVariants.${index}.price`}
                    />
                    <NumberField
                      value={productVariant.cost}
                      name={`productVariants.${index}.cost`}
                    />
                    <NumberField
                      value={productVariant.weight}
                      name={`productVariants.${index}.weight`}
                    />
                    <NumberField
                      value={productVariant.discount}
                      name={`productVariants.${index}.discount`}
                    />
                    <div className="grid grid-cols-2 ">
                      <ToggleField
                        name={`productVariants.${index}.outOfStock`}
                      />
                      <ToggleField
                        name={`productVariants.${index}.isVisible`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }}
      />
      {/* */}
    </div>
  );
}

export default ProductVariantsForm;

// Helper function to generate all combinations of variant options
const generateCombinations = (
  variantOptionsList: DashboardVariantOption[][],
  index = 0,
  currentCombination = [] as DashboardVariantOption[],
  allCombinations = [] as DashboardVariantOption[][]
) => {
  if (index === variantOptionsList.length) {
    allCombinations.push([...currentCombination]);
    return;
  }

  const currentOptions = variantOptionsList[index];
  currentOptions.forEach((option) => {
    generateCombinations(
      variantOptionsList,
      index + 1,
      [...currentCombination, option],
      allCombinations
    );
  });

  return allCombinations;
};
