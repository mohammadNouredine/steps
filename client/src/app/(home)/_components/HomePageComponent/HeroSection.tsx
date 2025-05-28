import { Star, Users, Calendar } from "lucide-react";
import { Button } from "./Button";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-brand-green-light/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-brand-green">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm font-medium">
                  Premium Summer Experience
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Take Your{" "}
                <span className="text-brand-green">Leading Steps</span> This
                Summer
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Join our vibrant summer camp in Arabsalim, Lebanon, where
                children develop essential life skills, make lasting
                friendships, and create unforgettable memories through engaging
                activities and expert guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToContact}
                className="bg-brand-green hover:bg-brand-green-neutral text-white px-8 py-3"
              >
                Enroll Your Child
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-8 py-3"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-brand-green" />
                <span className="text-sm text-gray-600">
                  100+ Happy Campers
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-brand-green" />
                <span className="text-sm text-gray-600">
                  4 Years Experience
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-yellow to-brand-yellow-neutral rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">🏕️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Summer 2024
                </h3>
                <p className="text-gray-600">
                  An amazing journey of growth, learning, and fun awaits your
                  child!
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-green">4</div>
                    <div className="text-sm text-gray-600">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-yellow">
                      100+
                    </div>
                    <div className="text-sm text-gray-600">Kids</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-red">14+</div>
                    <div className="text-sm text-gray-600">Swimmers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-yellow/20 rounded-full animate-bounce-gentle"></div>
            <div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-brand-red/20 rounded-full animate-bounce-gentle"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
