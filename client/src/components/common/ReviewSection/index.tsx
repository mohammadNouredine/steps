"use client";
import { useCreateReview } from "@/api/api-hooks/review/useCreateReview";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import MyRater from "../ui/MyRater";
import InputField from "@/components/fields/form/InputField";
import { useCheckoutStore } from "@/store/cart/useCheckoutStore";
import * as Yup from "yup";

function ReviewSection({
  onSuccess,
  type,
}: {
  onSuccess?: () => void;
  type: "website" | "products";
}) {
  type FormValues = Yup.InferType<typeof validationSchema>;

  const formRef = React.useRef<FormikProps<FormValues>>(null);
  const { setLastReviewDate } = useCheckoutStore();

  const { mutate: createReview, isPending } = useCreateReview({
    callBackOnSuccess: () => {
      setLastReviewDate(new Date());
      onSuccess?.();
      formRef.current?.resetForm();
    },
  });
  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        review_amount: 0,
        description: "",
        name: "",
      }}
      onSubmit={(values) => {
        createReview({
          ...values,
          type: type,
        });
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="w-full flex flex-col  items-center justify-center">
            <h3 className="text-base mb-4">
              Rate your experience with Zaytoona Kids
            </h3>
            <MyRater
              rating={values.review_amount}
              starSize={40}
              onRate={(rate) => {
                setFieldValue("review_amount", rate);
              }}
            />
          </div>

          <div className="mt-4">
            <InputField name="name" label="الاسم" placeholder="Fatima" />
            <InputField
              name="description"
              label="التعليق"
              placeholder="Comment"
            />
          </div>
          <button
            disabled={values.review_amount < 1 || isPending}
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full disabled:bg-gray-500"
          >
            Submit Review
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ReviewSection;

const validationSchema = Yup.object().shape({
  review_amount: Yup.number().required("Rating is required"),
  description: Yup.string().optional(),
  name: Yup.string().optional(),
});
