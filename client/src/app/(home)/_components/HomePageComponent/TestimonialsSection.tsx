import { FaStar } from "react-icons/fa6";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Leading Steps transformed my daughter's summer! She learned to swim, made wonderful friends, and gained so much confidence. The staff is incredibly caring and professional.",
      author: "Sarah M.",
      role: "Parent of Layla (8 years old)",
      icon: "👩",
      rating: 5,
    },
    {
      quote:
        "My son used to be shy and hesitant about new activities. After just two weeks at Leading Steps, he was leading group activities and had made several close friends. Amazing transformation!",
      author: "Ahmad K.",
      role: "Parent of Omar (10 years old)",
      icon: "👨",
      rating: 5,
    },
    {
      quote:
        "The variety of activities keeps the kids engaged every single day. From swimming to arts and crafts, there's something for every child's interests. Highly recommend!",
      author: "Fatima H.",
      role: "Parent of Zara (7 years old)",
      icon: "👩",
      rating: 5,
    },
    {
      quote:
        "I love going to Leading Steps! I learned how to swim, made lots of friends, and we go on the coolest trips. The teachers are super nice and help us with everything!",
      author: "Karim A.",
      role: "Camper (9 years old)",
      icon: "👦",
      rating: 5,
    },
    {
      quote:
        "As a working parent, I needed a safe place for my kids during summer. Leading Steps exceeded all expectations. The kids learn, play, and grow in the best environment.",
      author: "Nadia R.",
      role: "Parent of twins (6 years old)",
      icon: "👩",
      rating: 5,
    },
    {
      quote:
        "The camp helped my daughter overcome her fear of water. Now she's a confident swimmer! The step-by-step approach and patience of the instructors made all the difference.",
      author: "Hassan B.",
      role: "Parent of Maya (11 years old)",
      icon: "👨",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What <span className="text-brand-green">Families</span> Say About Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it – hear from the parents and children
            who have experienced the Leading Steps difference firsthand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">{testimonial.icon}</div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="w-4 h-4 fill-brand-yellow text-brand-yellow"
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-gray-700 leading-relaxed mb-4 italic">
                "{testimonial.quote}"
              </blockquote>

              <div className="border-t border-gray-200 pt-4">
                <div className="font-semibold text-gray-900">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center p-6 bg-brand-green/10 rounded-xl">
            <div className="text-3xl font-bold text-brand-green mb-2">98%</div>
            <div className="text-gray-700 font-medium">Parent Satisfaction</div>
            <div className="text-sm text-gray-600">
              Would recommend to others
            </div>
          </div>

          <div className="text-center p-6 bg-brand-yellow/10 rounded-xl">
            <div className="text-3xl font-bold text-brand-yellow mb-2">95%</div>
            <div className="text-gray-700 font-medium">Return Rate</div>
            <div className="text-sm text-gray-600">Kids return next summer</div>
          </div>

          <div className="text-center p-6 bg-brand-red/10 rounded-xl">
            <div className="text-3xl font-bold text-brand-red mb-2">100%</div>
            <div className="text-gray-700 font-medium">Safety Record</div>
            <div className="text-sm text-gray-600">Zero incidents reported</div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-green/10 via-brand-yellow/10 to-brand-red/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Growing Family of Happy Campers!
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Every testimonial represents a child who took their leading steps
              toward growth, confidence, and joy. We're honored to be part of
              their journey and excited to welcome your child to our camp
              family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
