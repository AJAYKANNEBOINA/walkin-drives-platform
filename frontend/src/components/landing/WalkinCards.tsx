import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

interface DriveCard {
  id: string;
  company: string;
  title: string;
  roles: string[] | null;
  city: string;
  date: string;
}

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

const WalkinCards = () => {
  const [drives, setDrives] = useState<DriveCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const result = await api.getDrives({ limit: "6" });
        setDrives((result.drives || []).slice(0, 6));
      } catch {
        setDrives([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDrives();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="mb-10">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-primary">Walk-in Opportunities</span>
            <h2 className="text-3xl font-extrabold text-foreground">Today's Walk-in Drives</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-[1.25rem] border border-border bg-card p-7 animate-pulse">
                <div className="h-4 w-20 bg-muted rounded mb-4" />
                <div className="h-6 w-3/4 bg-muted rounded mb-3" />
                <div className="h-4 w-full bg-muted rounded mb-6" />
                <div className="h-10 w-32 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {drives.map((drive, i) => (
            <motion.div
              key={drive.id}
              className="group relative rounded-[1.25rem] border border-border bg-card p-7 card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-wide text-primary">
                {drive.company}
              </span>
              <h3 className="mb-3 text-xl font-extrabold leading-tight text-foreground">
                {drive.roles?.[0] || drive.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {drive.roles?.join(", ")} &middot; {drive.city} &middot; {formatDate(drive.date)}
              </p>
              <a
                href={`/drives/${drive.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-[hsl(var(--purple))] to-[hsl(var(--purple))] px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Apply Now
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a href="/drives" className="text-sm font-medium text-primary hover:underline">View all drives →</a>
        </div>
      </div>
    </section>
  );
};

export default WalkinCards;
