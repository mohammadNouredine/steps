import Header from "./Header";
import HeroSection from "./HeroSection";
import StatisticsSection from "./StatisticsSection";
import GoalsSection from "./GoalsSection";
import ActivitiesSection from "./ActivitiesSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import SpecificActivities from "./SpecificActivities";
import ActivitiesCarousel from "./ActivitiesCarousel";
import Gallery from "./Gallery";
const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <StatisticsSection />
      <ActivitiesCarousel />
      <SpecificActivities />
      <GoalsSection />
      <ActivitiesSection />

      <SkillsSection />
      {/* <TripsSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <SubscriptionsSection /> */}
      <ContactSection />
      <Gallery />

      <Footer />
    </div>
  );
};

export default Index;
