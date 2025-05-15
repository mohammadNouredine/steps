import React from "react";
import CenteredModal from "../../../../_components/popups/CenteredModal";
import { Form, Formik } from "formik";
import InputField from "@/components/fields/form/InputField";
import * as Yup from "yup";
import { useCreateOrder } from "../../../api-hookts/order/useCreateOrder";
import { useEditOrder } from "../../../api-hookts/order/useEditOrder";
import {
  DashboardOrder,
  OrderStatus,
  PaymentMethod,
} from "../../../_common/types/order";
import ToggleField from "@/components/fields/form/Toggle";
import SelectField from "@/components/fields/form/SelectField";
import NumberField from "@/components/fields/form/NumberField";
import DateField from "@/components/fields/form/DateField";
import OrderItemsFieldArray from "./OrderItemsFieldArray";
function AddEditOrderModal({
  isOpen,
  setIsOpen,
  editingOrder,
  setEditingOrder,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingOrder?: DashboardOrder;
  setEditingOrder: React.Dispatch<
    React.SetStateAction<DashboardOrder | undefined>
  >;
}) {
  const { mutate: createOrder } = useCreateOrder({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  const { mutate: editOrder } = useEditOrder({
    onSuccess: () => {
      setIsOpen(false);
    },
    id: editingOrder?.id || -1,
  });
  const isEditing = !!editingOrder?.id;
  return (
    <CenteredModal
      title={isEditing ? "Edit Order" : "Create Order"}
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      onClose={() => {
        setEditingOrder(undefined);
      }}
      maxWidth="max-w-4xl"
    >
      <Formik
        validationSchema={Yup.object({
          customer_name: Yup.string().required("Name is required"),
          customer_phone: Yup.string().required("Phone is required"),
        })}
        initialValues={{
          customer_name: editingOrder?.customer_name || "",
          customer_address: editingOrder?.customer_address || "",
          customer_phone: editingOrder?.customer_phone || "",
          is_delivery: editingOrder?.is_delivery || false,
          has_discount: editingOrder?.has_discount || false,
          was_printed: editingOrder?.was_printed || false,
          notes: editingOrder?.notes || "",

          orderItems: editingOrder?.orderItems.map((item) => {
            let id;
            if (item.productVariant) {
              id = item.productVariant.id;
            } else {
              id = item.product.id;
            }
            return {
              quantity: item.quantity,
              id: id,
            };
          }),
          order_status: editingOrder?.order_status || OrderStatus.PENDING,
          total: editingOrder?.total || 0,
          discount_amount: editingOrder?.discount_amount || 0,
          delivery_pickup_time: editingOrder?.delivery_pickup_time || null,
          delivery_deploy_time: editingOrder?.delivery_deploy_time || null,
          payment_method:
            editingOrder?.payment_method || PaymentMethod.CASH_ON_DELIVERY,
          //------------------HELPER VALUES
          helperOrderItems:
            editingOrder?.orderItems.map((item) => {
              return {
                ...item,
                productId: item.product.id,
                productVariantId: item.productVariant?.id || null,
                quantity: item.quantity,
                price: item.price,
                discount: item.discount,
              };
            }) || [],
        }}
        onSubmit={(values) => {
          const newValues = {
            ...values,
            helperOrderItems: undefined,
            orderItems: values.helperOrderItems.map((item) => {
              if (item.productVariantId) {
                return {
                  type: "product_variant",
                  productVariantId: item.productVariantId,
                  productId: item.productId,
                  quantity: Number(item.quantity),
                };
              } else {
                return {
                  type: "product",
                  productId: item.productId,
                  quantity: Number(item.quantity),
                };
              }
            }),
          };
          if (isEditing) {
            editOrder(newValues);
          } else {
            createOrder(newValues);
          }
        }}
      >
        <Form>
          <div className="grid grid-cols-2 gap-x-4">
            <InputField name="customer_name" label="Name" />
            <InputField name="customer_address" label="Address" />
            <InputField name="customer_phone" label="Phone" />
            <InputField name="notes" label="Notes" />
            <div className="flex gap-x-4 col-span-2">
              <DateField name="delivery_pickup_time" label="Pickup Time" />
              <DateField name="delivery_deploy_time" label="Deploy Time" />
              <ToggleField name="is_delivery" title="Is Delivery" flexReverse />
              <ToggleField
                name="has_discount"
                title="Has Discount"
                flexReverse
              />
              <ToggleField name="was_printed" title="Was Printed" flexReverse />
            </div>
            <SelectField
              name="order_status"
              label="Status"
              data={Object.values(OrderStatus).map((status) => ({
                label: status,
                value: status,
              }))}
            />

            <SelectField
              name="payment_method"
              label="Payment Method"
              data={Object.values(PaymentMethod).map((method) => ({
                label: method,
                value: method,
              }))}
            />
            <NumberField
              name="discount_amount"
              label="Discount Amount"
              minValue={0}
            />
            <div className="col-span-2">
              <OrderItemsFieldArray />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full"
          >
            {isEditing ? "Update" : "Create"}
          </button>
        </Form>
      </Formik>
    </CenteredModal>
  );
}

export default AddEditOrderModal;
