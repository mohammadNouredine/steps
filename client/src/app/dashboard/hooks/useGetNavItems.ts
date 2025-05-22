import { FaChild, FaMoneyCheck, FaStore } from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GrFingerPrint } from "react-icons/gr";

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
    {
      name: "Attendance",
      href: "/dashboard/attendance",
      icon: GrFingerPrint,
    },
    {
      name: "Purchases",
      href: "/dashboard/purchases",
      icon: FaStore,
    },
  ];
  return DASHBOARD_NAV_ITEMS;
};
export type DashboardLink = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};
