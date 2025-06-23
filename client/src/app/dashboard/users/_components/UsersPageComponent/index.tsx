"use client";
import React from "react";
import UsersTable from "../UsersTable";
import PageHeader from "@/app/dashboard/_common/components/PageHeader";
function UsersPageComponent() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <PageHeader
        title="Users"
        onAddClick={() => {
          setIsOpen(true);
        }}
      />
      <UsersTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default UsersPageComponent;
