import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";

import {
  addTransactionSchema,
  deleteTransactionSchema,
} from "./_dto/mutate-transaction.dto";
import { getTransactionSchema } from "./_dto/gets-transaction.dto";
import { getTransactions } from "./_service/getTransactions.service";
import { addTransaction } from "./_service/addTransaction.service";
import { deleteTransaction } from "./_service/deleteTransaction.service";
import { withAuth } from "@/backend/helpers/withAuth";
import { withPermission } from "@/backend/helpers/withPermission";
import {
  PermissionModuleEnum,
  PermissionActionEnum,
} from "@/types/permissions";

export const GET = withErrorHandling(
  withAuth(
    withPermission({
      module: PermissionModuleEnum.ACCOUNTING,
      action: PermissionActionEnum.READ,
    })(withQueryValidation(getTransactions, getTransactionSchema))
  )
);

export const POST = withErrorHandling(
  withAuth(
    withPermission({
      module: PermissionModuleEnum.ACCOUNTING,
      action: PermissionActionEnum.WRITE,
    })(withBodyValidation(addTransaction, addTransactionSchema))
  )
);

export const DELETE = withErrorHandling(
  withAuth(
    withPermission({
      module: PermissionModuleEnum.ACCOUNTING,
      action: PermissionActionEnum.DELETE,
    })(withBodyValidation(deleteTransaction, deleteTransactionSchema))
  )
);
