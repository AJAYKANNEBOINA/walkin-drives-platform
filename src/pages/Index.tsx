import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import WalkinCards from "@/components/landing/WalkinCards";
import ForEmployers from "@/components/landing/ForEmployers";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <WalkinCards />
      <ForEmployers />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
