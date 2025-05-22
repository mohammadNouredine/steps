"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import PurchasesTable from "./_components/PurchasesTable";

function PurchasesPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <PageHeader title="Purchases" onAddClick={() => setIsOpen(true)} />
      <PurchasesTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default PurchasesPage;
