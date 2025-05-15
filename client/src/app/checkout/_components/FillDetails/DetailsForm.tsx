import React from "react";
import InputField from "@/components/fields/form/InputField";
import { Form, Formik } from "formik";
import PhoneWithCode from "@/components/fields/form/PhoneWithCode";
import { useCheckoutStore } from "@/store/cart/useCheckoutStore";
import { useCartStore } from "@/store/cart/useCartStore";
import * as Yup from "yup";
import RadioGroupField from "@/components/fields/form/RadioGroup";
import Button from "@/components/common/ui/Button";
function DetailsForm({
  setStep,
}: {
  setStep: (step: "details" | "confirmation") => void;
}) {
  const { total, totalWeight, discount, subtotal } = useCartStore();
  const { formDetails, setFormDetails } = useCheckoutStore();

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={formDetails}
        onSubmit={(values) => {
          setFormDetails({
            fullName: values.fullName,
            phoneCode: values.phoneCode,
            phoneNumber: values.phoneNumber,
            hasDelivery: values.hasDelivery,
            deliveryAddress: values?.deliveryAddress,
            hasDiscount: values.hasDiscount,
            notes: values.notes,
          });
          setStep("confirmation");
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <div className="pb-14">
                <div className="mt-4">
                  <InputField
                    label="الأسم الكامل"
                    name="fullName"
                    placeholder="الأسم الكامل"
                    maxChars={100}
                  />
                </div>
                <div className="mt-4">
                  <PhoneWithCode
                    codeName="phoneCode"
                    phoneName="phoneNumber"
                    phonePlaceholder="+961 7654321"
                    label="رقم الهاتف"
                  />
                </div>
                <div className="mt-4">
                  <RadioGroupField
                    parseBoolean
                    description="كيف تريد الحصول على المنتج؟"
                    name="hasDelivery"
                    data={[
                      { label: "الدلفري", value: "true" },
                      { label: "في المتجر", value: "false" },
                    ]}
                  />
                </div>

                {values.hasDelivery ? (
                  <div className="mt-4">
                    <InputField
                      label="موقع الاستلام"
                      name="deliveryAddress"
                      placeholder="المنطقة، القرية، و الشّارع."
                      maxChars={100}
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-gray-400 text-base">
                      أريد الحصول على المنتج من المتجر في عربصاليم.
                    </h3>
                  </div>
                )}

                <div className="mt-4">
                  <InputField
                    label="ملاحظات"
                    name="notes"
                    placeholder="ما هي ملاحظاتك؟"
                    maxChars={100}
                  />
                </div>
              </div>
              <div className="fixed bottom-0 left-0 right-0 z-10  bg-white shadow-[0_0_4px_0_rgba(0,0,0,.1)] py-3 px-4   font-medium text-lg">
                <div className=" mb-2 pb-2">
                  <div className="flex justify-between  ">
                    <p className="text-gray-400 font-semibold text-sm">
                      Total Weight
                    </p>
                    <p className="text-gray-400 font-semibold text-sm mt-0">
                      <span className="">{totalWeight.toFixed(2)} kg</span>
                    </p>
                  </div>

                  <div className="flex justify-between  ">
                    <p className="text-gray-500 font-semibold text-md">Total</p>
                    <p className="text-gray-600 font-semibold text-md mt-0">
                      {discount > 0 && (
                        <span className="text-gray-500 line-through text-sm mx-2">
                          $ {subtotal.toFixed(2)}
                        </span>
                      )}
                      <span className="">${total.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
                <Button buttonType="submit" text="View Invoice" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default DetailsForm;

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  phoneCode: Yup.string().required("Phone Code is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  hasDelivery: Yup.boolean().optional(),
  //if delivery is true, address is required
  deliveryAddress: Yup.string().when("hasDelivery", ([hasDelivery]) => {
    return hasDelivery
      ? Yup.string().required("please enter your address")
      : Yup.string().nullable().optional();
  }),
  hasDiscount: Yup.boolean().optional(),
  notes: Yup.string().optional(),
});
