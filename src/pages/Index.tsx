import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import NewsletterCta from "@/components/NewsletterCta";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection variant="centered" />
      <FeatureGrid />
      <PortfolioShowcase />
      <AboutSection />
      <Testimonials />
      <FaqAccordion />
      <NewsletterCta />
      <Footer />
    </div>
  );
};

export default Index;
