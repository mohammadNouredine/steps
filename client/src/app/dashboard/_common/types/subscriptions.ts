import { Kid, Subscription } from "@prisma/client";

export type DashboardSubscriptionType = Subscription & {
  kid: Kid;
};
