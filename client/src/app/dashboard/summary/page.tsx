"use client";

import React from "react";
import PageHeader from "../_common/components/PageHeader";
import { useGetSummary } from "../api-hookts/summary/useGetSummary";
import { SummaryValue } from "../_common/components/PageHeader/Summary";

const SummaryPage: React.FC = () => {
  const { data: summaryData, isPending } = useGetSummary();

  // 1. All payments I want from kids (loan balance)
  const totalLoanBalance: number = summaryData?.loans.totalLoanBalance ?? 0;

  // 2. All payments paid
  const totalPaymentsPaid: number = summaryData?.payments.totalPaid ?? 0;

  // 3. All purchases (paid / will be paid)
  const totalPurchasedPaid: number =
    summaryData?.purchasedItems.totalPaidAmount ?? 0;
  const totalPurchasedDue: number =
    (summaryData?.purchasedItems.totalPrice ?? 0) - totalPurchasedPaid;

  // 4. All expenses (paid / should pay)
  const totalExpensesPaid: number = summaryData?.expenses.totalPaid ?? 0;
  const totalExpensesDue: number = summaryData?.expenses.totalDue ?? 0;

  // 5. Real profit:
  //    = (paymentsReceived + purchasesPaid + loanBalance)
  //      - (expensesPaid + expensesDue)
  const positiveMoney: number =
    totalPaymentsPaid + totalPurchasedPaid + totalLoanBalance;
  const negativeMoney: number = totalExpensesPaid + totalExpensesDue;
  const realProfit: number = positiveMoney - negativeMoney;

  // 6. Current profit & current expenses (exclude upcoming dues)
  //    currentProfit = (paymentsReceived + purchasesPaid) - expensesPaid
  //    currentExpenses = expensesPaid
  const currentPositive: number = totalPaymentsPaid + totalPurchasedPaid;
  const currentNegative: number = totalExpensesPaid;
  const currentProfit: number = currentPositive - currentNegative;
  const currentExpenses: number = totalExpensesPaid;

  const summaryValues: SummaryValue[] = [
    {
      title: "Loans Outstanding",
      value: `$${totalLoanBalance.toFixed(2)}`,
      icon: <div className="text-brand-yellow">💰</div>,
      textColor: "success",
    },
    {
      title: "Payments Received",
      value: `$${totalPaymentsPaid.toFixed(2)}`,
      icon: <div className="text-brand-green">💰</div>,
      textColor: "success",
    },
    {
      title: "Purchases Paid",
      value: `$${totalPurchasedPaid.toFixed(2)}`,
      icon: <div className="text-brand-green">💰</div>,
      textColor: "success",
    },
    {
      title: "Purchases Due",
      value: `$${totalPurchasedDue.toFixed(2)}`,
      icon: <div className="text-brand-yellow">💰</div>,
      textColor: "success",
    },
    {
      title: "Expenses Paid",
      value: `$${totalExpensesPaid.toFixed(2)}`,
      icon: <div className="text-brand-red">💸</div>,
      textColor: "success",
    },
    {
      title: "Expenses Due",
      value: `$${totalExpensesDue.toFixed(2)}`,
      icon: <div className="text-brand-red">💸</div>,
      textColor: "success",
    },
    {
      title: "Real Profit",
      value: `$${realProfit.toFixed(2)}`,
      icon: <div className="text-brand-green">📈</div>,
      textColor: "success",
    },
    {
      title: "Current Profit",
      value: `$${currentProfit.toFixed(2)}`,
      icon: <div className="text-brand-green">⚡️</div>,
      textColor: "success",
    },
    {
      title: "Current Expenses",
      value: `$${currentExpenses.toFixed(2)}`,
      icon: <div className="text-brand-red">⚡️</div>,
      textColor: "success",
    },
  ];

  return (
    <div>
      <PageHeader
        isLoading={isPending}
        hasAddButton={false}
        title="Summary"
        summaryValues={summaryValues}
      />
    </div>
  );
};

export default SummaryPage;
