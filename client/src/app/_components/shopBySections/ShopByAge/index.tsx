import React from "react";
import SectionContainer from "../SectionContainer";

const AGES = [
  {
    age: "0-2",
    color: "bg-blue",
  },
  {
    age: "2-4",
    color: "bg-green",
  },
  {
    age: "4-6",
    color: "bg-orange",
  },
  {
    age: "6-8",
    color: "bg-pink",
  },
  {
    age: "8-10",
    color: "bg-purple",
  },
  {
    age: "10+",
    color: "bg-cyan",
  },
];

function ShopByAge() {
  return (
    <SectionContainer title={"Shop by age"}>
      <div className="grid grid-cols-6 gap-x-2 mt-2">
        {AGES.map((age, index) => (
          <div
            key={index}
            className={`w-full aspect-square rounded-full  ${age.color} flex flex-col items-center justify-center`}
          >
            <p className="text-white text-xl font-bold">{age.age}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

export default ShopByAge;
