"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import VariantsTable from "./_components/VariantsTable";

function VariantsPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <PageHeader title="Variants" onAddClick={() => setIsOpen(true)} />
      <VariantsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default VariantsPage;
