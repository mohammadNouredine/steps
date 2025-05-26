import * as yup from "yup";
import { SubscriptionStatus } from "@prisma/client";

export const getSubscriptionsSchema = yup.object({
  kidId: yup.number().optional(),
  status: yup
    .mixed<SubscriptionStatus>()
    .oneOf(Object.values(SubscriptionStatus))
    .optional(),
  lastId: yup.number().optional(),
});

export type GetSubscriptionsSchemaType = yup.InferType<
  typeof getSubscriptionsSchema
>;
