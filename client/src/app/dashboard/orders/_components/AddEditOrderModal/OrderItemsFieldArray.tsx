import { OrderItem } from "@/app/dashboard/_common/types/order";
import { useGetAllProductsDashboard } from "@/app/dashboard/api-hookts/product/useGetAllProducts";
import InputField from "@/components/fields/form/InputField";
import SelectField from "@/components/fields/form/SelectField";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import { BiTrash } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

type HelperOrderItem = OrderItem & {
  productId: number;
  productVariantId: number;
};
function OrderItemsFieldArray() {
  const { values, setFieldValue } = useFormikContext<{
    helperOrderItems: HelperOrderItem[];
    has_discount: boolean;
    discount_amount: number;
  }>();
  const { data: productsResp, isPending: isLoadingProducts } =
    useGetAllProductsDashboard();
  const products = productsResp?.products;

  const productOptions = products?.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  const orderSubtotal = values.helperOrderItems?.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  const orderDiscount =
    values.helperOrderItems?.reduce((acc, item) => {
      return acc + item.discount * item.quantity;
    }, 0) + Number(values.has_discount ? values.discount_amount : 0);

  const orderTotal = orderSubtotal - orderDiscount;

  return (
    <div className="pt-4 border-t border-gray-200 mt-4">
      <div className="grid grid-cols-12 gap-x-4 w-full justify-items-start ">
        <div className="col-span-3">Product</div>
        <div className="col-span-3">Product Variant</div>
        <div className="col-span-3">Quantity</div>
      </div>
      <FieldArray
        name="helperOrderItems"
        render={(arrayHelpers) => {
          return (
            <div>
              {values.helperOrderItems?.map((_, index) => {
                const selectedProduct = products?.find(
                  (product) =>
                    product?.id === values?.helperOrderItems[index]?.productId
                );

                const productVariants = selectedProduct?.productVariants;
                const flattenedProductVarians = productVariants?.map((pr) => {
                  const options = pr.options.map((option) => {
                    return option.name;
                  });
                  const optionsName = options.join(" - ");
                  return {
                    label: optionsName,
                    value: pr.id,
                  };
                });
                // const selectedProductVariant =
                //   selectedProduct?.productVariants?.find(
                //     (productVariant) =>
                //       productVariant.id ===
                //       values?.helperOrderItems[index]?.productVariantId
                //   );
                // const singlePrice = selectedProductVariant
                //   ? selectedProductVariant?.price
                //   : selectedProduct?.base_price || 0;

                const hasDiscount = selectedProduct?.activeDiscount ?? false;

                // const discountAmount = hasDiscount
                //   ? selectedProductVariant
                //     ? selectedProductVariant?.discount *
                //         values.helperOrderItems[index].quantity || 0
                //     : (selectedProduct?.base_discount || 0) *
                //         values.helperOrderItems[index].quantity || 0
                //   : 0;

                //---------------
                const qty = values.helperOrderItems[index].quantity;
                const pricePerItem = values.helperOrderItems[index].price || 0;
                const discountPerItem =
                  values.helperOrderItems[index].discount || 0;

                //totals
                const discountAmount = discountPerItem * qty;
                const subtotal = pricePerItem * qty;
                const total = subtotal - discountAmount;

                return (
                  <div key={index} className="grid grid-cols-12 gap-x-4 mt-4 ">
                    <div className="col-span-3">
                      <SelectField
                        searchable
                        isLoadingData={isLoadingProducts}
                        name={`helperOrderItems[${index}].productId`}
                        data={productOptions || []}
                        value={values.helperOrderItems[index].productId}
                        triggerOnChange={(value) => {
                          setFieldValue(
                            `helperOrderItems[${index}].productVariantId`,
                            null
                          );
                          setFieldValue(
                            `helperOrderItems[${index}].price`,
                            products?.find((product) => product?.id === value)
                              ?.base_price || 0
                          );

                          setFieldValue(
                            `helperOrderItems[${index}].discount`,
                            products?.find((product) => product?.id === value)
                              ?.base_discount || 0
                          );
                        }}
                      />
                    </div>
                    <div className="col-span-3">
                      {!flattenedProductVarians ||
                      flattenedProductVarians?.length === 0 ? (
                        <SelectField
                          disabled={true}
                          name={`helperOrderItems[${index}].productVariantId`}
                          value={null}
                          data={[]}
                        />
                      ) : (
                        <>
                          {flattenedProductVarians &&
                            flattenedProductVarians?.length > 0 && (
                              <SelectField
                                name={`helperOrderItems[${index}].productVariantId`}
                                value={
                                  values.helperOrderItems[index]
                                    .productVariantId
                                }
                                triggerOnChange={(value) => {
                                  setFieldValue(
                                    `helperOrderItems[${index}].price`,
                                    selectedProduct?.productVariants?.find(
                                      (productVariant) =>
                                        productVariant.id === value
                                    )?.price
                                  );

                                  setFieldValue(
                                    `helperOrderItems[${index}].discount`,
                                    selectedProduct?.productVariants?.find(
                                      (productVariant) =>
                                        productVariant.id === value
                                    )?.discount
                                  );
                                }}
                                data={flattenedProductVarians || []}
                              />
                            )}
                        </>
                      )}
                    </div>

                    <div className="col-span-3">
                      <InputField
                        name={`helperOrderItems[${index}].quantity`}
                        value={values.helperOrderItems[index].quantity}
                      />
                    </div>
                    <div className="col-span-3 flex  gap-x-2 justify-between">
                      <div className="flex px-4 items-center justify-center border border-primary rounded-lg  text-primary  ">
                        Price:
                        {hasDiscount && (
                          <span className="mx-1 text-gray-500 text-xs  line-through">
                            {subtotal.toFixed(2)}
                          </span>
                        )}
                        {total.toFixed(2) || 0}
                      </div>
                      <button
                        type="button"
                        className=" border border-red-500 px-4 rounded-lg text-red-500"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <BiTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="my-4 px-4 py-2 bg-gray-100 rounded-lg flex  items-center space-x-4">
                <p className="">
                  Subtotal: <span>{orderSubtotal}$</span>
                </p>
                <p className="mt-0">
                  Discount: <span>{orderDiscount}$</span>
                </p>
                <p className="mt-0">
                  Total: <span>{orderTotal}$</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  arrayHelpers.push({
                    id: uuidv4(),
                    quantity: 1,
                    productVariantId: null,
                    productVariantPrice: 0,
                    productId: null,
                  })
                }
                className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
              >
                Add Item
              </button>
            </div>
          );
        }}
      ></FieldArray>
    </div>
  );
}

export default OrderItemsFieldArray;
