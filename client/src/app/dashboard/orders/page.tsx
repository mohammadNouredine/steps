"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import OrdersTable from "./_components/OrdersTable";
import { useGetOrderStatistics } from "../api-hookts/order/useGetOrderStatistics";
import { SummaryValue } from "../_common/components/PageHeader/Summary";

function OrdersPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: statistics } = useGetOrderStatistics({});
  const orderSummaryValues: SummaryValue[] = [
    {
      title: "Total Number of Orders",
      value: statistics?.total_number_of_orders || 0,
    },
    {
      title: "Total Income",
      value: statistics?.total_income || 0,
    },
    {
      title: "Total Costs",
      value: statistics?.total_costs || 0,
    },
    {
      title: "Total Profits",
      value: statistics?.total_profits || 0,
    },
  ];
  return (
    <div className="">
      <PageHeader
        title="Orders"
        onAddClick={() => setIsOpen(true)}
        summaryValues={orderSummaryValues}
      />
      <OrdersTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default OrdersPage;
