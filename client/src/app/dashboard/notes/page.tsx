"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import NotesTable from "./_components/NotesTable";

function NotesPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <PageHeader title="Notes" onAddClick={() => setIsOpen(true)} />
      <NotesTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default NotesPage;
