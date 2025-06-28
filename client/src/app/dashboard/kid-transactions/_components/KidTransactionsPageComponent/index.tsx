"use client";
import React from "react";
import KidTransactionsTable from "../KidTransactionsTable";
import PageHeader from "@/app/dashboard/_common/components/PageHeader";

function KidTransactionsPageComponent() {
  return (
    <div>
      <PageHeader title="Kid Transactions" hasAddButton={false} />
      <KidTransactionsTable />
    </div>
  );
}

export default KidTransactionsPageComponent;
