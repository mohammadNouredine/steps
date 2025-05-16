"use client";
import useIsAuthenticated from "@/api/api-hooks/auth/useIsAuthenticated";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import { useRouter } from "next/navigation";
import React from "react";

function DashboardAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isPending, isAuthenticated } = useIsAuthenticated();
  const router = useRouter();
  //loading
  if (isPending) return <LoadingScreen />;

  //not user
  if (!isAuthenticated) {
    router.push("/auth");
    return;
  }

  //user but not admin
  if (user && !(user.role === "admin" || user.role === "super_admin"))
    return <div>YOU DONT HAVE PERMISSIONS TO ACCESS THIS PAGE </div>;

  //user and admin
  return <>{children}</>;
}

export default DashboardAuthProvider;
