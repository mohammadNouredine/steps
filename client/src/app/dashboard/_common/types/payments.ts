import { Kid, Payment } from "@prisma/client";

export type DashboardPaymentType = Payment & {
  kid: Kid;
};
