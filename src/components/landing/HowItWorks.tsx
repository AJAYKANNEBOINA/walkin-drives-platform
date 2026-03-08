import { Search, UserCheck, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Search, step: "01", title: "Search", desc: "Browse verified walk-in drives by city, role, date, or company." },
  { icon: UserCheck, step: "02", title: "RSVP", desc: "Register your interest and get your personalized document checklist." },
  { icon: Building2, step: "03", title: "Walk In & Interview", desc: "Show up at the venue on time, prepared with everything you need." },
];

const HowItWorks = () => (
  <section className="bg-secondary/30 py-20">
    <div className="container">
      <div className="mx-auto mb-14 max-w-xl text-center">
        <h2 className="mb-3 text-3xl font-bold text-foreground">How it Works</h2>
        <p className="text-muted-foreground">Three simple steps to your next walk-in interview.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            className="relative text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <s.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">Step {s.step}</span>
            <h3 className="mb-2 text-xl font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
            {i < 2 && (
              <div className="absolute right-0 top-8 hidden h-px w-16 translate-x-full bg-border lg:block" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
