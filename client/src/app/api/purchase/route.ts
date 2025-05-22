import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";
import { getPurchasesSchema } from "./_dto/getsPurchase.dto";
import { getPurchases } from "./_service/getPurchases.service";
import { addPurchaseSchema } from "./_dto/mutatePurchase.dto";
import { addPurchase } from "./_service/addPurchase.service";

export const GET = withErrorHandling(
  withQueryValidation(getPurchases, getPurchasesSchema)
);

export const POST = withErrorHandling(
  withBodyValidation(addPurchase, addPurchaseSchema)
);
