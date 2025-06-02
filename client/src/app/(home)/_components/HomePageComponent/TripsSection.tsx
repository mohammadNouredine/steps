const TripsSection = () => {
  const trips = [
    {
      name: "مغامرة الشاطئ",
      description: "شمس ورمل ومرح! بناء قصور الرمل وألعاب الشاطئ.",
      icon: "🏖️",
      highlight: "السباحة والرياضات الشاطئية",
    },
    {
      name: "تسلق الجبال",
      description: "استكشاف مسارات الطبيعة واكتشاف الحياة البرية المحلية.",
      icon: "⛰️",
      highlight: "اكتشاف الطبيعة",
    },
    {
      name: "زيارة المزرعة المحلية",
      description:
        "التعلم عن الزراعة والتعرف على الحيوانات الودودة في المزرعة.",
      icon: "🚜",
      highlight: "التعلم الزراعي",
    },
    {
      name: "المواقع التاريخية",
      description: "اكتشاف تاريخ لبنان الغني وتراثه الثقافي.",
      icon: "🏛️",
      highlight: "التعليم الثقافي",
    },
    {
      name: "حدائق المياه",
      description: "زحاليق مائية مثيرة ومغامرات حمامات السباحة.",
      icon: "🎢",
      highlight: "المرح المائي",
    },
    {
      name: "المتاحف العلمية",
      description: "معارض تفاعلية وتجارب تعليمية عملية.",
      icon: "🔬",
      highlight: "التعلم العلمي",
    },
    {
      name: "الأسواق المحلية",
      description: "فهم التجارة وحياة المجتمع المحلي.",
      icon: "🛒",
      highlight: "التفاعل المجتمعي",
    },
    {
      name: "التخييم الخارجي",
      description: "مغامرات ليلية مع سرد القصص ومراقبة النجوم.",
      icon: "🏕️",
      highlight: "مهارات المغامرة",
    },
  ];

  return (
    <section
      className="py-16 bg-gradient-to-br from-blue-50 to-white"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-brand-green">رحلات</span> ومغامرات رائعة
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            إلى جانب أنشطتنا اليومية، نأخذ الأطفال في رحلات تعليمية مثيرة توسع
            آفاقهم وتخلق ذكريات لا تُنسى.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trips.map((trip, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                  {trip.icon}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {trip.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {trip.description}
                </p>

                <div className="bg-brand-green/10 text-brand-green text-xs font-medium px-3 py-1 rounded-full">
                  {trip.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              🗓️ جدول الرحلات
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">
                  رحلات محلية أسبوعية
                </span>
                <span className="text-brand-green font-semibold">كل جمعة</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">أيام الشاطئ</span>
                <span className="text-brand-yellow font-semibold">
                  كل أسبوعين
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">رحلات خاصة</span>
                <span className="text-brand-red font-semibold">شهرياً</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">
                  مغامرات التخييم
                </span>
                <span className="text-brand-green font-semibold">موسمية</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              🎒 ما نقدمه
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">🚌</span>
                <span className="text-gray-700">مواصلات آمنة</span>
              </div>
              <div className="flex items-center gap-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">🥙</span>
                <span className="text-gray-700">وجبات خفيفة صحية</span>
              </div>
              <div className="flex items-center gap-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">👨‍⚕️</span>
                <span className="text-gray-700">
                  الإسعافات الأولية والرعاية الطبية
                </span>
              </div>
              <div className="flex items-center gap-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">📸</span>
                <span className="text-gray-700">ذكريات مصورة</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-green/10 to-brand-yellow/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {`"`}المغامرة هي أفضل طريقة للتعلم{`"`}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              رحلاتنا المخطط لها بعناية هي أكثر من مجرد رحلات ترفيهية - إنها
              تجارب تعليمية تعلم الأطفال عن بيئتهم وثقافتهم ومجتمعهم مع بناء
              الثقة والاستقلالية.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripsSection;
