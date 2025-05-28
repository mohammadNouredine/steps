const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-green to-brand-green-neutral rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Leading Steps</h3>
                <p className="text-sm text-gray-400">Summer Camp</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Empowering children to take their leading steps toward growth,
              confidence, and lifelong learning through engaging summer camp
              experiences in Arabsalim, Lebanon.
            </p>
            <div className="flex space-x-4">
              <div className="text-2xl">🏕️</div>
              <div className="text-2xl">🏊‍♂️</div>
              <div className="text-2xl">🎨</div>
              <div className="text-2xl">⚽</div>
              <div className="text-2xl">📚</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-green">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-brand-green transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("activities")}
                  className="text-gray-300 hover:text-brand-green transition-colors"
                >
                  Activities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("subscriptions")}
                  className="text-gray-300 hover:text-brand-green transition-colors"
                >
                  Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-brand-green transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-yellow">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 text-sm">📍 Location</p>
                <p className="text-gray-400 text-sm">Arabsalim, Lebanon</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">📞 Phone</p>
                <p className="text-gray-400 text-sm">+961 XX XXX XXX</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">🕒 Camp Hours</p>
                <p className="text-gray-400 text-sm">Mon-Fri: 9 AM - 6 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Camp Highlights */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-brand-green">4 Years</div>
              <div className="text-sm text-gray-400">Of Amazing Summers</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-brand-yellow">100+</div>
              <div className="text-sm text-gray-400">Happy Campers</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-brand-red">14+</div>
              <div className="text-sm text-gray-400">New Swimmers</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">
            © {currentYear} Leading Steps Summer Camp. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Built with ❤️ for the amazing children of Arabsalim, Lebanon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
