import React from "react";

function TitleAndButtons({
  title,
  onAddClick,
  hasAddButton,
}: {
  title: string;
  onAddClick?: () => void;
  hasAddButton?: boolean;
}) {
  return (
    <div className="flex items-center justify-between flex-wrap">
      <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
      {hasAddButton && (
        <div className="flex gap-x-2">
          <button
            onClick={onAddClick}
            className="px-5 py-2 rounded-lg bg-primary text-white"
          >
            Add New
          </button>
        </div>
      )}
    </div>
  );
}

export default TitleAndButtons;
