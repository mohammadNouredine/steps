import { Check } from "lucide-react";

const GoalsSection = () => {
  const goals = [
    {
      title: "تحسين القدرات البدنية للأطفال",
      description:
        "من خلال السباحة والرياضة والأنشطة الخارجية التي تبني القوة والتنسيق والعادات الصحية",
      icon: "🏊‍♂️",
    },
    {
      title: "تعزيز المهارات التعليمية",
      description:
        "جلسات القراءة وورش العمل الإبداعية والأنشطة التعليمية التي تحفز الفضول والمعرفة",
      icon: "📚",
    },
    {
      title: "تطوير المهارات الاجتماعية",
      description:
        "أنشطة الفريق والمشاريع الجماعية وتجارب بناء الصداقات التي تعلم التعاون",
      icon: "🤝",
    },
    {
      title: "تعزيز التعبير الإبداعي",
      description:
        "الفن والموسيقى واللعب الخيالي الذي يشجع على التعبير عن الذات والتفكير المبتكر",
      icon: "🎨",
    },
    {
      title: "بناء الثقة والقيادة",
      description:
        "فرص للقيادة واتخاذ القرارات والتغلب على التحديات التي تبني الثقة بالنفس",
      icon: "⭐",
    },
    {
      title: "تعزيز التطور التعليمي الشامل",
      description: "نمو شامل من خلال تجارب متنوعة تعد الأطفال للنجاح المستقبلي",
      icon: "🌱",
    },
  ];

  return (
    <section id="about" className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-brand-green">أهدافنا</span> ورسالتنا
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            في خطوات رائدة، نؤمن بأن كل طفل يستحق الفرصة للنمو والتعلم
            والازدهار. نهجنا الشامل يركز على تطوير الطفل بشكل كامل.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:border-brand-green/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-x-4">
                <div className="text-3xl mb-4 group-hover:animate-bounce-gentle">
                  {goal.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-x-3 mb-3">
                    <Check className="w-5 h-5 text-brand-green mt-1 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {goal.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-brand-green/10 via-brand-yellow/10 to-brand-red/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {`"`}كل طفل يخطو خطواته الرائدة نحو العظمة{`"`}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              مهمتنا هي توفير بيئة آمنة ورعاية حيث يمكن للأطفال استكشاف وتعلم
              والنمو ليصبحوا أفراداً واثقين وقادرين على مواجهة تحديات الحياة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
