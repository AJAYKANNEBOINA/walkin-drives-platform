import { MapPin, Search, FileText, Users } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: MapPin, step: "01", title: "Share Location", desc: "Allow location access to discover walk-in interviews happening near you." },
  { icon: Search, step: "02", title: "Browse & Filter", desc: "Search drives by role, company, salary, and distance from you." },
  { icon: FileText, step: "03", title: "Get Details", desc: "View interview timings, requirements, and get directions to the venue." },
  { icon: Users, step: "04", title: "Walk-in & Get Hired", desc: "Attend the interview prepared and start your new career journey." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 sm:py-32">
    <div className="container">
      <div className="mx-auto mb-16 max-w-xl text-center">
        <motion.h2
          className="mb-4 text-3xl sm:text-4xl font-extrabold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-base sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Four simple steps to land your next opportunity
        </motion.p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            className="relative text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
              <s.icon className="h-6 w-6 text-primary" />
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
