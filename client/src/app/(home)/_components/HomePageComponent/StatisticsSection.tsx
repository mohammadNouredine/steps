import { Users, Calendar, Star, Clock } from "lucide-react";

const StatisticsSection = () => {
  const stats = [
    {
      icon: Calendar,
      number: "4",
      label: "سنوات من العمل",
      description: "ملتزمون بنمو الأطفال",
      color: "brand-green",
    },
    {
      icon: Users,
      number: "100+",
      label: "طفل شارك",
      description: "أطفال سعداء وأكثر",
      color: "brand-yellow",
    },
    {
      icon: Star,
      number: "14+",
      label: "طفل تعلم السباحة",
      description: "بناء الثقة في الماء",
      color: "brand-red",
    },
    {
      icon: Clock,
      number: "1000+",
      label: "ساعة من المرح",
      description: "تجارب لا تُنسى",
      color: "brand-green",
    },
  ];

  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-brand-green">تأثيرنا</span> بالأرقام
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            شاهد كيف أحدثت خطوات رائدة فرقاً في حياة الأطفال على مر السنين
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    stat.color === "brand-green"
                      ? "bg-brand-green/10"
                      : stat.color === "brand-yellow"
                      ? "bg-brand-yellow/10"
                      : "bg-brand-red/10"
                  }`}
                >
                  <IconComponent
                    className={`w-8 h-8 ${
                      stat.color === "brand-green"
                        ? "text-brand-green"
                        : stat.color === "brand-yellow"
                        ? "text-brand-yellow"
                        : "text-brand-red"
                    }`}
                  />
                </div>

                <div
                  className={`text-4xl font-bold mb-2 ${
                    stat.color === "brand-green"
                      ? "text-brand-green"
                      : stat.color === "brand-yellow"
                      ? "text-brand-yellow"
                      : "text-brand-red"
                  }`}
                >
                  {stat.number}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>

                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
