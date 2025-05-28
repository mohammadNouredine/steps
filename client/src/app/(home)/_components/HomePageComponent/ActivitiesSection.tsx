const ActivitiesSection = () => {
  const activities = [
    {
      name: "Swimming",
      description: "Professional swimming lessons for all skill levels",
      icon: "🏊‍♂️",
      color: "brand-green",
    },
    {
      name: "Religious Lessons",
      description: "Spiritual growth and moral values education",
      icon: "📿",
      color: "brand-yellow",
    },
    {
      name: "Reading Sessions",
      description: "Building literacy and love for books",
      icon: "📚",
      color: "brand-red",
    },
    {
      name: "Kitchen Activities",
      description: "Cooking skills and healthy eating habits",
      icon: "👨‍🍳",
      color: "brand-green",
    },
    {
      name: "Sports & Games",
      description: "Team sports and physical fitness activities",
      icon: "⚽",
      color: "brand-yellow",
    },
    {
      name: "Arts & Crafts",
      description: "Creative expression through various art forms",
      icon: "🎨",
      color: "brand-red",
    },
    {
      name: "Nature Exploration",
      description: "Outdoor adventures and environmental learning",
      icon: "🌿",
      color: "brand-green",
    },

    {
      name: "Science Experiments",
      description: "Fun hands-on learning experiences",
      icon: "🔬",
      color: "brand-red",
    },
    {
      name: "Team Building",
      description: "Collaborative games and trust exercises",
      icon: "🤝",
      color: "brand-green",
    },
    {
      name: "Drama & Theater",
      description: "Performance arts and confidence building",
      icon: "🎭",
      color: "brand-yellow",
    },
    {
      name: "Adventure Challenges",
      description: "Safe obstacle courses and problem solving",
      icon: "🏃‍♂️",
      color: "brand-red",
    },
  ];

  return (
    <section
      id="activities"
      className="py-16 bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Exciting <span className="text-brand-green">Activities</span> Await
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From swimming and sports to arts and sciences, our diverse activity
            program ensures every child finds their passion and develops new
            skills.
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

        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Daily Schedule Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h4 className="font-semibold text-brand-green">
                  Morning (9:00 - 12:00)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Swimming Lessons</li>
                  <li>• Sports Activities</li>
                  <li>• Team Building</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-brand-yellow">
                  Afternoon (1:00 - 4:00)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Arts & Crafts</li>
                  <li>• Reading Sessions</li>
                  <li>• Science Fun</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-brand-red">
                  Evening (4:00 - 6:00)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Music & Dance</li>
                  <li>• Free Play</li>
                  <li>• Reflection Time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
