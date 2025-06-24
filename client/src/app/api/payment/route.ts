import { withErrorHandling } from "@/backend/helpers/withErrorHandling";
import {
  withBodyValidation,
  withQueryValidation,
} from "@/backend/helpers/withValidation";
import { withAuth } from "@/backend/helpers/withAuth";
import { withPermission } from "@/backend/helpers/withPermission";
import {
  PermissionModuleEnum,
  PermissionActionEnum,
} from "@/types/permissions";

import { getPayments } from "./_service/getPayment.service";
import { getPaymentSchema } from "./_dto/gets-payment.dto";
import { addPayment } from "./_service/addPayment.service";
import { addPaymentSchema, editPaymentSchema } from "./_dto/mutate-payment.dto";
import { editPayment } from "./_service/editPayment.service";

export const GET = withErrorHandling(
  withAuth(
    withPermission({
      module: PermissionModuleEnum.PAYMENTS,
      action: PermissionActionEnum.READ,
    })(withQueryValidation(getPayments, getPaymentSchema))
  )
);

export const POST = withErrorHandling(
  withAuth(
    withPermission({
      module: PermissionModuleEnum.PAYMENTS,
      action: PermissionActionEnum.WRITE,
    })(withBodyValidation(addPayment, addPaymentSchema))
  )
);

export const PATCH = withErrorHandling(
  withAuth(
    withPermission({
      module: PermissionModuleEnum.PAYMENTS,
      action: PermissionActionEnum.WRITE,
    })(withBodyValidation(editPayment, editPaymentSchema))
  )
);
