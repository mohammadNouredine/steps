"use client";
import React from "react";
import AttendeesTable from "../AttendeesTable";
import PageHeader from "@/app/dashboard/_common/components/PageHeader";

function AttendancePageComponent() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <PageHeader
        title="Attendance"
        onAddClick={() => {
          setIsOpen(true);
        }}
      />
      <AttendeesTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default AttendancePageComponent;
