import React, { useRef, useState } from "react";
import Image from "next/image";
import CenteredModal from "../../../_components/popups/CenteredModal";
import { FaTimes } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { KidType } from "../../api-hookts/kids/useGetAllKids";
import Button from "@/components/common/ui/Button";
import { Checkbox } from "rsuite";

interface PrintAllKidsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  kids: KidType[];
}

const placeholderImage = "/images/profile-image-fallback.webp";

function formatDate(date: Date | string | null): string {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
}

function formatCurrency(amount: number | null): string {
  if (amount == null) return "N/A";
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}

export default function PrintAllKidsModal({
  isOpen,
  setIsOpen,
  kids,
}: PrintAllKidsModalProps) {
  const [showAttendedOnly, setShowAttendedOnly] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({ contentRef });

  const filteredKids = showAttendedOnly
    ? kids.filter((k) => k.hasAttendedToday)
    : kids;

  return (
    <CenteredModal
      title="All Kids Summary"
      isOpenModal={isOpen}
      maxWidth="max-w-4xl"
      setIsOpenModal={setIsOpen}
    >
      {/* Body to print */}
      <div ref={contentRef} className="p-6">
        <ul className="list-disc list-inside space-y-3">
          {filteredKids.map((kid) => (
            <li key={kid.id} className="flex items-start gap-x-4">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={kid.image || placeholderImage}
                  alt={`${kid.firstName} ${kid.lastName}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {kid.firstName} {kid.lastName}{" "}
                  {kid.hasAttendedToday && (
                    <span className="text-green-600 text-sm">(Attended)</span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  ID: {kid.id} | DOB: {formatDate(kid.dateOfBirth)} | Phone:{" "}
                  {kid.phoneNumber || "N/A"} | Loan:{" "}
                  {formatCurrency(kid.loanBalance ?? null)}
                </div>
              </div>
            </li>
          ))}
          {filteredKids.length === 0 && (
            <li className="text-gray-500">No kids to display.</li>
          )}
        </ul>
      </div>

      {/* Footer with actions */}
      <CenteredModal.Footer>
        <div className="px-6 py-4 border-t flex justify-end gap-x-2">
          <Checkbox
            checked={showAttendedOnly}
            onChange={() => setShowAttendedOnly((prev) => !prev)}
            title="Show only attended kids"
          >
            <p className="text-gray-900 font-medium">Attended Only</p>
          </Checkbox>

          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <FaTimes className="inline mr-2" /> Close
          </button>
          <Button
            onClick={() => handlePrint()}
            text="Print"
            type="button"
            buttonType="button"
            className="w-fit px-8"
          />
        </div>
      </CenteredModal.Footer>
    </CenteredModal>
  );
}
