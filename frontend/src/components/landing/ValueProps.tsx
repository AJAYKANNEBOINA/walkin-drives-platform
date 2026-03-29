import { ShieldCheck, MapPin, Clock, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const props = [
  { icon: ShieldCheck, title: "Verified Drives", desc: "Every listing is reviewed and confirmed with the hiring company." },
  { icon: MapPin, title: "Map & Directions", desc: "Get the exact venue location with one-tap Google Maps directions." },
  { icon: Clock, title: "Countdown to Start", desc: "Live countdown timers so you never miss a walk-in window." },
  { icon: FileCheck, title: "Document Checklist", desc: "Know exactly what to carry — resume, ID, certificates, photos." },
];

const ValueProps = () => (
  <section className="py-20">
    <div className="container">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <h2 className="mb-3 text-3xl font-bold text-foreground">Why job seekers love WALKINS</h2>
        <p className="text-muted-foreground">Everything you need to walk in with confidence.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {props.map((p, i) => (
          <motion.div
            key={p.title}
            className="group rounded-2xl border border-border bg-card p-6 card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light">
              <p.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-2 text-base font-semibold text-foreground">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueProps;
