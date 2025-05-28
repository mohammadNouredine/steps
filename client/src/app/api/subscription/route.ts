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
import { withAuth } from "@/backend/helpers/withAuth";

export const GET = withErrorHandling(
  withAuth(withQueryValidation(getSubscriptions, getSubscriptionsSchema))
);

export const POST = withErrorHandling(
  withAuth(withBodyValidation(addSubscription, addSubscriptionSchema))
);

export const PATCH = withErrorHandling(
  withAuth(withBodyValidation(editSubscription, editSubscriptionSchema))
);
