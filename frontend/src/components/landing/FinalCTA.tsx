import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Mail, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { toast } from "sonner";

const FinalCTA = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    try {
      const result = await api.subscribe(email.trim().toLowerCase());
      toast.success(result.message || "Subscribed!");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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

        <div className="mx-auto mb-8 flex max-w-md flex-col sm:flex-row overflow-hidden rounded-2xl sm:rounded-full bg-primary-foreground/10 p-1 gap-1 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            className="flex-1 bg-transparent px-5 py-3 sm:py-0 text-sm text-primary-foreground placeholder:text-primary-foreground/50 outline-none text-center sm:text-left"
          />
          <Button
            className="rounded-xl sm:rounded-full bg-mint text-mint-foreground hover:bg-mint/90 px-6 py-3 font-semibold w-full sm:w-auto"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "..." : "Subscribe"}
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
};

export default FinalCTA;
