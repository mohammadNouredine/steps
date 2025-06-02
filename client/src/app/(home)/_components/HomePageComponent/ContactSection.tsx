import Button from "@/components/common/ui/Button";
import { Input, Textarea } from "@headlessui/react";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    toast.success("تم إرسال الرسالة بنجاح! 🎉");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      childName: "",
      childAge: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            هل أنت مستعد <span className="text-brand-green">للبدء؟</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            اتصل بنا اليوم لتسجيل طفلك في معسكر خطوات رائدة الصيفي. نحن هنا
            للإجابة على جميع أسئلتك ومساعدتك في اختيار البرنامج المثالي.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              📝 استفسار التسجيل
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الوالد/الوصي *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="الاسم الكامل"
                    required
                    className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+961 XX XXX XXX"
                    required
                    className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عمر الطفل
                  </label>
                  <Input
                    name="childAge"
                    type="number"
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="العمر (5-12)"
                    min="5"
                    max="12"
                    className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم الطفل
                </label>
                <Input
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  placeholder="اسم طفلك"
                  className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الرسالة أو الأسئلة
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="أخبرنا عن اهتمامات طفلك، أي احتياجات خاصة، أو أسئلة لديك حول برامجنا..."
                  rows={4}
                  className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                />
              </div>

              <Button
                buttonType="submit"
                className="w-full bg-brand-green hover:bg-brand-green-neutral text-white py-3"
                text="إرسال الاستفسار والحصول على المعلومات"
              />
            </form>
          </div>

          {/* Contact Information & Location */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-gradient-to-br from-brand-green/10 to-brand-green/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                📞 معلومات الاتصال
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-x-4">
                  <MapPin className="w-6 h-6 text-brand-green mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">موقعنا</h4>
                    <p className="text-gray-600">عربصاليم، لبنان</p>
                    <p className="text-sm text-gray-500">
                      موقع ريفي جميل مثالي للأنشطة الخارجية
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-x-4">
                  <Phone className="w-6 h-6 text-brand-green mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      الهاتف وواتساب
                    </h4>
                    <p className="text-gray-600">+961 XX XXX XXX</p>
                    <p className="text-sm text-gray-500">
                      متاح يومياً من 8 صباحاً حتى 8 مساءً للاستفسارات
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-x-4">
                  <Clock className="w-6 h-6 text-brand-green mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      ساعات المعسكر
                    </h4>
                    <p className="text-gray-600">
                      الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً
                    </p>
                    <p className="text-sm text-gray-500">
                      ساعات ممتدة متاحة عند الطلب
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                ⭐ لماذا تختار خطوات رائدة؟
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-x-3">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                  <span className="text-gray-700">
                    منشأة معسكر مرخصة ومعتمدة
                  </span>
                </div>
                <div className="flex items-center gap-x-3">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                  <span className="text-gray-700">طاقم مدرب وذو خبرة</span>
                </div>
                <div className="flex items-center gap-x-3">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                  <span className="text-gray-700">
                    مجموعات صغيرة للاهتمام الشخصي
                  </span>
                </div>
                <div className="flex items-center gap-x-3">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                  <span className="text-gray-700">بروتوكولات سلامة شاملة</span>
                </div>
                <div className="flex items-center gap-x-3">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                  <span className="text-gray-700">تواصل يومي مع الأهل</span>
                </div>
              </div>
            </div>

            {/* Simple Map Illustration */}
            <div className="bg-gradient-to-br from-brand-red/10 to-brand-red/5 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🗺️ Find Us in Arabsalim
              </h3>
              <div className="bg-white rounded-lg p-6 shadow-inner">
                <div className="text-6xl mb-4">🏕️</div>
                <p className="text-gray-600 font-medium">
                  Leading Steps Summer Camp
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Located in the heart of Arabsalim{"'"}s natural beauty
                </p>
                <div className="mt-4 text-xs text-gray-500">
                  Exact address shared upon enrollment confirmation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red bg-opacity-10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🚀 Ready for an Amazing Summer Adventure?
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Don{"'"}t wait – spots fill up quickly! Contact us today to secure
              your child{"'"}s place in the most exciting summer camp experience
              in Arabsalim. Let{"'"}s help your child take their leading steps
              toward an unforgettable summer!
            </p>
            <Button
              //   size="lg"
              className="bg-brand-green hover:bg-brand-green-neutral text-white px-8 py-3"
              text=" Start Your Journey Today! 🌟"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
