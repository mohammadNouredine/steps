import LayoutWrapper from "@/components/common/layout/LayoutWrapper";
import React from "react";
import Reviews from "./Reviews";

function AboutUsPageComponent() {
  return (
    <LayoutWrapper>
      <div className="min-h-[60vh]">
        <div>
          <h1>مرحباً بكم في مكتبة زيتونة</h1>
          <h4>رحلتكم نحو عالم معرفي مشوق لأطفالكم</h4>
        </div>

        <div>
          <h2>عن مكتبتنا</h2>
          <h4>تعرّفوا على مكتبتنا ومهمتنا</h4>
          <p>
            في مكتبة زيتونة، نهدف إلى تقديم بيئة تعليمية غنية ومحفزة للأطفال.
            نوفر مكاناً آمناً ومريحاً يشجع الأطفال على الاستكشاف والتعلم من خلال
            القراءة والأنشطة التعليمية. تأسست مكتبتنا عام 2010 برؤية لجعل التعلم
            متعة لا تنتهي لكل طفل يزورنا
          </p>
        </div>

        <Reviews />
      </div>
    </LayoutWrapper>
  );
}

export default AboutUsPageComponent;
