import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import WalkinCards from "@/components/landing/WalkinCards";
import CityMap from "@/components/landing/CityMap";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import ForEmployers from "@/components/landing/ForEmployers";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <StatsBar />
      <WalkinCards />
      <CityMap />
      <HowItWorks />
      <Features />
      <ForEmployers />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
