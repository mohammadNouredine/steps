"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import KidsTable from "./_components/SubscriptionsTable";
import SubscriptionPlans from "./_components/SubscriptionPlans";

function Subscriptions() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <PageHeader
        title="Subscription Plans"
        onAddClick={() => setIsOpen(true)}
      />
      <SubscriptionPlans />
      <KidsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Subscriptions;
