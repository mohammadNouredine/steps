"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import KidsTable from "./_components/SubscriptionsTable";
import { SummaryValue } from "../_common/components/PageHeader/Summary";
import SubscriptionPlans from "./_components/SubscriptionPlans";

function subscriptions() {
  const [isOpen, setIsOpen] = React.useState(false);
  const orderSummaryValues: SummaryValue[] = [
    {
      title: "Total Number of Orders",
      value: 0,
    },
    {
      title: "Total Income",
      value: 0,
    },
    {
      title: "Total Costs",
      value: 0,
    },
    {
      title: "Total Profits",
      value: 0,
    },
  ];
  return (
    <div>
      <PageHeader
        summaryValues={orderSummaryValues}
        title="Subscription Plans"
        onAddClick={() => setIsOpen(true)}
      />
      <SubscriptionPlans />
      <KidsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default subscriptions;
