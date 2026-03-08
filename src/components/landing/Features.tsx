import { MapPin, Calendar, FileText, Navigation, Bell, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: MapPin, title: "Location-Based Drive Feed", desc: "Get personalized drive recommendations based on your current location and preferences." },
  { icon: Calendar, title: "Daily Walk-In Calendar", desc: "Never miss an opportunity with our comprehensive calendar of daily walk-in events." },
  { icon: FileText, title: "Document Checklist", desc: "Know exactly what to carry — resume, ID, certificates, photos — for every drive." },
  { icon: Navigation, title: "Map-Based Directions", desc: "Get turn-by-turn directions to interview venues with accurate timing estimates." },
  { icon: Bell, title: "Instant Drive Alerts", desc: "Receive real-time notifications when new walk-in opportunities match your criteria." },
  { icon: ShieldCheck, title: "Verified Company Posts", desc: "All drive postings are verified to ensure authentic opportunities and prevent fraud." },
];

const Features = () => (
  <section className="py-20">
    <div className="container">
      <div className="mx-auto mb-14 max-w-xl text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-primary">Powerful Features</span>
        <h2 className="mb-3 text-3xl font-extrabold text-foreground">Why Choose WALKINS?</h2>
        <p className="text-muted-foreground">Everything you need to land your next job, faster than ever before.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="group rounded-2xl border border-border bg-card p-6 card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light">
              <f.icon className="h-5 w-5 text-primary" />
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
