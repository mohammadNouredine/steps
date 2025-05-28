const TripsSection = () => {
  const trips = [
    {
      name: "Beach Adventure",
      description:
        "Sun, sand, and splash! Building sandcastles and beach games.",
      icon: "🏖️",
      highlight: "Swimming & Beach Sports",
    },
    {
      name: "Mountain Hiking",
      description: "Exploring nature trails and discovering local wildlife.",
      icon: "⛰️",
      highlight: "Nature Discovery",
    },
    {
      name: "Local Farm Visit",
      description:
        "Learning about agriculture and meeting friendly farm animals.",
      icon: "🚜",
      highlight: "Agricultural Learning",
    },
    {
      name: "Historical Sites",
      description: "Discovering Lebanon's rich history and cultural heritage.",
      icon: "🏛️",
      highlight: "Cultural Education",
    },
    {
      name: "Water Parks",
      description: "Thrilling water slides and swimming pool adventures.",
      icon: "🎢",
      highlight: "Aquatic Fun",
    },
    {
      name: "Science Museums",
      description: "Interactive exhibits and hands-on learning experiences.",
      icon: "🔬",
      highlight: "STEM Learning",
    },
    {
      name: "Local Markets",
      description: "Understanding commerce and local community life.",
      icon: "🛒",
      highlight: "Community Interaction",
    },
    {
      name: "Outdoor Camping",
      description: "Overnight adventures with storytelling and stargazing.",
      icon: "🏕️",
      highlight: "Adventure Skills",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Amazing <span className="text-brand-green">Trips</span> & Adventures
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Beyond our daily activities, we take children on exciting
            educational trips that broaden their horizons and create
            unforgettable memories.
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
              🗓️ Trip Schedule
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">
                  Weekly Local Trips
                </span>
                <span className="text-brand-green font-semibold">
                  Every Friday
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Beach Days</span>
                <span className="text-brand-yellow font-semibold">
                  Bi-weekly
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">
                  Special Excursions
                </span>
                <span className="text-brand-red font-semibold">Monthly</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">
                  Camping Adventures
                </span>
                <span className="text-brand-green font-semibold">Seasonal</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              🎒 What We Bring
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">🚌</span>
                <span className="text-gray-700">Safe transportation</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">🥙</span>
                <span className="text-gray-700">Healthy snacks & meals</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">👨‍⚕️</span>
                <span className="text-gray-700">First aid & medical care</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">📸</span>
                <span className="text-gray-700">Photo memories</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-green/10 to-brand-yellow/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {`"`}Adventure is the best way to learn{`"`}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our carefully planned trips are more than just fun outings – they
              {"'"}re educational experiences that teach children about their
              environment, culture, and community while building confidence and
              independence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripsSection;
