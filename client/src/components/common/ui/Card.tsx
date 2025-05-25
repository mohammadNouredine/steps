import React from "react";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 flex flex-col gap-4">
      {children}
    </div>
  );
}

export default Card;
