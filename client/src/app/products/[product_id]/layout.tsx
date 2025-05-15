"use client";
import React from "react";
import LayoutWrapper from "../../../components/common/layout/LayoutWrapper";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LayoutWrapper paddingX={0} hasHeader={false} hasFooter={false}>
        {children}
      </LayoutWrapper>
    </div>
  );
}

export default Layout;
