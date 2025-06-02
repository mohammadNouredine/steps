import { Check, Calendar, Clock } from "lucide-react";
import { Button } from "./Button";

const SubscriptionsSection = () => {
  const subscriptions = [
    {
      type: "تذكرة يومية",
      duration: "لليوم الواحد",
      description: "مثالية لتجربة المعسكر أو للجدولة المرنة",
      features: [
        "يوم كامل من الأنشطة (9 صباحاً - 6 مساءً)",
        "دروس السباحة مشمولة",
        "غداء ووجبات خفيفة صحية",
        "جميع المواد متوفرة",
        "إشراف احترافي",
        "تقرير تقدم في نهاية اليوم",
      ],
      highlight: "مرن",
      color: "brand-yellow",
      icon: "☀️",
      popular: false,
    },
    {
      type: "برنامج شهري",
      duration: "شهرياً",
      description: "تجربة خطوات رائدة الكاملة مع أقصى الفوائد",
      features: [
        "جميع الأنشطة اليومية مشمولة",
        "رحلات ونزهات أسبوعية",
        "تتبع التقدم والتقارير",
        "فعاليات واحتفالات خاصة",
        "برنامج شهادات السباحة",
        "فعالية عرض في نهاية الشهر",
        "حجز مسبق للموسم القادم",
        "ألبوم صور للذكريات",
      ],
      highlight: "أفضل قيمة",
      color: "brand-green",
      icon: "🌟",
      popular: true,
    },
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="subscriptions"
      className="py-16 bg-gradient-to-br from-blue-50 to-white"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            اختر خطة <span className="text-brand-green">المغامرة</span> الخاصة
            بك
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            سواء كنت تبحث عن تجربة يومية مرنة أو رحلة معسكر صيفي كاملة، لدينا
            الخطة المثالية لطفلك.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {subscriptions.map((subscription, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                subscription.popular ? "border-brand-green" : "border-gray-100"
              }`}
            >
              {subscription.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-green text-white px-6 py-2 rounded-full text-sm font-semibold">
                    الأكثر شعبية
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{subscription.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {subscription.type}
                </h3>
                <div
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white mb-4 ${
                    subscription.color === "brand-green"
                      ? "bg-brand-green"
                      : "bg-brand-yellow"
                  }`}
                >
                  {subscription.highlight}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {subscription.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {subscription.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-x-3">
                    <Check className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                onClick={scrollToContact}
                className={`w-full py-3 ${
                  subscription.popular
                    ? "bg-brand-green hover:bg-brand-green-neutral text-white"
                    : "bg-brand-yellow hover:bg-brand-yellow-neutral text-white"
                }`}
              >
                ابدأ مع {subscription.type}
              </Button>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <Calendar className="w-8 h-8 text-brand-green mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">جدولة مرنة</h4>
            <p className="text-sm text-gray-600">
              اختر خيارات يومية أو شهرية بناءً على احتياجات عائلتك وجدولك.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <Clock className="w-8 h-8 text-brand-yellow mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">ساعات ممتدة</h4>
            <p className="text-sm text-gray-600">
              تغطية يوم كامل من 9 صباحاً حتى 6 مساءً، مثالية للآباء العاملين.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <Check className="w-8 h-8 text-brand-red mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">شامل</h4>
            <p className="text-sm text-gray-600">
              كل شيء مشمول - الوجبات، المواد، الرحلات، والإشراف الاحترافي.
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-green/10 to-brand-yellow/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🎯 هل أنت مستعد لبدء الرحلة؟
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              انضم إلى خطوات رائدة اليوم وامنح طفلك صيفاً لا يُنسى مليئاً
              بالتعلم والنمو والمرح اللامتناهي. اتصل بنا لمناقشة البرنامج
              المثالي لعائلتك.
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-brand-green hover:bg-brand-green-neutral text-white px-8 py-3"
            >
              اتصل بنا للتسجيل
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionsSection;
