"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import { useGetSummary } from "../api-hookts/summary/useGetSummary";
import { SummaryValue } from "../_common/components/PageHeader/Summary";

function SummaryPage() {
  const { data: summaryData } = useGetSummary();

  const totalExpensesPaid = summaryData?.expenses.totalPaid || 0;
  const totalPayments = summaryData?.payments.totalPaid || 0;
  const totalLoans = summaryData?.loans.totalLoanBalance || 0;
  const totalPurchasedItems = summaryData?.purchasedItems.totalPaidAmount || 0;

  const totalProfit =
    totalExpensesPaid - totalPayments - totalLoans - totalPurchasedItems;

  const summary_values: SummaryValue[] = [
    {
      title: "Total Expenses Paid",
      value: `$${summaryData?.expenses.totalPaid}`,
      icon: <div className="text-brand-green">💰</div>,
      textColor: "success",
    },
    {
      title: "Total Expenses Due",
      value: `$${summaryData?.expenses.totalDue}`,
      icon: <div className="text-brand-green">💰</div>,
      textColor: "success",
    },
    {
      title: "Total Payments",
      value: `$${summaryData?.payments.totalPaid}`,
      icon: <div className="text-brand-yellow">💰</div>,
      textColor: "success",
    },
    {
      title: "Total Loans",
      value: `$${summaryData?.loans.totalLoanBalance}`,
      icon: <div className="text-brand-red">💰</div>,
      textColor: "success",
    },
    {
      title: "Total Purchased Items",
      value: `$${summaryData?.purchasedItems.totalPaidAmount}`,
      icon: <div className="text-brand-green">💰</div>,
      textColor: "success",
    },
    {
      title: "Total Profit",
      value: `$${totalProfit}`,
      icon: <div className="text-brand-green">💰</div>,
      textColor: "success",
    },
  ];

  return (
    <div>
      <PageHeader
        hasAddButton={false}
        title="Summary"
        summaryValues={summary_values}
      />
    </div>
  );
}

export default SummaryPage;
