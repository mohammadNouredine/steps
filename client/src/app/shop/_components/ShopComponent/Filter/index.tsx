import React from "react";
import { IoFilter } from "react-icons/io5";
import FilterModal from "./FilterModal";

function Filter() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center border  rounded-full p-3.5 "
      >
        <IoFilter size={20} />
      </button>
      <FilterModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Filter;
