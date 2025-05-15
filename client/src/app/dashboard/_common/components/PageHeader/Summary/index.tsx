import React from "react";
import { FaBorderAll } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export type SummaryValue = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
};
function Summary({ values }: { values: SummaryValue[] }) {
  return (
    <div className="w-full rounded-xl bg-white flex items-center justify-between p-4 mt-8 shadow-[0_0_8px_0_rgba(0,0,0,0.1)]">
      <div className="flex gap-x-8 ">
        {values.map((item, _index) => (
          <>
            <div className="flex items-start gap-x-2">
              {item?.icon && (
                <div className="text-2xl text-gray-400">{item.icon}</div>
              )}
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  {item.title}
                </p>
                <p className="text-gray-700  font-bold text-2xl ">
                  {item.value}
                </p>
              </div>
            </div>
            {_index !== data.length && (
              <div className="h-14 w-0.5 bg-gray-300 " />
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default Summary;

const data = [
  {
    title: "Total Sales",
    value: "$10,000",
    icon: RiMoneyDollarCircleFill,
  },
  {
    title: "Total Orders",
    value: "100",
    icon: FaBorderAll,
  },
  {
    title: "Total Customers",
    value: "100",
    icon: IoPerson,
  },
];
