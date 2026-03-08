import { MapPin, Building2, Briefcase, ArrowRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const cities = [
  { name: "Delhi NCR", x: 42, y: 18, jobs: 18 },
  { name: "Chandigarh", x: 38, y: 10, jobs: 5 },
  { name: "Jaipur", x: 34, y: 24, jobs: 8 },
  { name: "Lucknow", x: 52, y: 24, jobs: 6 },
  { name: "Ahmedabad", x: 28, y: 38, jobs: 10 },
  { name: "Mumbai", x: 30, y: 48, jobs: 22 },
  { name: "Pune", x: 32, y: 52, jobs: 14 },
  { name: "Hyderabad", x: 42, y: 55, jobs: 12 },
  { name: "Bengaluru", x: 38, y: 68, jobs: 36 },
  { name: "Chennai", x: 48, y: 68, jobs: 15 },
  { name: "Kolkata", x: 62, y: 35, jobs: 9 },
  { name: "Nagpur", x: 40, y: 42, jobs: 4 },
  { name: "Vizag", x: 52, y: 55, jobs: 3 },
  { name: "Kochi", x: 36, y: 78, jobs: 7 },
  { name: "Trivandrum", x: 35, y: 84, jobs: 4 },
];

const CityMap = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary">
                <Navigation className="h-3.5 w-3.5" />
                Nationwide Presence
              </span>
            </motion.div>

            <motion.h2
              className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Walk-in Drives Across{" "}
              <span className="text-gradient">Every Major City</span>
            </motion.h2>

            <motion.p
              className="mb-8 max-w-md text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              From Delhi to Bengaluru, Mumbai to Kolkata — explore verified walk-in opportunities happening across India. Hover over cities to see live openings.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="mb-8 grid grid-cols-3 gap-4"
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
                <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center card-shadow">
                  <s.icon className="mx-auto mb-2 h-4 w-4 text-primary" />
                  <p className="text-xl font-extrabold text-foreground">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Button className="rounded-full gap-2 font-semibold">
                Explore All Cities <ArrowRight className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground">Interactive map — hover to explore</span>
            </motion.div>
          </div>

          {/* Right - India map visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative mx-auto aspect-[3/4] max-w-md">
              {/* Map outline SVG */}
              <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
                {/* Simplified India outline */}
                <path
                  d="M38 5 L45 4 L52 6 L55 10 L60 12 L65 15 L68 20 L70 28 L68 32 L65 35 L63 38 L60 40 L58 45 L55 50 L52 55 L50 60 L48 65 L45 70 L42 75 L40 78 L38 82 L36 85 L34 88 L35 90 L38 88 L40 85 L42 80 L45 75 L48 72 L50 68 L52 65 L50 62 L48 58 L45 55 L42 52 L40 48 L38 44 L35 40 L32 38 L30 42 L28 48 L26 52 L25 55 L27 58 L30 55 L32 50 L30 45 L28 40 L25 35 L22 30 L20 25 L22 20 L25 15 L28 12 L32 8 L35 6 Z"
                  className="fill-primary/[0.04] stroke-primary/20"
                  strokeWidth="0.3"
                />
              </svg>

              {/* City dots */}
              {cities.map((city, i) => (
                <motion.div
                  key={city.name}
                  className="absolute z-10"
                  style={{ left: `${city.x}%`, top: `${city.y}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  onMouseEnter={() => setHovered(city.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute -inset-2 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                  {/* Dot */}
                  <div className={`relative h-3 w-3 rounded-full border-2 border-card transition-all duration-200 ${
                    hovered === city.name ? "bg-primary scale-150 shadow-lg shadow-primary/30" : city.jobs > 15 ? "bg-primary" : "bg-primary/60"
                  }`} />

                  {/* City label */}
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-200 ${
                    hovered === city.name ? "opacity-100 translate-x-0" : "opacity-70 -translate-x-1"
                  }`}>
                    <span className="text-[10px] font-semibold text-foreground">{city.name}</span>
                    {(hovered === city.name || city.jobs > 15) && (
                      <span className="ml-1 text-[9px] font-bold text-primary">{city.jobs} drives</span>
                    )}
                  </div>

                  {/* Hover tooltip */}
                  {hovered === city.name && (
                    <motion.div
                      className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-lg bg-foreground px-3 py-1.5 text-[10px] font-semibold text-background shadow-lg"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {city.jobs} active drives
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-foreground" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CityMap;
