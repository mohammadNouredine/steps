import { Check, Calendar, Clock } from "lucide-react";
import { Button } from "./Button";

const SubscriptionsSection = () => {
  const subscriptions = [
    {
      type: "Daily Pass",
      duration: "Per Day",
      description: "Perfect for trying out our camp or flexible scheduling",
      features: [
        "Full day of activities (9 AM - 6 PM)",
        "Swimming lessons included",
        "Healthy lunch and snacks",
        "All materials provided",
        "Professional supervision",
        "End-of-day progress report",
      ],
      highlight: "Flexible",
      color: "brand-yellow",
      icon: "☀️",
      popular: false,
    },
    {
      type: "Monthly Program",
      duration: "Per Month",
      description:
        "The complete Leading Steps experience with maximum benefits",
      features: [
        "All daily activities included",
        "Weekly trips and excursions",
        "Progress tracking and reports",
        "Special events and celebrations",
        "Swimming certification program",
        "End-of-month showcase event",
        "Priority booking for next season",
        "Photo album of memories",
      ],
      highlight: "Best Value",
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
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-brand-green">Adventure</span> Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you're looking for a flexible daily experience or the
            complete summer camp journey, we have the perfect plan for your
            child.
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
                    Most Popular
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
                  <div
                    key={featureIndex}
                    className="flex items-start space-x-3"
                  >
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
                Get Started with {subscription.type}
              </Button>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <Calendar className="w-8 h-8 text-brand-green mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">
              Flexible Scheduling
            </h4>
            <p className="text-sm text-gray-600">
              Choose daily or monthly options based on your family's needs and
              schedule.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <Clock className="w-8 h-8 text-brand-yellow mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Extended Hours</h4>
            <p className="text-sm text-gray-600">
              Full day coverage from 9 AM to 6 PM, perfect for working parents.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <Check className="w-8 h-8 text-brand-red mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">All-Inclusive</h4>
            <p className="text-sm text-gray-600">
              Everything included - meals, materials, trips, and professional
              supervision.
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-green/10 to-brand-yellow/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🎯 Ready to Begin the Journey?
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Join Leading Steps today and give your child an unforgettable
              summer filled with learning, growth, and endless fun. Contact us
              to discuss which program is perfect for your family.
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-brand-green hover:bg-brand-green-neutral text-white px-8 py-3"
            >
              Contact Us for Enrollment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionsSection;
