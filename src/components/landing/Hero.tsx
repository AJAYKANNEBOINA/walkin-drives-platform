import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cities } from "@/data/mockData";

const Hero = () => {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[hsl(250,80%,60%)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[hsl(217,91%,70%)]/15 blur-3xl" />

      <div className="container relative py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block rounded-full bg-[hsl(0,0%,100%)]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              India's #1 Walk-in Drive Platform
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find Verified Walk-in{" "}
            <span className="text-[hsl(160,80%,60%)]">Drives Near You</span>
          </motion.h1>

          <motion.p
            className="mb-10 text-lg text-primary-foreground/80 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Only real, venue-based walk-in interviews. Search, RSVP, and walk in prepared.
          </motion.p>

          {/* Search Card */}
          <motion.div
            className="mx-auto max-w-2xl rounded-2xl bg-background p-2 card-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary px-3 py-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                <select className="w-full bg-transparent text-sm text-foreground outline-none">
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary px-3 py-2.5">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Role or keyword"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary px-3 py-2.5">
                <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  type="date"
                  className="w-full bg-transparent text-sm text-foreground outline-none"
                />
              </div>
              <Button size="lg" className="shrink-0 rounded-xl px-6">
                Search Drives
              </Button>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="text-sm text-primary-foreground/70">Trusted by hiring teams across</span>
            {["Hyderabad", "Bangalore", "Chennai", "Pune", "Mumbai"].map(city => (
              <span key={city} className="rounded-full bg-[hsl(0,0%,100%)]/10 px-3 py-1 text-xs font-medium text-primary-foreground/90">
                {city}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
