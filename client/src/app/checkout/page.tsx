"use client";
import React from "react";

import FillDetails from "./_components/FillDetails";
import Confirmation from "./_components/Confirmation";
import LayoutWrapper from "@/components/common/layout/LayoutWrapper";

function Checkout() {
  const [step, setStep] = React.useState<"details" | "confirmation">("details");
  return (
    <LayoutWrapper hasBlockFooter={false} hasFooter={false} hasHeader={false}>
      <div className="min-h-screen pb-36 pt-4">
        {step === "details" && <FillDetails setStep={setStep} />}
        {step === "confirmation" && <Confirmation setStep={setStep} />}
      </div>
    </LayoutWrapper>
  );
}

export default Checkout;
