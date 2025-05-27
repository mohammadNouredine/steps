"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import KidsTable from "./_components/KidsTable";
import { SummaryValue } from "../_common/components/PageHeader/Summary";
import { FaChild } from "react-icons/fa6";

function KidsPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const orderSummaryValues: SummaryValue[] = [
    {
      title: "Total Number of Orders",
      value: 0,
      icon: <FaChild />,
    },
    {
      title: "Total Income",
      value: 0,
    },
    {
      title: "Total Costs",
      value: 0,
    },
    {
      title: "Total Profits",
      value: 0,
    },
  ];
  return (
    <div>
      <PageHeader
        summaryValues={orderSummaryValues}
        title="Kids"
        onAddClick={() => setIsOpen(true)}
      />
      <KidsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default KidsPage;
