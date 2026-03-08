import { MapPin, Building2, Briefcase, ArrowRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const cities = [
  { name: "Delhi NCR", x: 48, y: 15, jobs: 18, active: true },
  { name: "Chandigarh", x: 44, y: 8, jobs: 5, active: false },
  { name: "Jaipur", x: 38, y: 22, jobs: 8, active: true },
  { name: "Lucknow", x: 56, y: 22, jobs: 6, active: false },
  { name: "Ahmedabad", x: 30, y: 36, jobs: 10, active: true },
  { name: "Mumbai", x: 32, y: 46, jobs: 22, active: true },
  { name: "Pune", x: 35, y: 51, jobs: 14, active: true },
  { name: "Hyderabad", x: 44, y: 54, jobs: 12, active: true },
  { name: "Bengaluru", x: 40, y: 66, jobs: 36, active: true },
  { name: "Chennai", x: 50, y: 66, jobs: 15, active: true },
  { name: "Kolkata", x: 66, y: 33, jobs: 9, active: true },
  { name: "Nagpur", x: 44, y: 42, jobs: 4, active: false },
  { name: "Vizag", x: 54, y: 52, jobs: 3, active: false },
  { name: "Kochi", x: 38, y: 76, jobs: 7, active: false },
  { name: "Trivandrum", x: 37, y: 82, jobs: 4, active: false },
];

const CityMap = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-24 bg-navy">
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Left - Map */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative mx-auto aspect-[3/4] max-w-sm">
              {/* India outline */}
              <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-2xl" fill="none">
                <path
                  d="M42 2 C44 2, 48 3, 52 5 C56 7, 60 10, 63 14 C66 18, 68 22, 70 27 C71 30, 70 33, 68 36 C66 38, 63 40, 60 42 C58 44, 56 47, 54 51 C52 55, 50 59, 48 63 C46 67, 44 71, 42 75 C40 78, 39 81, 38 84 C37 86, 36 88, 36 89 C36 90, 37 90, 38 89 C40 86, 42 82, 44 78 C46 74, 48 70, 50 67 C51 65, 52 63, 52 61 C51 58, 49 55, 47 53 C45 50, 43 48, 41 45 C39 42, 37 39, 35 37 C33 35, 31 34, 30 36 C29 38, 28 42, 27 46 C26 50, 26 53, 27 56 C28 58, 30 57, 31 54 C32 51, 31 47, 29 43 C28 40, 26 36, 24 32 C22 28, 21 24, 22 20 C23 17, 25 14, 28 11 C31 8, 35 5, 38 3 C40 2, 41 2, 42 2 Z"
                  className="fill-[hsl(var(--navy-foreground))]/[0.06] stroke-[hsl(var(--navy-foreground))]/20"
                  strokeWidth="0.4"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Connection lines between major cities */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
                {[
                  [48, 15, 32, 46], // Delhi to Mumbai
                  [32, 46, 40, 66], // Mumbai to Bengaluru
                  [40, 66, 50, 66], // Bengaluru to Chennai
                  [44, 54, 40, 66], // Hyderabad to Bengaluru
                  [48, 15, 66, 33], // Delhi to Kolkata
                ].map(([x1, y1, x2, y2], i) => (
                  <motion.line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    className="stroke-primary/20"
                    strokeWidth="0.2"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                  />
                ))}
              </svg>

              {/* City dots */}
              {cities.map((city, i) => (
                <motion.div
                  key={city.name}
                  className="absolute z-10 cursor-pointer"
                  style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%, -50%)" }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
                  onMouseEnter={() => setHovered(city.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Pulse for active */}
                  {city.active && (
                    <motion.div
                      className="absolute inset-0 m-auto h-6 w-6 rounded-full bg-primary/30"
                      animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    />
                  )}

                  <div className={`relative h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                    hovered === city.name
                      ? "scale-[2] bg-[hsl(var(--mint))] shadow-lg shadow-[hsl(var(--mint))]/40"
                      : city.active
                        ? "bg-primary shadow-sm shadow-primary/30"
                        : "bg-[hsl(var(--navy-foreground))]/30"
                  }`} />

                  {/* Label */}
                  <span className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-medium transition-opacity duration-200 ${
                    hovered === city.name
                      ? "text-[hsl(var(--mint))] opacity-100"
                      : "text-[hsl(var(--navy-foreground))]/50 opacity-60"
                  }`}>
                    {city.name}
                  </span>

                  {/* Tooltip */}
                  {hovered === city.name && (
                    <motion.div
                      className="absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-card px-3 py-1.5 text-[10px] font-bold text-foreground shadow-xl"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {city.jobs} drives
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

            {/* Stats */}
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

            {/* Legend */}
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
