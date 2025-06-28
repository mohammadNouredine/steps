import {
  FaChild,
  FaEnvelope,
  FaLayerGroup,
  FaMoneyCheck,
  FaStore,
  FaUser,
  FaCalculator,
  FaClockRotateLeft,
} from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GrFingerPrint } from "react-icons/gr";
import { CgNotes } from "react-icons/cg";
import { MdAttachMoney } from "react-icons/md";
import { BiMoney } from "react-icons/bi";
import { usePermissions } from "@/hooks/usePermissions";

export const useGetNavItems = () => {
  const {
    canSeeKids,
    canSeeAttendance,
    canSeePayments,
    canSeeSubscriptions,
    canSeeExpenses,
    canSeeUsers,
    canSeeContactMessages,
    canSeeReports,
    canSeePurchases,
    canSeeNotes,
    canSeeAccounting,
    canSeeKidTransactions,
  } = usePermissions();

  const DASHBOARD_NAV_ITEMS: DashboardLink[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: RiDashboardHorizontalFill,
      toolTip: "الصفحة الرئيسية",
      isVisible: true, // Always visible
    },
    {
      name: "Kids",
      href: "/dashboard/kids",
      icon: FaChild,
      toolTip: "الأطفال (حيث يمكنك إضافة طفل جديد أو حذف طفل...)",
      isVisible: canSeeKids(),
    },
    {
      name: "Subscriptions",
      href: "/dashboard/subscriptions",
      icon: FaMoneyCheck,
      toolTip: "الاشتراكات و أنواعها",
      isVisible: canSeeSubscriptions(),
    },
    {
      name: "Attendance",
      href: "/dashboard/attendance",
      icon: GrFingerPrint,
      toolTip: "الحضور اليومي للأطفال",
      isVisible: canSeeAttendance(),
    },
    {
      name: "Purchases",
      href: "/dashboard/purchases",
      icon: FaStore,
      toolTip: "المشتريات اليومية",
      isVisible: canSeePurchases(),
    },
    {
      name: "Notes",
      href: "/dashboard/notes",
      icon: CgNotes,
      toolTip: "الملاحظات للتّذكير",
      isVisible: canSeeNotes(),
    },
    {
      name: "Expenses",
      href: "/dashboard/expenses",
      icon: MdAttachMoney,
      toolTip: "المصاريف (مثل: أغراض, معاشات...)",
      isVisible: canSeeExpenses(),
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: FaCalculator,
      toolTip: "معاملات تصحيح الدّين",
      isVisible: canSeeAccounting(),
    },
    {
      name: "Kid Transactions",
      href: "/dashboard/kid-transactions",
      icon: FaClockRotateLeft,
      toolTip: "سجل جميع معاملات الأطفال (إضافة، تعديل، حذف)",
      isVisible: canSeeKidTransactions(),
    },
    {
      name: "Payments",
      href: "/dashboard/payments",
      icon: BiMoney,
      toolTip: "المدفوعات للأطفال",
      isVisible: canSeePayments(),
    },
    {
      name: "Summary",
      href: "/dashboard/summary",
      icon: FaLayerGroup,
      toolTip: "الملخص الشهري للأموال",
      isVisible: canSeeReports(),
    },
    {
      name: "Contact Messages",
      href: "/dashboard/contact",
      icon: FaEnvelope,
      toolTip: "الرسائل التي يرسلها الأهل",
      isVisible: canSeeContactMessages(),
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: FaUser,
      toolTip: "المستخدمين",
      isVisible: canSeeUsers(),
    },
  ];

  // Filter out invisible items
  const visibleNavItems = DASHBOARD_NAV_ITEMS.filter((item) => item.isVisible);

  return visibleNavItems;
};

export type DashboardLink = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  toolTip?: string;
  isVisible: boolean;
};
