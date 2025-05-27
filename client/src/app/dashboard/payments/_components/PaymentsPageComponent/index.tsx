"use client";
import React from "react";
import PaymentsTable from "../PaymentsTable";
import PageHeader from "@/app/dashboard/_common/components/PageHeader";

function PaymentsPageComponent() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <PageHeader
        title="Payments"
        onAddClick={() => {
          setIsOpen(true);
        }}
      />
      <PaymentsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default PaymentsPageComponent;
