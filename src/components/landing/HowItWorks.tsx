import { MapPin, Search, FileText, Users } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: MapPin, step: "01", title: "Share Location", desc: "Allow location access to discover walk-in interviews happening near you." },
  { icon: Search, step: "02", title: "Browse & Filter", desc: "Search drives by role, company, salary, and distance from you." },
  { icon: FileText, step: "03", title: "Get Details", desc: "View interview timings, requirements, and get directions to the venue." },
  { icon: Users, step: "04", title: "Walk-in & Get Hired", desc: "Attend the interview prepared and start your new career journey." },
];

const HowItWorks = () => (
  <section className="bg-secondary/30 py-20">
    <div className="container">
      <div className="mx-auto mb-14 max-w-xl text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-primary">Simple 4-Step Process</span>
        <h2 className="mb-3 text-3xl font-extrabold text-foreground">How It Works</h2>
        <p className="text-muted-foreground">From search to job offer in record time. No complex applications, just show up and shine.</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            className="relative text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <s.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">{s.step}</span>
            <h3 className="mb-2 text-lg font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
