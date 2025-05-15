"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import TagsTable from "./_components/TagsTable";

function TagsPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <PageHeader title="Tags" onAddClick={() => setIsOpen(true)} />
      <TagsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default TagsPage;
