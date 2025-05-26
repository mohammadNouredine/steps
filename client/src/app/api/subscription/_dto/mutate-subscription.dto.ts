import * as yup from "yup";
import { SubscriptionStatus } from "@prisma/client";

export const addSubscriptionSchema = yup.object({
  kidId: yup.number().required(),
  planId: yup.number().required(),
  startDate: yup.date().optional(),
  amountPaid: yup.number().min(0).optional(),
  discountPercentage: yup.number().min(0).max(100).optional(),
});

export type AddSubscriptionSchemaType = yup.InferType<
  typeof addSubscriptionSchema
>;

export const editSubscriptionSchema = yup
  .object({
    id: yup.number().required(),
    planId: yup.number().optional(),
    startDate: yup.date().optional(),
    amountPaid: yup.number().min(0).optional(),
    discountPercentage: yup.number().min(0).max(100).optional(),
    status: yup
      .mixed<SubscriptionStatus>()
      .oneOf(Object.values(SubscriptionStatus))
      .optional(),
  })
  .required();

export type EditSubscriptionSchemaType = yup.InferType<
  typeof editSubscriptionSchema
>;
