import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";
import { getPurchasesSchema } from "./_dto/getsPurchase.dto";
import { getPurchases } from "./_service/getPurchases.service";
import { addPurchaseSchema } from "./_dto/mutatePurchase.dto";
import { addPurchase } from "./_service/addPurchase.service";
import { withAuth } from "@/backend/helpers/withAuth";

export const GET = withErrorHandling(
  withAuth(withQueryValidation(getPurchases, getPurchasesSchema))
);

export const POST = withErrorHandling(
  withAuth(withBodyValidation(addPurchase, addPurchaseSchema))
);
