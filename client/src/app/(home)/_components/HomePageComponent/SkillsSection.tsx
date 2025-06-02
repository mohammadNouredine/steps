const SkillsSection = () => {
  const skills = [
    {
      category: "التطور البدني",
      skills: [
        { name: "إتقان السباحة", icon: "🏊‍♂️" },
        { name: "اللياقة البدنية", icon: "💪" },
        { name: "التنسيق", icon: "🤸‍♂️" },
        { name: "التوازن والرشاقة", icon: "⚖️" },
      ],
      color: "brand-green",
    },
    {
      category: "المهارات الاجتماعية والعاطفية",
      skills: [
        { name: "العمل الجماعي", icon: "🤝" },
        { name: "التواصل", icon: "💬" },
        { name: "التعاطف", icon: "❤️" },
        { name: "القيادة", icon: "👑" },
      ],
      color: "brand-yellow",
    },
    {
      category: "المهارات المعرفية والإبداعية",
      skills: [
        { name: "حل المشكلات", icon: "🧩" },
        { name: "الإبداع", icon: "🎨" },
        { name: "التفكير النقدي", icon: "🧠" },
        { name: "الابتكار", icon: "💡" },
      ],
      color: "brand-red",
    },
    {
      category: "مهارات الحياة",
      skills: [
        { name: "الاستقلالية", icon: "🎯" },
        { name: "إدارة الوقت", icon: "⏰" },
        { name: "المسؤولية", icon: "✅" },
        { name: "التكيف", icon: "🔄" },
      ],
      color: "brand-green",
    },
  ];

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-brand-green">المهارات والقدرات</span> التي
            نطورها
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            يركز برنامجنا الشامل على تطوير مهارات الحياة الأساسية التي ستفيد
            الأطفال طوال حياتهم، مما يعدهم للنجاح المستقبلي.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`text-center mb-6`}>
                <div
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white mb-4 ${
                    category.color === "brand-green"
                      ? "bg-brand-green"
                      : category.color === "brand-yellow"
                      ? "bg-brand-yellow"
                      : "bg-brand-red"
                  }`}
                >
                  {category.category}
                </div>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center gap-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="bg-gradient-to-r from-brand-green/10 via-brand-yellow/10 to-brand-red/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              بناء قادة الغد اليوم
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              كل نشاط في خطوات رائدة مصمم لغرض محدد. نحن لا نجعل الأطفال مشغولين
              فقط - بل نعمل بنشاط على تطوير المهارات التي ستخدمهم طوال رحلة
              تعليمهم وحتى مرحلة البلوغ. من الثقة المكتسبة من خلال السباحة إلى
              الإبداع الذي يتم تنميته في الفنون والحرف، كل لحظة هي خطوة نحو
              مستقبلهم المشرق.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
