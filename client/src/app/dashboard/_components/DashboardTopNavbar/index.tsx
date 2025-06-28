"use client";
import useIsAuthenticated from "@/api/api-hooks/auth/useIsAuthenticated";
import BurgerMenu from "@/components/common/layout/Header/BurgerMenu";
import { useLogoutUser } from "@/hooks/useLogoutUser";
import { useMenuStore } from "@/store/dashboardStore/useMenuStore";
import React from "react";

function DashboardTopNavbar() {
  const logout = useLogoutUser();
  const { isOpen, setIsOpen } = useMenuStore();
  const { user } = useIsAuthenticated();
  return (
    <div className="w-full flex justify-between  px-2 py-4 bg-white border-b border-gray-200">
      <>
        <button
          className="block lg:hidden"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <BurgerMenu isOpen={isOpen} />
        </button>
        <div className=" hidden lg:block"></div>
      </>
      <img
        src="/brand/images/logo.png"
        alt="logo"
        className="h-9 -translate-y-1"
      />
      <div className="flex items-center gap-2">
        <p>{user?.username}</p>
        <button
          onClick={() => {
            logout();
          }}
          className="bg-primary px-2 py-2 rounded-lg text-white "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardTopNavbar;
