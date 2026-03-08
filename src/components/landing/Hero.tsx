import { ArrowRight, Briefcase, CheckCircle, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { latestDrives } from "@/data/mockData";
import heroWoman from "@/assets/hero-woman.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Animated glowing orbs */}
      <motion.div
        className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-[hsl(var(--purple))]/20 blur-[100px]"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.15, 0.9, 1],
          opacity: [0.2, 0.35, 0.15, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[100px]"
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.9, 1.2, 1],
          opacity: [0.15, 0.3, 0.1, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-[hsl(var(--mint))]/10 blur-[80px]"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
          opacity: [0.1, 0.2, 0.05, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Live in 50+ Indian Cities
              </span>
            </motion.div>

            {/* Animated tagline - hero headline */}
            <motion.h1
              className="mb-6 text-4xl font-extrabold leading-[1.05] text-foreground md:text-5xl lg:text-[3.75rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Let us make{" "}
              <br className="hidden sm:block" />
              <motion.span
                className="relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <span className="relative z-10 bg-gradient-to-r from-primary via-[hsl(var(--purple))] to-[hsl(var(--mint))] bg-clip-text text-transparent">
                  Your first move
                </span>
                <motion.span
                  className="absolute -inset-1 -z-10 block rounded-lg bg-gradient-to-r from-primary/15 via-[hsl(var(--purple))]/10 to-[hsl(var(--mint))]/15 blur-sm"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.span>
            </motion.h1>

            <motion.p
              className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              No more waiting for callbacks. Discover verified walk-in interviews in your city,{" "}
              <strong className="text-foreground">show up in person</strong>, and land your next opportunity — all in one day.
            </motion.p>

            <motion.div
              className="mb-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button size="lg" className="rounded-full px-7 gap-2 font-semibold">
                Find Drives Nearby <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-7 font-semibold gap-2">
                <Briefcase className="h-4 w-4" /> Post a Drive Free
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" /> 100% Free</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> Real-time Updates</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> Verified Companies</span>
            </motion.div>
          </div>

          {/* Right - Hero image + floating widget */}
          <div className="relative flex items-center justify-center">
            {/* Woman image with glow */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img
                src={heroWoman}
                alt="Professional ready for walk-in interview"
                className="relative z-10 h-auto w-full max-w-md mx-auto rounded-2xl"
              />
              {/* Glow behind image */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[hsl(var(--purple))]/40 to-primary/30 blur-[60px]"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Floating latest drives card */}
            <motion.div
              className="absolute -bottom-4 -left-4 z-20 w-64 rounded-xl border border-border bg-card/95 p-3 card-shadow backdrop-blur-sm md:left-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Latest Drives</span>
                <span className="flex items-center gap-1 rounded-full bg-[hsl(var(--mint))]/10 px-2 py-0.5 text-[10px] font-semibold text-[hsl(var(--mint))]">
                  <span className="h-1 w-1 rounded-full bg-[hsl(var(--mint))]" /> Live
                </span>
              </div>
              <div className="space-y-1.5">
                {latestDrives.slice(0, 3).map(drive => (
                  <a key={drive.id} href={`/drives/${drive.id}`} className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-secondary/50">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-light text-[10px] font-bold text-primary">
                      {drive.companyInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-foreground">{drive.company}</p>
                      <p className="truncate text-[10px] text-muted-foreground">{drive.roles[0]}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Floating stats card */}
            <motion.div
              className="absolute -right-2 top-4 z-20 rounded-xl border border-border bg-card/95 px-4 py-3 card-shadow backdrop-blur-sm md:right-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-lg font-extrabold text-foreground">50K+</p>
              <p className="text-[10px] text-muted-foreground">Active Job Seekers</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
