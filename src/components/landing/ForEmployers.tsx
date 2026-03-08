import { Users, BarChart3, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const benefits = [
  { icon: Users, text: "Collect pre-registrations before the drive day" },
  { icon: BarChart3, text: "Get real-time RSVP analytics and headcount" },
  { icon: Zap, text: "Reach verified, interview-ready candidates" },
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
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">For Employers</span>
            <h2 className="mb-4 text-3xl font-bold text-foreground">Post a Walk-in Drive</h2>
            <p className="mb-8 text-muted-foreground leading-relaxed">
              Reach thousands of job seekers who are ready to show up. WALKINS helps you plan, promote, and manage walk-in drives with pre-registrations and real-time insights.
            </p>
            <Button size="lg">Post a Drive — It's Free</Button>
          </div>
          <div className="space-y-4">
            {benefits.map(b => (
              <div key={b.text} className="flex items-start gap-4 rounded-xl bg-secondary p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ForEmployers;
