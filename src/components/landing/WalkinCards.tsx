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

const fallbackDrives: DriveCard[] = mockDrives.slice(0, 6).map((d) => ({
  id: d.id,
  company: d.company,
  title: d.title,
  roles: d.roles,
  city: d.city,
  date: d.date,
}));

const WalkinCards = () => {
  const [drives, setDrives] = useState<DriveCard[]>(fallbackDrives);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const { data, error } = await supabase
          .from("drives")
          .select("id, company, title, roles, city, date")
          .eq("approval_status", "approved")
          .order("date", { ascending: true })
          .limit(6);

        if (error) throw error;
        if (data && data.length > 0) setDrives(data);
      } catch {
        setDrives(fallbackDrives);
      }
    };
    fetchDrives();
  }, []);

  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.h2
            className="mb-4 text-3xl sm:text-4xl font-extrabold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Today's Walk-in Drives
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Featured drives happening now across top cities
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {drives.map((drive, i) => (
            <motion.a
              key={drive.id}
              href={`/drives/${drive.id}`}
              className="group rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_8px_30px_-12px_hsl(252,56%,57%,0.12)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span className="mb-3 inline-block text-sm font-bold text-primary">
                {drive.company}
              </span>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {drive.roles?.[0] || drive.title}
              </h3>
              <p className="mb-5 text-sm text-muted-foreground">
                {drive.city} · {drive.date}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                View Details <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/drives" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            View all drives <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WalkinCards;
