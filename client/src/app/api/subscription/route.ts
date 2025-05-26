import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";

import { getSubscriptions } from "./_service/getSubscriptions.service";
import { addSubscription } from "./_service/addSubscription.service";
import {
  addSubscriptionSchema,
  editSubscriptionSchema,
} from "./_dto/mutate-subscription.dto";
import { editSubscription } from "./_service/editSubscription.service";
import { getSubscriptionsSchema } from "./_dto/get-subscriptions.dto";

export const GET = withErrorHandling(
  withQueryValidation(getSubscriptions, getSubscriptionsSchema)
);

export const POST = withErrorHandling(
  withBodyValidation(addSubscription, addSubscriptionSchema)
);

export const PATCH = withErrorHandling(
  withBodyValidation(editSubscription, editSubscriptionSchema)
);
