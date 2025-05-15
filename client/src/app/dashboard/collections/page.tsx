"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import CollectionsTable from "./_components/CollectionsTable";

function CollectionsPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <PageHeader title="Collections" onAddClick={() => setIsOpen(true)} />
      <CollectionsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default CollectionsPage;
