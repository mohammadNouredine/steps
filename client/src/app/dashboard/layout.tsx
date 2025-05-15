import React from "react";
import SideNav from "./_components/SideNav";
import DashboardAuthProvider from "./_common/providers/DashboardAuthProvider";
import DashboardTopNavbar from "./_components/DashboardTopNavbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "block",
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardAuthProvider>
      <div
        className={`flex min-h-screen bg-gray-50 max-w-[100vw] ${poppins.className}`}
      >
        <SideNav />
        <div className="flex-grow overflow-x-hidden">
          <DashboardTopNavbar />
          <div className="px-4 py-14    ">{children}</div>
        </div>
      </div>
    </DashboardAuthProvider>
  );
}

export default Layout;
