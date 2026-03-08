import { ArrowRight, Briefcase, CheckCircle, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { latestDrives } from "@/data/mockData";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Subtle bg decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[hsl(var(--purple))]/5 blur-3xl" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div>
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

            <motion.h1
              className="mb-5 text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl lg:text-[3.5rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Walk-In Drives{" "}
              <span className="text-gradient">Near You</span>
            </motion.h1>

            <motion.p
              className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Skip the endless applications. Find verified walk-in interviews happening{" "}
              <strong className="text-foreground">right now</strong> in your city and get hired today.
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

          {/* Right - Latest Jobs Widget */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-2xl border border-border bg-card card-shadow overflow-hidden">
              {/* Widget header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-primary to-[hsl(var(--purple))] px-5 py-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                  <div>
                    <h3 className="text-sm font-bold text-primary-foreground">Latest Drives</h3>
                    <p className="text-xs text-primary-foreground/70">{latestDrives.length} live</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--mint))]" /> Live
                </span>
              </div>

              {/* Job list */}
              <div className="divide-y divide-border">
                {latestDrives.slice(0, 4).map(drive => (
                  <a key={drive.id} href={`/drives/${drive.id}`} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-xs font-bold text-primary">
                      {drive.companyInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{drive.company}</p>
                      <p className="text-xs text-muted-foreground truncate">{drive.roles[0]}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">Today</span>
                  </a>
                ))}
              </div>

              {/* Widget footer */}
              <div className="px-5 py-3 border-t border-border">
                <a href="/drives" className="flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline">
                  View All Walk-ins <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Decorative badge */}
            <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground shadow-lg">
              {latestDrives.length}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
