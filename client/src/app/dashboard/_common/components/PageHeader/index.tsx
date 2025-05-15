import React from "react";
import TitleAndButtons from "./TitleAndButtons";
import Summary, { SummaryValue } from "./Summary";

function PageHeader({
  title,
  onAddClick,
  summaryValues,
  hasAddButton = true,
}: {
  title: string;
  onAddClick?: () => void;
  summaryValues?: SummaryValue[];
  hasAddButton?: boolean;
}) {
  return (
    <div className="w-full mb-10">
      <TitleAndButtons
        title={title}
        onAddClick={onAddClick}
        hasAddButton={hasAddButton}
      />
      {summaryValues && <Summary values={summaryValues} />}
    </div>
  );
}

export default PageHeader;
