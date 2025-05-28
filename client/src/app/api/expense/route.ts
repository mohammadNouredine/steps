import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";

import { addExpenseSchema, editExpenseSchema } from "./_dto/mutate-expense.dto";
import { getExpenseSchema } from "./_dto/gets-expense.dto";
import { getExpenses } from "./_service/getExpenses.service";
import { addExpense } from "./_service/addExpense.service";
import { editExpense } from "./_service/editExpense.service";
import { withAuth } from "@/backend/helpers/withAuth";
export const GET = withErrorHandling(
  withAuth(withQueryValidation(getExpenses, getExpenseSchema))
);

export const POST = withErrorHandling(
  withAuth(withBodyValidation(addExpense, addExpenseSchema))
);

export const PATCH = withErrorHandling(
  withAuth(withBodyValidation(editExpense, editExpenseSchema))
);
