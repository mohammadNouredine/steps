import { Check } from "lucide-react";

const GoalsSection = () => {
  const goals = [
    {
      title: "Improve Kids' Physical Abilities",
      description:
        "Through swimming, sports, and outdoor activities that build strength, coordination, and healthy habits",
      icon: "🏊‍♂️",
    },
    {
      title: "Enhance Educational Skills",
      description:
        "Reading sessions, creative workshops, and learning activities that stimulate curiosity and knowledge",
      icon: "📚",
    },
    {
      title: "Develop Social Skills",
      description:
        "Team activities, group projects, and friendship-building experiences that teach cooperation",
      icon: "🤝",
    },
    {
      title: "Foster Creative Expression",
      description:
        "Art, music, and imaginative play that encourages self-expression and innovative thinking",
      icon: "🎨",
    },
    {
      title: "Build Confidence & Leadership",
      description:
        "Opportunities to lead, make decisions, and overcome challenges that build self-esteem",
      icon: "⭐",
    },
    {
      title: "Promote Overall Learning Development",
      description:
        "Holistic growth through diverse experiences that prepare children for future success",
      icon: "🌱",
    },
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-brand-green">Goals</span> & Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Leading Steps, we believe every child deserves the opportunity to
            grow, learn, and thrive. Our comprehensive approach focuses on
            developing the whole child.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:border-brand-green/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl mb-4 group-hover:animate-bounce-gentle">
                  {goal.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start space-x-3 mb-3">
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
              {`"`}Every child takes their own leading steps towards greatness
              {`"`}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our mission is to provide a safe, nurturing environment where
              children can explore, learn, and grow into confident, capable
              individuals ready to take on life{"'"}s challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
