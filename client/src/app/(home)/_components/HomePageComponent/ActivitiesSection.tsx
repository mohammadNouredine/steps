const ActivitiesSection = () => {
  const activities = [
    {
      name: "السباحة",
      description: "دروس سباحة احترافية لجميع المستويات",
      icon: "🏊‍♂️",
      color: "brand-green",
    },
    {
      name: "الدروس الدينية",
      description: "نمو روحي وتعليم القيم الأخلاقية",
      icon: "📿",
      color: "brand-yellow",
    },
    {
      name: "جلسات القراءة",
      description: "بناء مهارات القراءة وحب الكتب",
      icon: "📚",
      color: "brand-red",
    },
    {
      name: "أنشطة المطبخ",
      description: "مهارات الطبخ وعادات الأكل الصحية",
      icon: "👨‍🍳",
      color: "brand-green",
    },
    {
      name: "الرياضة والألعاب",
      description: "رياضات جماعية وأنشطة اللياقة البدنية",
      icon: "⚽",
      color: "brand-yellow",
    },
    {
      name: "الفنون والحرف",
      description: "تعبير إبداعي من خلال أشكال فنية متنوعة",
      icon: "🎨",
      color: "brand-red",
    },
    {
      name: "استكشاف الطبيعة",
      description: "مغامرات خارجية وتعلم بيئي",
      icon: "🌿",
      color: "brand-green",
    },
    {
      name: "تجارب علمية",
      description: "تجارب تعليمية عملية ممتعة",
      icon: "🔬",
      color: "brand-red",
    },
    {
      name: "بناء الفريق",
      description: "ألعاب تعاونية وتمارين بناء الثقة",
      icon: "🤝",
      color: "brand-green",
    },
    {
      name: "المسرح والدراما",
      description: "فنون الأداء وبناء الثقة",
      icon: "🎭",
      color: "brand-yellow",
    },
    {
      name: "تحديات المغامرة",
      description: "مسارات عقبات آمنة وحل المشكلات",
      icon: "🏃‍♂️",
      color: "brand-red",
    },
  ];

  return (
    <section
      id="activities"
      className="py-16 bg-gradient-to-br from-blue-50 to-white"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-brand-green">أنشطة</span> مثيرة تنتظركم
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            من السباحة والرياضة إلى الفنون والعلوم، برنامجنا المتنوع يضمن لكل
            طفل أن يجد شغفه ويطور مهارات جديدة.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                  {activity.icon}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {activity.name}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {activity.description}
                </p>

                <div
                  className={`mt-4 w-full h-1 rounded-full ${
                    activity.color === "brand-green"
                      ? "bg-brand-green"
                      : activity.color === "brand-yellow"
                      ? "bg-brand-yellow"
                      : "bg-brand-red"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              أبرز الجدول اليومي
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-right">
              <div className="space-y-2">
                <h4 className="font-semibold text-brand-green">
                  الصباح (9:00 - 12:00)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• دروس السباحة</li>
                  <li>• الأنشطة الرياضية</li>
                  <li>• بناء الفريق</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-brand-yellow">
                  بعد الظهر (1:00 - 4:00)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• الفنون والحرف</li>
                  <li>• جلسات القراءة</li>
                  <li>• متعة العلوم</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-brand-red">
                  المساء (4:00 - 6:00)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• الموسيقى والرقص</li>
                  <li>• اللعب الحر</li>
                  <li>• وقت التأمل</li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ActivitiesSection;
