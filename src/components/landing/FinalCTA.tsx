import { Button } from "@/components/ui/button";
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
      <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
        Ready to attend your next walk-in drive?
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
        Join thousands of job seekers who find and attend verified walk-in drives every day.
      </p>
      <div className="flex justify-center gap-3">
        <Button size="lg" variant="secondary" className="rounded-xl">
          Browse Drives
        </Button>
        <Button size="lg" variant="outline" className="rounded-xl border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
          Sign Up Free
        </Button>
      </div>
    </motion.div>
  </section>
);

export default FinalCTA;
