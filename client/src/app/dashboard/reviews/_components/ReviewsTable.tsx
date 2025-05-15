"use client";
import { createColumnHelper } from "@tanstack/react-table";

import React from "react";
import { DashboardTable } from "@/app/_components/tables/DashboardTable";
import { FiEdit2 } from "react-icons/fi";
import AddEditCollectionModal from "./AddEditReviewModal";
import { useGetAllReviews } from "../../api-hookts/review/useGetAllReviews";
import { useDeleteReview } from "../../api-hookts/review/useDeleteReview";
import { DashboardReview } from "../../_common/types/review";
import { cn } from "@/utils/cn";

const columnHelper = createColumnHelper<DashboardReview>();
function ReviewsTable({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //------------------STATES-------------------------

  const [editingReview, setEditingReview] = React.useState<
    DashboardReview | undefined
  >();
  //------------------API CALLS-------------------------
  const { data: reviews_data } = useGetAllReviews();
  const { mutate: deleteReview } = useDeleteReview();

  //------------------COLUMNS-------------------------
  const tags_columns = [
    columnHelper.accessor("id", {
      header: () => <span>ID</span>,
      cell: (info) => <div>{info.row.original.id}</div>,
    }),
    columnHelper.accessor("review_amount", {
      header: () => <span>Review Amount</span>,
      cell: (info) => {
        const amount = info.row.original.review_amount;
        const isBad = amount < 3;
        const isNeutral = amount >= 3 && amount < 4;
        const isGood = amount >= 4 && amount < 5;
        const isVeryGood = amount === 5;

        return (
          <div
            className={cn(
              " p-2 rounded-full max-w-10 flex items-center justify-center aspect-square font-semibold",
              isBad
                ? "bg-primary/70"
                : isNeutral
                ? "bg-lightOrange"
                : isGood
                ? "bg-lightGreen"
                : isVeryGood
                ? "bg-mediumGreen"
                : "bg-gray-400"
            )}
          >
            {info.row.original.review_amount}
          </div>
        );
      },
    }),
    columnHelper.accessor("type", {
      header: () => <span>Type</span>,
      cell: (info) => <div>{info.row.original.type}</div>,
    }),
    columnHelper.accessor("name", {
      header: () => <span>Name</span>,
      cell: (info) => <div>{info.row.original.name}</div>,
    }),
    columnHelper.accessor("description", {
      header: () => <span>Description</span>,
      cell: (info) => <div>{info.row.original.description}</div>,
    }),
    columnHelper.accessor("id", {
      header: () => <span>Edit</span>,
      cell: (info) => (
        <button
          onClick={() => {
            setEditingReview(info.row.original);
            setIsOpen(true);
          }}
          className="border border-red-500 px-2 py-2 rounded-lg text-red-500"
        >
          <FiEdit2 />
        </button>
      ),
    }),
  ];
  //---------------------------RENDER-----------------
  return (
    <div>
      <DashboardTable
        data={reviews_data}
        columns={tags_columns}
        deleteMutation={deleteReview}
      />
      <AddEditCollectionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingReview={editingReview}
        setEditingReview={setEditingReview}
      />
    </div>
  );
}

export default ReviewsTable;
