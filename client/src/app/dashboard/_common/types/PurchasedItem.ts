import { Kid, PurchasedItem } from "@prisma/client";

export type DashboardPurchasedItem = PurchasedItem & {
  kid: Kid;
};
