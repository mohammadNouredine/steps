import React from "react";
import { BiSearch } from "react-icons/bi";
import { Input, InputGroup } from "rsuite";
import "rsuite/dist/rsuite.min.css";

export default function SearchInput({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="w-full products-search">
      <InputGroup inside>
        <Input placeholder="Search" value={value} onChange={setValue} />
        <InputGroup.Button tabIndex={-1}>
          <BiSearch className="text-xl" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
}
