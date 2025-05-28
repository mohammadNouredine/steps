import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";

import { getPayments } from "./_service/getPayment.service";
import { getPaymentSchema } from "./_dto/gets-payment.dto";
import { addPayment } from "./_service/addPayment.service";
import { addPaymentSchema, editPaymentSchema } from "./_dto/mutate-payment.dto";
import { editPayment } from "./_service/editPayment.service";
import { withAuth } from "@/backend/helpers/withAuth";

export const GET = withErrorHandling(
  withAuth(withQueryValidation(getPayments, getPaymentSchema))
);

export const POST = withErrorHandling(
  withAuth(withBodyValidation(addPayment, addPaymentSchema))
);

export const PATCH = withErrorHandling(
  withAuth(withBodyValidation(editPayment, editPaymentSchema))
);
