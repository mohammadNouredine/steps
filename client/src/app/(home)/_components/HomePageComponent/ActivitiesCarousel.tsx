"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Activity {
  id: number;
  title: string;
  image: string;
  description: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "جلسة صباحيّة",
    image: "/home/activities/act1.jpg",
    description: "ابدأ يومك بالتأمل الروحي",
  },
  {
    id: 2,
    title: "أنشطة عاشورائيّة",
    image: "/home/activities/act2.jpg",
    description: "أنشطة عاشورائيّة مختلفة",
  },
  {
    id: 3,
    title: "أنشطة فنّيّة",
    image: "/home/activities/act3.jpg",
    description: "أنشطة فنية مختلفة",
  },
  {
    id: 4,
    title: "نشاط فنّي",
    image: "/home/activities/act4.jpg",
    description: "ممارسة الفنّ للحفاظ على الإبداع",
  },
  {
    id: 5,
    title: "ورشة عمل زراعيّة",
    image: "/home/activities/act5.jpg",
    description: "تطوير المهارات الزراعية",
  },
  {
    id: 6,
    title: "أنشطة سباحة",
    image: "/home/activities/act6.jpg",
    description: "تعلم السباحة و ممارستها",
  },
];

const ActivitiesCarousel = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">أنشطة منوّعة</h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="max-w-4xl mx-auto"
        >
          {activities.map((activity) => (
            <SwiperSlide key={activity.id}>
              <div className="p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-right">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 text-right">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ActivitiesCarousel;
