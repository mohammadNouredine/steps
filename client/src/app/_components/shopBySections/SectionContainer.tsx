import React from "react";

function SectionContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-medium">{title}</h2>
        <p className="text-primary font-medium">See all</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default SectionContainer;
