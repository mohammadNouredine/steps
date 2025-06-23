"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import KidsTable from "./_components/KidsTable";
import { SummaryValue } from "../_common/components/PageHeader/Summary";
import { FaChild, FaMoneyBill } from "react-icons/fa6";
import { KidType, useGetAllKids } from "../api-hookts/kids/useGetAllKids";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { usePermissions } from "@/hooks/usePermissions";

function KidsPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: kids_data, isPending } = useGetAllKids();
  const kids = kids_data?.data;
  const kidsLength = kids?.length || 0;
  const totalLoans = kids?.reduce((acc, kid) => {
    return acc + kid.loanBalance;
  }, 0);

  const getKidAge = (kid: KidType) => {
    const dob = new Date(kid.dateOfBirth);
    const age = Math.floor(
      (new Date().getTime() - new Date(dob).getTime()) /
        (1000 * 60 * 60 * 24 * 365.25)
    );
    return age;
  };

  const averageKidsAge =
    kids && kidsLength > 0
      ? kids?.reduce((acc, kid) => {
          if (!kid.dateOfBirth) return acc;
          return acc + getKidAge(kid);
        }, 0) / kidsLength
      : 0;
  const { canSeeTotalLoans } = usePermissions();
  const orderSummaryValues: SummaryValue[] = [
    {
      title: "Total Number of Kids",
      value: kidsLength,
      icon: <FaChild />,
      shouldNotFormat: true,
    },
    canSeeTotalLoans()
      ? {
          title: "Total Loans ($)",
          value: totalLoans || 0,
          icon: <FaMoneyBill />,
        }
      : null,
    {
      title: "Average Kid Age",
      value: averageKidsAge || 0,
      icon: <LiaBirthdayCakeSolid />,
    },
  ].filter(Boolean) as SummaryValue[];
  return (
    <div>
      <PageHeader
        isLoading={isPending}
        summaryValues={orderSummaryValues}
        title="Kids"
        onAddClick={() => setIsOpen(true)}
      />
      <KidsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default KidsPage;
