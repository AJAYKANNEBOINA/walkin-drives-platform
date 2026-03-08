import { Clock, MapPin, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const perks = [
  { icon: Clock, title: "Post in Minutes", desc: "Quick & easy job posting" },
  { icon: MapPin, title: "Local Reach", desc: "Target candidates nearby" },
  { icon: Users, title: "Quality Candidates", desc: "Verified job seekers" },
  { icon: Zap, title: "Instant Visibility", desc: "Go live immediately" },
];

const ForEmployers = () => (
  <section className="py-20">
    <div className="container">
      <motion.div
        className="rounded-3xl border border-border bg-card p-10 md:p-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-primary">For Employers</span>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground">
            Need to Hire <span className="text-gradient">Fast?</span>
          </h2>
          <p className="mb-10 text-muted-foreground leading-relaxed">
            Post your walk-in drive and reach local candidates instantly. No waiting, no delays – find the right talent today.
          </p>

          <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {perks.map(p => (
              <div key={p.title} className="rounded-xl bg-secondary p-4 text-center">
                <p.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>

          <Button size="lg" className="rounded-full px-8 font-semibold">
            Post a Walk-In Drive — It's Free
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ForEmployers;
