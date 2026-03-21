import { MapPin, Calendar, FileText, Navigation, Bell, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: MapPin, title: "Location-Based Feed", desc: "Get personalized drive recommendations based on your current location and preferences." },
  { icon: Calendar, title: "Daily Walk-In Calendar", desc: "Never miss an opportunity with our comprehensive calendar of daily walk-in events." },
  { icon: FileText, title: "Document Checklist", desc: "Know exactly what to carry — resume, ID, certificates, photos — for every drive." },
  { icon: Navigation, title: "Map-Based Directions", desc: "Get turn-by-turn directions to interview venues with accurate timing estimates." },
  { icon: Bell, title: "Instant Drive Alerts", desc: "Receive real-time notifications when new walk-in opportunities match your criteria." },
  { icon: ShieldCheck, title: "Verified Companies", desc: "All drive postings are verified to ensure authentic opportunities and prevent fraud." },
];

const Features = () => (
  <section id="features" className="relative py-24 sm:py-32 bg-secondary/30">
    <div className="container relative">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <motion.h2
          className="mb-4 text-3xl sm:text-4xl font-extrabold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Everything you need to land your next job, faster than ever before
        </motion.p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="group rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_8px_30px_-12px_hsl(252,56%,57%,0.12)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/20">
              <f.icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
            </div>
            <h3 className="mb-2 text-base font-bold text-foreground">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
