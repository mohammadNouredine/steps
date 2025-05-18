"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import KidsTable from "./_components/KidsTable";

function KidsPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <PageHeader title="Kids" onAddClick={() => setIsOpen(true)} />
      <KidsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default KidsPage;
