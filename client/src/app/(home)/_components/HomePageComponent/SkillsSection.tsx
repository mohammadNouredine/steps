const SkillsSection = () => {
  const skills = [
    {
      category: "Physical Development",
      skills: [
        { name: "Swimming Proficiency", icon: "🏊‍♂️" },
        { name: "Physical Fitness", icon: "💪" },
        { name: "Coordination", icon: "🤸‍♂️" },
        { name: "Balance & Agility", icon: "⚖️" },
      ],
      color: "brand-green",
    },
    {
      category: "Social & Emotional",
      skills: [
        { name: "Teamwork", icon: "🤝" },
        { name: "Communication", icon: "💬" },
        { name: "Empathy", icon: "❤️" },
        { name: "Leadership", icon: "👑" },
      ],
      color: "brand-yellow",
    },
    {
      category: "Cognitive & Creative",
      skills: [
        { name: "Problem Solving", icon: "🧩" },
        { name: "Creativity", icon: "🎨" },
        { name: "Critical Thinking", icon: "🧠" },
        { name: "Innovation", icon: "💡" },
      ],
      color: "brand-red",
    },
    {
      category: "Life Skills",
      skills: [
        { name: "Independence", icon: "🎯" },
        { name: "Time Management", icon: "⏰" },
        { name: "Responsibility", icon: "✅" },
        { name: "Adaptability", icon: "🔄" },
      ],
      color: "brand-green",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-brand-green">Skills & Abilities</span> We
            Develop
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive program focuses on developing essential life
            skills that will benefit children throughout their lives, preparing
            them for future success.
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
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
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
              Building Tomorrow's Leaders Today
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every activity at Leading Steps is designed with purpose. We don't
              just keep children busy – we actively work to develop skills that
              will serve them throughout their educational journey and into
              adulthood. From the confidence gained through swimming to the
              creativity fostered in arts and crafts, every moment is a step
              toward their bright future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
