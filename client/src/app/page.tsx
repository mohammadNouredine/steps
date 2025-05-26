"use client";
import LayoutWrapper from "../components/common/layout/LayoutWrapper";
import CTAShop from "./_components/CTAShop";
import WhatsappFloatingCTA from "./_components/WhatsappFloatingCTA";

export default function Home() {
  return (
    <div className="relative">
      <LayoutWrapper paddingX={0} hasBlockFooter>
        <div className="px-2">
          {/* <CTASale /> */}
          <CTAShop />
        </div>
        <WhatsappFloatingCTA />
      </LayoutWrapper>
    </div>
  );
}
