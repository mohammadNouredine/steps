import Header from "./Header";
import HeroSection from "./HeroSection";
import StatisticsSection from "./StatisticsSection";
import GoalsSection from "./GoalsSection";
import ActivitiesSection from "./ActivitiesSection";
import SkillsSection from "./SkillsSection";
import TripsSection from "./TripsSection";
import TestimonialsSection from "./TestimonialsSection";
import SubscriptionsSection from "./SubscriptionsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <StatisticsSection />
      <GoalsSection />
      <ActivitiesSection />
      <SkillsSection />
      <TripsSection />
      <TestimonialsSection />
      <SubscriptionsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
