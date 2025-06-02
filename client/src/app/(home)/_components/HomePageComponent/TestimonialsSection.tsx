import { FaStar } from "react-icons/fa6";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "خطوات رائدة غيرت صيف ابنتي! تعلمت السباحة، وأقامت صداقات رائعة، واكتسبت الكثير من الثقة. الموظفون يهتمون بشكل لا يصدق ومهنيون.",
      author: "سارة م.",
      role: "والدة ليلى (8 سنوات)",
      icon: "👩",
      rating: 5,
    },
    {
      quote:
        "كان ابني خجولاً ومتردداً في الأنشطة الجديدة. بعد أسبوعين فقط في خطوات رائدة، كان يقود الأنشطة الجماعية وأقام العديد من الصداقات الوثيقة. تحول مذهل!",
      author: "أحمد ك.",
      role: "والد عمر (10 سنوات)",
      icon: "👨",
      rating: 5,
    },
    {
      quote:
        "تنوع الأنشطة يحافظ على انخراط الأطفال كل يوم. من السباحة إلى الفنون والحرف، هناك شيء لكل اهتمامات الطفل. أنصح بشدة!",
      author: "فاطمة ح.",
      role: "والدة زارا (7 سنوات)",
      icon: "👩",
      rating: 5,
    },
    {
      quote:
        "أحب الذهاب إلى خطوات رائدة! تعلمت السباحة، وأقمت الكثير من الصداقات، ونذهب في أروع الرحلات. المعلمون لطفاء جداً ويساعدوننا في كل شيء!",
      author: "كريم أ.",
      role: "مشارك (9 سنوات)",
      icon: "👦",
      rating: 5,
    },
    {
      quote:
        "كأم عاملة، كنت بحاجة إلى مكان آمن لأطفالي خلال الصيف. خطوات رائدة تجاوزت كل التوقعات. يتعلم الأطفال ويلعبون وينمون في أفضل بيئة.",
      author: "نادية ر.",
      role: "والدة توأم (6 سنوات)",
      icon: "👩",
      rating: 5,
    },
    {
      quote:
        "ساعد المعسكر ابنتي على التغلب على خوفها من الماء. الآن هي سباحة واثقة! النهج التدريجي وصبر المدربين أحدثا كل الفرق.",
      author: "حسن ب.",
      role: "والد مايا (11 سنة)",
      icon: "👨",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ما يقوله <span className="text-brand-green">الأهل</span> عنا
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            لا تأخذوا كلمتنا فقط - استمعوا إلى الآباء والأطفال الذين اختبروا فرق
            خطوات رائدة بأنفسهم.
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
                <div className="flex gap-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="w-4 h-4 fill-brand-yellow text-brand-yellow"
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-gray-700 leading-relaxed mb-4 italic">
                {`"`}
                {testimonial.quote}
                {`"`}
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
            <div className="text-gray-700 font-medium">رضا الأهل</div>
            <div className="text-sm text-gray-600">يوصون بالمعسكر للآخرين</div>
          </div>

          <div className="text-center p-6 bg-brand-yellow/10 rounded-xl">
            <div className="text-3xl font-bold text-brand-yellow mb-2">95%</div>
            <div className="text-gray-700 font-medium">معدل العودة</div>
            <div className="text-sm text-gray-600">
              الأطفال يعودون الصيف القادم
            </div>
          </div>

          <div className="text-center p-6 bg-brand-red/10 rounded-xl">
            <div className="text-3xl font-bold text-brand-red mb-2">100%</div>
            <div className="text-gray-700 font-medium">سجل السلامة</div>
            <div className="text-sm text-gray-600">لا حوادث مسجلة</div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-green/10 via-brand-yellow/10 to-brand-red/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              انضم إلى عائلتنا المتنامية من المشاركين السعداء!
            </h3>
            <p className="text-gray-600 leading-relaxed">
              كل شهادة تمثل طفلاً خطا خطواته الرائدة نحو النمو والثقة والفرح.
              يشرفنا أن نكون جزءاً من رحلتهم ونحن متحمسون لترحيب طفلك في عائلة
              معسكرنا.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
