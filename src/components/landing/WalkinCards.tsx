import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { drives as mockDrives } from "@/data/mockData";

interface DriveCard {
  id: string;
  company: string;
  title: string;
  roles: string[] | null;
  city: string;
  date: string;
}

const WalkinCards = () => {
  const [drives, setDrives] = useState<DriveCard[]>([]);

  useEffect(() => {
    const fetchDrives = async () => {
      const { data } = await supabase
        .from("drives")
        .select("id, company, title, roles, city, date")
        .eq("approval_status", "approved")
        .order("date", { ascending: true })
        .limit(6);

      if (data && data.length > 0) {
        setDrives(data);
      } else {
        // Fallback to mock data if no approved drives yet
        setDrives(mockDrives.slice(0, 6).map((d) => ({
          id: d.id, company: d.company, title: d.title,
          roles: d.roles, city: d.city, date: d.date,
        })));
      }
    };
    fetchDrives();
  }, []);

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
                {drive.roles?.join(", ")} · {drive.city} · {drive.date}
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
