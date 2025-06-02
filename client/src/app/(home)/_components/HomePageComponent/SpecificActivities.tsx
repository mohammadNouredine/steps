"use client";
import React from "react";

interface SpecificActivity {
  id: number;
  title: string;
  image: string;
  description: string;
  purpose: string;
}

const specificActivities: SpecificActivity[] = [
  {
    id: 1,
    title: "أنشطة فنية",
    image: "/home/specific-activities/أنشطة فنية.jpg",
    description: "ورش عمل فنية متنوعة لجميع الأعمار",
    purpose: "تنمية المواهب والإبداع الفني",
  },
  {
    id: 2,
    title: "رحلات هادفة",
    image: "/home/specific-activities/رحلات هادفة.jpg",
    description: "تنظيم رحلات تعليمية وترفيهية",
    purpose: "تعزيز الروابط الاجتماعية والمعرفية",
  },
  {
    id: 3,
    title: "زراعة",
    image: "/home/specific-activities/زراعة.jpg",
    description: "أنشطة زراعية للأطفال والشباب",
    purpose: "تعلم الزراعة والمحافظة على البيئة",
  },
  {
    id: 4,
    title: "سباحة",
    image: "/home/specific-activities/سباحة.jpg",
    description: "دروس سباحة مميّزة",
    purpose: "تعلم السباحة والحفاظ على الصحة",
  },
  {
    id: 5,
    title: "شهادة",
    image: "/home/specific-activities/شهادة.jpg",
    description: "برامج تمنح شهادات معتمدة",
    purpose: "تطوير المهارات والحصول على شهادات رسمية",
  },
];

const SpecificActivities = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">برامج مميزة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specificActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="relative h-48">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-right">
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-800 mb-1">الهدف:</h4>
                  <p className="text-gray-600">{activity.purpose}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecificActivities;
