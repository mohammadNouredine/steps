import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { cn } from "@/utils/cn";
import BlockFooter from "../BlockFooter";
import { isBetaEnv, isProdEnv } from "@/helpers/isDevEnv";
import UnderConstruction from "../../pages/UnderConstruction";

function LayoutWrapper({
  children,
  hasHeader = true,
  hasFooter = true,
  hasBlockFooter = false,
  paddingX = 5,
}: {
  children: React.ReactNode;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasBlockFooter?: boolean;
  paddingX?: number;
}) {
  console.log("NODE ENV", process.env.NEXT_PUBLIC_NODE_ENV);
  console.log("isProdEnv", isProdEnv);
  console.log("isBetaEnv", isBetaEnv);
  return (
    <div className={cn(hasFooter && !hasBlockFooter && "pb-20")}>
      {hasHeader && !isProdEnv && <Header />}
      <div
        className="py-4 "
        style={{
          paddingLeft: paddingX,
          paddingRight: paddingX,
        }}
      >
        {!isProdEnv ? children : <UnderConstruction />}
      </div>
      {hasBlockFooter && <BlockFooter />}
      <div className="mt-10" />

      {hasFooter && !isProdEnv && <Footer />}
    </div>
  );
}

export default LayoutWrapper;
