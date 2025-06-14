import {
  FaChild,
  FaEnvelope,
  FaLayerGroup,
  FaMoneyCheck,
  FaStore,
} from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GrFingerPrint } from "react-icons/gr";
import { CgNotes } from "react-icons/cg";
import { MdAttachMoney } from "react-icons/md";
import { BiMoney } from "react-icons/bi";

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
    {
      name: "Notes",
      href: "/dashboard/notes",
      icon: CgNotes,
    },
    {
      name: "Expenses",
      href: "/dashboard/expenses",
      icon: MdAttachMoney,
    },
    {
      name: "Payments",
      href: "/dashboard/payments",
      icon: BiMoney,
    },
    {
      name: "Summary",
      href: "/dashboard/summary",
      icon: FaLayerGroup,
    },
    {
      name: "Contact Messages",
      href: "/dashboard/contact",
      icon: FaEnvelope,
    },
  ];
  return DASHBOARD_NAV_ITEMS;
};
export type DashboardLink = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};
