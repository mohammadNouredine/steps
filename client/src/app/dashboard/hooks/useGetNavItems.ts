import {
  FaChild,
  FaEnvelope,
  FaLayerGroup,
  FaMoneyCheck,
  FaStore,
  FaUser,
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
      toolTip: "الصفحة الرئيسية",
    },
    {
      name: "Kids",
      href: "/dashboard/kids",
      icon: FaChild,
      toolTip: "الأطفال (حيث يمكنك إضافة طفل جديد أو حذف طفل...)",
    },
    {
      name: "Subscriptions",
      href: "/dashboard/subscriptions",
      icon: FaMoneyCheck,
      toolTip: "الاشتراكات و أنواعها",
    },
    {
      name: "Attendance",
      href: "/dashboard/attendance",
      icon: GrFingerPrint,
      toolTip: "الحضور اليومي للأطفال",
    },
    {
      name: "Purchases",
      href: "/dashboard/purchases",
      icon: FaStore,
      toolTip: "المشتريات اليومية",
    },
    {
      name: "Notes",
      href: "/dashboard/notes",
      icon: CgNotes,
      toolTip: "الملاحظات للتّذكير",
    },
    {
      name: "Expenses",
      href: "/dashboard/expenses",
      icon: MdAttachMoney,
      toolTip: "المصاريف (مثل: أغراض, معاشات...)",
    },
    {
      name: "Payments",
      href: "/dashboard/payments",
      icon: BiMoney,
      toolTip: "المدفوعات للأطفال",
    },
    {
      name: "Summary",
      href: "/dashboard/summary",
      icon: FaLayerGroup,
      toolTip: "الملخص الشهري للأموال",
    },
    {
      name: "Contact Messages",
      href: "/dashboard/contact",
      icon: FaEnvelope,
      toolTip: "الرسائل التي يرسلها الأهل",
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: FaUser,
      toolTip: "المستخدمين",
    },
  ];
  return DASHBOARD_NAV_ITEMS;
};
export type DashboardLink = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  toolTip?: string;
};
