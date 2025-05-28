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
    toast.success("Message Sent Successfully! 🎉");

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
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to <span className="text-brand-green">Get Started?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Contact us today to enroll your child in Leading Steps Summer Camp.
            We{"'"}re here to answer all your questions and help you choose the
            perfect program.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              📝 Enrollment Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
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
                    Phone Number *
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
                    Child{"'"}s Age
                  </label>
                  <Input
                    name="childAge"
                    type="number"
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="Age (5-12)"
                    min="5"
                    max="12"
                    className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Child{"'"}s Name
                </label>
                <Input
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  placeholder="Your child's name"
                  className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message or Questions
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your child's interests, any special needs, or questions you have about our programs..."
                  rows={4}
                  className="border-gray-300 focus:border-brand-green focus:ring-brand-green"
                />
              </div>

              <Button
                buttonType="submit"
                className="w-full bg-brand-green hover:bg-brand-green-neutral text-white py-3"
                text=" Send Inquiry & Get Information"
              />
            </form>
          </div>

          {/* Contact Information & Location */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-gradient-to-br from-brand-green/10 to-brand-green/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                📞 Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-brand-green mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Our Location
                    </h4>
                    <p className="text-gray-600">Arabsalim, Lebanon</p>
                    <p className="text-sm text-gray-500">
                      Beautiful countryside setting perfect for outdoor
                      activities
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-brand-green mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Phone & WhatsApp
                    </h4>
                    <p className="text-gray-600">+961 XX XXX XXX</p>
                    <p className="text-sm text-gray-500">
                      Available daily 8 AM - 8 PM for inquiries
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-brand-green mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Camp Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-sm text-gray-500">
                      Extended hours available upon request
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                ⭐ Why Choose Leading Steps?
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                  <span className="text-gray-700">
                    Licensed & certified camp facility
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                  <span className="text-gray-700">
                    Trained & experienced staff
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                  <span className="text-gray-700">
                    Small group sizes for personal attention
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                  <span className="text-gray-700">
                    Comprehensive safety protocols
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-brand-yellow fill-current" />
                  <span className="text-gray-700">
                    Daily parent communication
                  </span>
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
