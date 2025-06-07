import React from "react";
import TitleAndButtons from "./TitleAndButtons";
import Summary, { SummaryValue } from "./Summary";

function PageHeader({
  title,
  onAddClick,
  summaryValues,
  hasAddButton = true,
  isLoading = false,
}: {
  title: string;
  onAddClick?: () => void;
  summaryValues?: SummaryValue[];
  hasAddButton?: boolean;
  isLoading?: boolean;
}) {
  return (
    <div className="w-full mb-10">
      <TitleAndButtons
        title={title}
        onAddClick={onAddClick}
        hasAddButton={hasAddButton}
      />
      {summaryValues && (
        <Summary isLoading={isLoading} values={summaryValues} />
      )}
    </div>
  );
}

export default PageHeader;
