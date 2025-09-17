import Header from "./Header";
import StatisticsSection from "./StatisticsSection";
import GoalsSection from "./GoalsSection";
import ActivitiesSection from "./ActivitiesSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import SpecificActivities from "./SpecificActivities";
import ActivitiesCarousel from "./ActivitiesCarousel";
import Gallery from "./Gallery/Gallery";
import HeroSectionWinter from "./HeroSectionWinter";
import ServicesSection from "./ServicesSection";
const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSectionWinter />
      <ServicesSection />
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
