"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import ReviewsTable from "./_components/ReviewsTable";
import { useGetReviewSummary } from "../api-hookts/review/useGetReviewSummary";
import { LuMessagesSquare } from "react-icons/lu";
import { TbStarsFilled } from "react-icons/tb";

function ReviewsPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: reviewSummary } = useGetReviewSummary();

  return (
    <div>
      <PageHeader
        title="Reviews"
        hasAddButton={false}
        summaryValues={[
          {
            title: "Average",
            value: reviewSummary?.average?.toFixed(2) || 0,
            icon: <TbStarsFilled />,
          },
          {
            title: "Total",
            value: reviewSummary?.total || 0,
            icon: <LuMessagesSquare />,
          },
        ]}
      />
      <ReviewsTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default ReviewsPage;
