import { Button } from "@/components/ui/button";
import { Bell, Mail, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

const FinalCTA = () => (
  <section className="cta-gradient py-20">
    <motion.div
      className="container text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-4 text-3xl font-extrabold text-primary-foreground md:text-4xl">
        Never Miss a Walk-in Near You
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
        Get instant alerts about new walk-in opportunities in your area. Join 50,000+ job seekers who never miss an opportunity.
      </p>

      {/* Email subscribe */}
      <div className="mx-auto mb-8 flex max-w-md overflow-hidden rounded-full bg-primary-foreground/10 p-1">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 bg-transparent px-5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 outline-none"
        />
        <Button className="rounded-full bg-mint text-mint-foreground hover:bg-mint/90 px-6 font-semibold">
          Subscribe
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-primary-foreground/70">
        <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email alerts</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> No spam, ever</span>
        <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> Instant delivery</span>
        <span className="flex items-center gap-1.5"><Bell className="h-3.5 w-3.5" /> Unsubscribe anytime</span>
      </div>
    </motion.div>
  </section>
);

export default FinalCTA;
