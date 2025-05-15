import React from "react";
import Divider from "@/components/common/ui/Divider";
import BackBtn from "@/components/common/layout/BackBtn";
import Items from "./Items";
import DetailsForm from "./DetailsForm";

function FillDetails({
  setStep,
}: {
  setStep: (step: "details" | "confirmation") => void;
}) {
  return (
    <div>
      <BackBtn />
      <Items />
      <Divider />
      <DetailsForm setStep={setStep} />
    </div>
  );
}

export default FillDetails;
