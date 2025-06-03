"use client";
import React from "react";
import PageHeader from "../_common/components/PageHeader";
import ContactMessagesTable from "./_components/ContactMessagesTable";

function ContactsPage() {
  return (
    <div>
      <PageHeader title="Contact Messages" />
      <ContactMessagesTable />
    </div>
  );
}

export default ContactsPage;
