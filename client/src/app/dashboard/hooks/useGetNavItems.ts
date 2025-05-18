import { FaBook, FaChild, FaMoneyCheck } from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
export const useGetNavItems = () => {
  const DASHBOARD_NAV_ITEMS: DashboardLink[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: RiDashboardHorizontalFill,
    },
    {
      name: "Kids",
      href: "/dashboard/kids",
      icon: FaChild,
    },
    {
      name: "Subscriptions",
      href: "/dashboard/subscriptions",
      icon: FaMoneyCheck,
    },
  ];
  return DASHBOARD_NAV_ITEMS;
};
export type DashboardLink = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};
