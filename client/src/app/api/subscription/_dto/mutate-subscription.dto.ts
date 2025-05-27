import * as yup from "yup";
import { SubscriptionStatus } from "@prisma/client";

export const addSubscriptionSchema = yup.object({
  kidId: yup.number().positive("Kid is required").required("Kid is required"),
  planId: yup
    .number()
    .positive("Plan is required")
    .required("Plan is required"),
  startDate: yup.date().optional(),
  amountPaid: yup.number().min(0).optional(),
  discountPercentage: yup.number().min(0).max(100).optional(),
  endDate: yup.date().optional(),
});

export type AddSubscriptionSchemaType = yup.InferType<
  typeof addSubscriptionSchema
>;

export const editSubscriptionSchema = addSubscriptionSchema.concat(
  yup.object({
    id: yup.number().required(),
    status: yup
      .mixed<SubscriptionStatus>()
      .oneOf(Object.values(SubscriptionStatus))
      .optional(),
  })
);

export type EditSubscriptionSchemaType = yup.InferType<
  typeof editSubscriptionSchema
>;
