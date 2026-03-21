import { ArrowRight, Zap, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-primary/8 blur-[120px]"
        animate={{ opacity: [0.06, 0.12, 0.06], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-32 top-20 h-[300px] w-[300px] rounded-full bg-[hsl(var(--purple))]/8 blur-[100px]"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-32 top-40 h-[300px] w-[300px] rounded-full bg-primary/6 blur-[100px]"
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary">
              <Zap className="h-3.5 w-3.5" />
              Live in 50+ Indian Cities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="mb-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] text-foreground"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            Walk In. Interview.{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient">Get Hired Today.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mb-10 mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover verified walk-in interviews in your city, show up in person, and land your next opportunity — all in one day.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mb-16 flex flex-col sm:flex-row justify-center gap-3"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/drives">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-8 gap-2 font-semibold">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 font-semibold">
                Learn More
              </Button>
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <p className="text-lg font-bold text-foreground">&lt; 24hrs</p>
              <p className="text-xs text-muted-foreground">Avg. Hire Time</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <p className="text-lg font-bold text-foreground">1000+</p>
              <p className="text-xs text-muted-foreground">Verified Companies</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <p className="text-lg font-bold text-foreground">100%</p>
              <p className="text-xs text-muted-foreground">Always Free</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
