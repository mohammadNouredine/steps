import React from "react";
import LayoutWrapper from "../../components/common/layout/LayoutWrapper";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LayoutWrapper>{children}</LayoutWrapper>
    </div>
  );
}

export default Layout;
