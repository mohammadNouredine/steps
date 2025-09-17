import { Calendar, Users } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "النادي الصيفي",
      description:
        "برنامج صيفي متكامل مليء بالأنشطة المتنوعة والمرح للأطفال من جميع الأعمار",
      icon: "🏖️",
      features: [
        "أنشطة رياضية ومائية",
        "ورش فنية وإبداعية",
        "رحلات ترفيهية",
        "تعلم مهارات جديدة",
      ],
      color: "brand-yellow",
      iconComponent: Calendar,
    },
    {
      title: "الصف الشتوي للأطفال من 3-5 سنوات",
      description:
        "برنامج تعليمي مخصص للأطفال الصغار يركز على التطوير الشامل والتعلم التفاعلي",
      icon: "❄️",
      features: [
        "تطوير المهارات الحركية",
        "أنشطة تعليمية تفاعلية",
        "تعزيز المهارات الاجتماعية",
        "بيئة آمنة ومحفزة",
      ],
      color: "brand-green",
      iconComponent: Users,
    },
  ];

  return (
    <section
      className="py-16 bg-gradient-to-br from-gray-50 to-white"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-brand-green">خدمات</span> نقدمها
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            نقدم برامج متخصصة تلبي احتياجات الأطفال في مختلف المراحل العمرية
            والمواسم
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.iconComponent;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group border border-gray-100"
              >
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-x-4 mb-4">
                    <div className="text-5xl group-hover:animate-bounce-gentle">
                      {service.icon}
                    </div>
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        service.color === "brand-green"
                          ? "bg-brand-green/10"
                          : "bg-brand-yellow/10"
                      }`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${
                          service.color === "brand-green"
                            ? "text-brand-green"
                            : "text-brand-yellow"
                        }`}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-x-3"
                    >
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          service.color === "brand-green"
                            ? "bg-brand-green"
                            : "bg-brand-yellow"
                        }`}
                      ></div>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-6 w-full h-1 rounded-full ${
                    service.color === "brand-green"
                      ? "bg-gradient-to-r from-brand-green/30 to-brand-green"
                      : "bg-gradient-to-r from-brand-yellow/30 to-brand-yellow"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-brand-green/10 via-brand-yellow/10 to-brand-red/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {`"`}نؤمن بأن كل طفل يستحق أفضل بداية في الحياة{`"`}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              خدماتنا مصممة لتوفير بيئة تعليمية محفزة وآمنة تساعد الأطفال على
              النمو والتطور بطريقة صحية وسعيدة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
