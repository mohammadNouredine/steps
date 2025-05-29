import { cn } from "@/utils/cn";
import React from "react";
import { FaBorderAll } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export type SummaryValue = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  shouldNotFormat?: boolean;
  textColor?: "red" | "green" | "yellow" | "orange" | "success";
};
function Summary({ values }: { values: SummaryValue[] }) {
  const colorClassName = {
    red: "text-brand-red-neutral",
    green: "text-brandGreen",
    success: "text-green",
    yellow: "text-brandYellow",
    orange: "text-orange",
    normal: "text-gray-700",
  };

  return (
    <div className="w-full rounded-xl bg-white flex items-center justify-between p-4 mt-8 shadow-[0_0_8px_0_rgba(0,0,0,0.1)]">
      <div className="lg:flex-row flex-col flex gap-x-8 w-full flex-wrap lg:gap-y-4 ">
        {values.map((item, _index) => (
          <>
            <div className="flex items-start gap-x-2 w-full lg:w-fit text-nowrap ">
              {item?.icon && (
                <div className="text-2xl text-gray-400">{item.icon}</div>
              )}
              <div className="flex flex-grow items-center justify-between lg:flex-col lg:justify-start lg:items-start">
                <p className="text-gray-400 text-sm font-medium">
                  {item.title}
                </p>
                <p
                  className={cn(
                    "font-bold text-2xl ",
                    colorClassName[item.textColor || "normal"]
                  )}
                >
                  {item.shouldNotFormat
                    ? item.value
                    : typeof item.value === "number"
                    ? item.value.toFixed(2)
                    : item.value}
                </p>
              </div>
            </div>
            {_index !== data.length && (
              <div className="h-14 w-0.5 bg-gray-300 hidden lg:block " />
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
