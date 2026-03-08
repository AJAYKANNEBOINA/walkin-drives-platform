import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustedBy from "@/components/landing/TrustedBy";
import ValueProps from "@/components/landing/ValueProps";
import TodaysDrives from "@/components/landing/TodaysDrives";
import LatestDrives from "@/components/landing/LatestDrives";
import HowItWorks from "@/components/landing/HowItWorks";
import ForEmployers from "@/components/landing/ForEmployers";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustedBy />
      <ValueProps />
      <TodaysDrives />
      <LatestDrives />
      <HowItWorks />
      <ForEmployers />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
