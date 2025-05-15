"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { DashboardLink, useGetNavItems } from "./hooks/useGetNavItems";

function Dashboard() {
  const DASHBOARD_NAV_ITEMS = useGetNavItems();
  const items = DASHBOARD_NAV_ITEMS.filter(
    (item) => item.href !== "/dashboard"
  );
  //
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items?.map((item) => (
        <DashboardLinkCard key={item.name} link={item} />
      ))}
    </div>
  );
}

const DashboardLinkCard = ({ link }: { link: DashboardLink }) => {
  return (
    <Link
      href={link.href}
      key={link.name}
      className="transition-all p-10 bg-white rounded-lg shadow-[0_0_2px_0_rgba(0,0,0,.1)] group border border-transparent hover:border-primary"
    >
      <link.icon
        className={cn(
          "transition-all text-2xl text-gray-500 group-hover:text-primary"
        )}
      />
      <p className="transition-all mt-2 text-lg !decoration-0 group-hover:text-primary">
        {link.name}
      </p>
    </Link>
  );
};
export default Dashboard;
