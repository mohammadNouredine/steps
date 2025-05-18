import { BiBookContent, BiImage, BiSolidCollection } from "react-icons/bi";
import { FaBook, FaChild, FaStar, FaTag } from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { LuBookCopy } from "react-icons/lu";
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
      name: "Orders",
      href: "/dashboard/orders",
      icon: TbTruckDelivery,
    },
    {
      name: "Collections",
      href: "/dashboard/collections",
      icon: BiSolidCollection,
    },
    {
      name: "Tags",
      href: "/dashboard/tags",
      icon: FaTag,
    },
    {
      name: "Reviews",
      href: "/dashboard/reviews",
      icon: FaStar,
    },
    {
      name: "Variants",
      href: "/dashboard/variants",
      icon: LuBookCopy,
    },
    {
      name: "Media",
      href: "/dashboard/media",
      icon: BiImage,
    },
    {
      name: "Content",
      href: "/dashboard/content",
      icon: BiBookContent,
    },
  ];
  return DASHBOARD_NAV_ITEMS;
};
export type DashboardLink = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};
