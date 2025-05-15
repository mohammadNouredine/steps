import LayoutWrapper from "@/components/common/layout/LayoutWrapper";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutWrapper>
      <div className="py-2">{children}</div>;
    </LayoutWrapper>
  );
}

export default Layout;
