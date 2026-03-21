import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-24 sm:py-32">
      <motion.div
        className="container text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-foreground">
          Ready to Land Your Next Job?
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-base sm:text-lg text-muted-foreground">
          Start discovering walk-in interviews and get hired in record time.
        </p>
        <Link to="/drives">
          <Button size="lg" className="rounded-full px-8 gap-2 font-semibold">
            Start Exploring <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
