import { Users, Building2, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "50K+", label: "Active Job Seekers" },
  { icon: Building2, value: "1000+", label: "Companies Hiring" },
  { icon: TrendingUp, value: "85%", label: "Success Rate" },
  { icon: Clock, value: "24hrs", label: "Avg. Hire Time" },
];

const StatsBar = () => (
  <section className="border-y border-border bg-secondary/30 py-12">
    <div className="container">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
