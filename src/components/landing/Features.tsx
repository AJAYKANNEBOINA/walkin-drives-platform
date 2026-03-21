import { MapPin, Calendar, FileText, Navigation, Bell, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: MapPin, title: "Location-Based Drive Feed", desc: "Get personalized drive recommendations based on your current location and preferences.", color: "from-primary/10 to-[hsl(var(--purple))]/10" },
  { icon: Calendar, title: "Daily Walk-In Calendar", desc: "Never miss an opportunity with our comprehensive calendar of daily walk-in events.", color: "from-[hsl(var(--mint))]/10 to-primary/10" },
  { icon: FileText, title: "Document Checklist", desc: "Know exactly what to carry — resume, ID, certificates, photos — for every drive.", color: "from-[hsl(var(--purple))]/10 to-[hsl(var(--mint))]/10" },
  { icon: Navigation, title: "Map-Based Directions", desc: "Get turn-by-turn directions to interview venues with accurate timing estimates.", color: "from-primary/10 to-[hsl(var(--mint))]/10" },
  { icon: Bell, title: "Instant Drive Alerts", desc: "Receive real-time notifications when new walk-in opportunities match your criteria.", color: "from-[hsl(var(--purple))]/10 to-primary/10" },
  { icon: ShieldCheck, title: "Verified Company Posts", desc: "All drive postings are verified to ensure authentic opportunities and prevent fraud.", color: "from-[hsl(var(--mint))]/10 to-[hsl(var(--purple))]/10" },
];

const Features = () => (
  <section className="relative overflow-hidden py-24">
    {/* Subtle background glow */}
    <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/3 blur-[120px]" />

    <div className="container relative">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <motion.h2
          className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why Choose WALKINS?
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Everything you need to land your next job, faster than ever before.
        </motion.p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_40px_-12px_hsl(217,91%,60%,0.15)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
          >
            {/* Gradient hover background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25">
                <f.icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              </div>
              <h3 className="mb-2.5 text-base font-bold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
