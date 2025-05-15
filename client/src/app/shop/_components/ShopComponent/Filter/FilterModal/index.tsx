import Modal from "@/components/common/Modal";
import React from "react";
import Filters from "./Filters";

function FilterModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      minHeight="min-h-[90vh]"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Filter"
    >
      <Filters setIsOpen={setIsOpen} />
    </Modal>
  );
}

export default FilterModal;
