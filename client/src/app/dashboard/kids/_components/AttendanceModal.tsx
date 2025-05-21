import React from "react";
import Image from "next/image";
import CenteredModal from "../../../_components/popups/CenteredModal";
import { Kid } from "@prisma/client";
import { FaTimes } from "react-icons/fa";

interface AttendanceModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  kid?: Kid;
}

const placeholderImage = "/placeholder.png";

export default function AttendanceModal({
  isOpen,
  setIsOpen,
  kid,
}: AttendanceModalProps) {
  const {
    id,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    notes,
    image,
    gender,
    loanBalance,
    dateJoined,
    createdAt,
    updatedAt,
  } = kid;

  const formatDate = (date?: Date | string | null) => {
    if (!date) return "N/A";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <CenteredModal
      title=""
      isOpenModal={isOpen}
      maxWidth="max-w-4xl"
      setIsOpenModal={setIsOpen}
    >
      {/* Custom Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          {firstName} {lastName}
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row gap-8 p-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-40 h-40 rounded-xl overflow-hidden ring-2 ring-indigo-500">
            <Image
              src={image || placeholderImage}
              alt={`${firstName} ${lastName}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
          {[
            ["ID", id],
            ["Date of Birth", formatDate(dateOfBirth)],
            ["Phone", phoneNumber || "N/A"],
            ["Gender", gender || "Not specified"],
            ["Loan Balance", formatCurrency(loanBalance)],
            ["Date Joined", formatDate(dateJoined)],
            ["Created At", formatDate(createdAt)],
            ["Updated At", formatDate(updatedAt)],
          ].map(([label, value]) => (
            <div
              key={label}
              className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col"
            >
              <span className="text-sm uppercase text-gray-500">{label}</span>
              <span className="mt-1 text-lg font-medium text-gray-900">
                {value}
              </span>
            </div>
          ))}

          {/* Notes spans full width */}
          <div className="sm:col-span-2 p-4 bg-gray-50 rounded-lg shadow-sm">
            <span className="text-sm uppercase text-gray-500">Notes</span>
            <p className="mt-1 text-gray-800">{notes || "None"}</p>
          </div>
        </div>
      </div>
    </CenteredModal>
  );
}
