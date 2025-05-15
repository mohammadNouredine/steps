import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="px-2">{children}</div>;
}

export default Layout;
