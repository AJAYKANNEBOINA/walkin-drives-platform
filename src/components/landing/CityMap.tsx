import { MapPin, Building2, Briefcase, ArrowRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import indiaMap from "@/assets/india-map.png";

const cities = [
  { name: "Delhi NCR", x: 41, y: 12, jobs: 18, active: true },
  { name: "Chandigarh", x: 37, y: 7, jobs: 5, active: false },
  { name: "Jaipur", x: 33, y: 18, jobs: 8, active: true },
  { name: "Lucknow", x: 50, y: 17, jobs: 6, active: false },
  { name: "Ahmedabad", x: 24, y: 30, jobs: 10, active: true },
  { name: "Mumbai", x: 27, y: 42, jobs: 22, active: true },
  { name: "Pune", x: 30, y: 47, jobs: 14, active: true },
  { name: "Hyderabad", x: 40, y: 50, jobs: 12, active: true },
  { name: "Bengaluru", x: 36, y: 62, jobs: 36, active: true },
  { name: "Chennai", x: 45, y: 60, jobs: 15, active: true },
  { name: "Kolkata", x: 62, y: 30, jobs: 9, active: true },
  { name: "Nagpur", x: 40, y: 38, jobs: 4, active: false },
  { name: "Vizag", x: 52, y: 48, jobs: 3, active: false },
  { name: "Kochi", x: 34, y: 72, jobs: 7, active: false },
  { name: "Trivandrum", x: 33, y: 78, jobs: 4, active: false },
];

const CityMap = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-24 bg-navy">
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Left - India Map Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative mx-auto max-w-md">
              <img
                src={indiaMap}
                alt="India map showing walk-in drive locations"
                className="h-auto w-full opacity-40"
              />

              {/* City dots overlaid on map */}
              {cities.map((city, i) => (
                <motion.div
                  key={city.name}
                  className="absolute z-10 cursor-pointer"
                  style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%, -50%)" }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  onMouseEnter={() => setHovered(city.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {city.active && (
                    <motion.div
                      className="absolute inset-0 m-auto h-6 w-6 rounded-full bg-primary/30"
                      animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    />
                  )}

                  <div className={`relative h-3 w-3 rounded-full border border-navy transition-all duration-200 ${
                    hovered === city.name
                      ? "scale-[2] bg-[hsl(var(--mint))] shadow-lg shadow-[hsl(var(--mint))]/50"
                      : city.active
                        ? "bg-primary shadow-md shadow-primary/40"
                        : "bg-[hsl(var(--navy-foreground))]/25"
                  }`} />

                  <span className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold transition-all duration-200 ${
                    hovered === city.name
                      ? "text-[hsl(var(--mint))] opacity-100"
                      : "text-[hsl(var(--navy-foreground))]/50 opacity-70"
                  }`}>
                    {city.name}
                    {(hovered === city.name || city.jobs > 15) && (
                      <span className="ml-1 text-[9px] font-bold text-primary">{city.jobs} drives</span>
                    )}
                  </span>

                  {hovered === city.name && (
                    <motion.div
                      className="absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-card px-3 py-1.5 text-[10px] font-bold text-foreground shadow-xl"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {city.jobs} active drives
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-card" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Navigation className="h-3.5 w-3.5" />
                Nationwide Presence
              </span>
            </motion.div>

            <motion.h2
              className="mb-5 text-3xl font-extrabold text-[hsl(var(--navy-foreground))] md:text-4xl lg:text-[2.75rem] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Walk-in Drives Across{" "}
              <span className="text-gradient">Every Major City</span>
            </motion.h2>

            <motion.p
              className="mb-10 max-w-md text-sm leading-relaxed text-[hsl(var(--navy-foreground))]/60"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              From Delhi to Bengaluru, Mumbai to Kolkata — explore verified walk-in opportunities happening across India. Hover over cities to see live openings.
            </motion.p>

            <motion.div
              className="mb-10 grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                { icon: MapPin, value: "15+", label: "CITIES" },
                { icon: Briefcase, value: "200+", label: "ACTIVE DRIVES" },
                { icon: Building2, value: "50+", label: "COMPANIES" },
              ].map(s => (
                <div key={s.label} className="rounded-xl border border-[hsl(var(--navy-foreground))]/10 bg-[hsl(var(--navy-foreground))]/5 p-4 text-center">
                  <s.icon className="mx-auto mb-2 h-4 w-4 text-primary" />
                  <p className="text-2xl font-extrabold text-[hsl(var(--navy-foreground))]">{s.value}</p>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-[hsl(var(--navy-foreground))]/40">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Button className="rounded-full gap-2 font-semibold bg-mint text-mint-foreground hover:bg-mint/90">
                Explore All Cities <ArrowRight className="h-4 w-4" />
              </Button>
              <span className="text-xs text-[hsl(var(--navy-foreground))]/40">Interactive map — hover to explore</span>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center gap-6 text-[10px] text-[hsl(var(--navy-foreground))]/40"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" /> Active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--navy-foreground))]/30" /> Coming soon
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityMap;
