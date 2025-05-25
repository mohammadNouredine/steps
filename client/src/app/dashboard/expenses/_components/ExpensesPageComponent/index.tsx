"use client";
import React from "react";
import ExpensesTable from "../ExpensesTable";
import PageHeader from "@/app/dashboard/_common/components/PageHeader";

function ExpensesPageComponent() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <PageHeader
        title="Expenses"
        onAddClick={() => {
          setIsOpen(true);
        }}
      />
      <ExpensesTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default ExpensesPageComponent;
