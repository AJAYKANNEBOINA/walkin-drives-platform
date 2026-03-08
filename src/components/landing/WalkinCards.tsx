import { drives } from "@/data/mockData";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const WalkinCards = () => (
  <section className="py-20">
    <div className="container">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-primary">Walk-in Opportunities</span>
          <h2 className="text-3xl font-extrabold text-foreground">Today's Walk-in Drives</h2>
          <p className="mt-1 text-muted-foreground">Featured drives happening now across top cities</p>
        </div>
        <a href="/drives" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex">
          View all drives <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {drives.slice(0, 6).map((drive, i) => (
          <motion.div
            key={drive.id}
            className="group flex flex-col rounded-2xl border border-border bg-card card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            {/* Card header */}
            <div className="flex items-start justify-between p-5 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-sm font-bold text-primary">
                  {drive.companyInitials}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{drive.company}</p>
                  <p className="text-xs text-muted-foreground">{drive.city}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {drive.isVerified && (
                  <Badge variant="outline" className="border-primary/20 bg-primary-light text-primary text-[10px]">Verified</Badge>
                )}
                {drive.status === "live" && (
                  <Badge variant="outline" className="border-[hsl(var(--mint))]/30 bg-[hsl(var(--mint))]/10 text-[hsl(var(--mint))] text-[10px]">● Live</Badge>
                )}
              </div>
            </div>

            {/* Card body */}
            <div className="flex-1 px-5 pb-4">
              <h3 className="mb-2 font-semibold text-foreground leading-snug">{drive.roles[0]}</h3>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {drive.roles.slice(0, 3).map(r => (
                  <span key={r} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">{r}</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{drive.date} · {drive.startTime} – {drive.endTime}</p>
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between border-t border-border px-5 py-3">
              <span className="text-xs text-muted-foreground">{drive.registrationCount} RSVPs</span>
              <Button size="sm" className="rounded-full gap-1 text-xs">
                Apply Now <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <a href="/drives" className="text-sm font-medium text-primary hover:underline">View all drives →</a>
      </div>
    </div>
  </section>
);

export default WalkinCards;
