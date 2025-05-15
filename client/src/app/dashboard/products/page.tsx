"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import CollectionsTable from "./_components/ProductsTable";

function ProductsPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <PageHeader title="Products" onAddClick={() => setIsOpen(true)} />
      <CollectionsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default ProductsPage;
