import { Button } from "./Button";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <img src="/brand/images/logo.png" alt="شعار" className="h-8 mb-3" />
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-gray-900">خطوات رائدة</h1>
              <p className="text-sm text-brand-green">معسكر صيفي</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-x-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-600 hover:text-brand-green transition-colors"
            >
              من نحن
            </button>
            <button
              onClick={() => scrollToSection("activities")}
              className="text-gray-600 hover:text-brand-green transition-colors"
            >
              الأنشطة
            </button>
            <button
              onClick={() => scrollToSection("subscriptions")}
              className="text-gray-600 hover:text-brand-green transition-colors"
            >
              البرامج
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-600 hover:text-brand-green transition-colors"
            >
              اتصل بنا
            </button>
          </nav>

          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-brand-green hover:bg-brand-green-neutral text-white"
          >
            انضم إلينا
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
