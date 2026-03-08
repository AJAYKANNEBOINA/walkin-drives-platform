import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Clock, Briefcase, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { drives as mockDrives, formatSalary } from "@/data/mockData";
import { Link } from "react-router-dom";

interface DriveCard {
  id: string;
  company: string;
  company_initials: string | null;
  title: string;
  roles: string[] | null;
  city: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  salary_min: number | null;
  salary_max: number | null;
  experience_min: number | null;
  experience_max: number | null;
  openings: number | null;
  industry: string | null;
  is_verified: boolean | null;
  is_featured: boolean | null;
  status: string | null;
  registration_count: number | null;
  venue_name: string | null;
}

const WalkinCards = () => {
  const [drives, setDrives] = useState<DriveCard[]>([]);

  useEffect(() => {
    const fetchDrives = async () => {
      const { data } = await supabase
        .from("drives")
        .select("id, company, company_initials, title, roles, city, date, start_time, end_time, salary_min, salary_max, experience_min, experience_max, openings, industry, is_verified, is_featured, status, registration_count, venue_name")
        .eq("approval_status", "approved")
        .order("date", { ascending: true })
        .limit(6);

      if (data && data.length > 0) {
        setDrives(data);
      } else {
        setDrives(mockDrives.slice(0, 6).map((d) => ({
          id: d.id, company: d.company, company_initials: d.companyInitials, title: d.title,
          roles: d.roles, city: d.city, date: d.date, start_time: d.startTime, end_time: d.endTime,
          salary_min: d.salaryMin, salary_max: d.salaryMax, experience_min: d.experienceMin,
          experience_max: d.experienceMax, openings: d.openings, industry: d.industry,
          is_verified: d.isVerified, is_featured: d.isFeatured, status: d.status,
          registration_count: d.registrationCount, venue_name: d.venueName,
        })));
      }
    };
    fetchDrives();
  }, []);

  const fmtSalary = (val: number | null) => {
    if (!val) return "–";
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    return `₹${(val / 1000).toFixed(0)}K`;
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">Walk-in Opportunities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Today's Walk-in Drives</h2>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">Featured drives happening now across top cities</p>
          </div>
          <Link to="/drives" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline md:flex">
            View all drives <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {drives.map((drive, i) => (
            <motion.div
              key={drive.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                to={`/drives/${drive.id}`}
                className="group flex flex-col h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Top: Industry tag + Status */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
                    {drive.industry || drive.company}
                  </span>
                  <div className="flex gap-1.5">
                    {drive.status === "live" && (
                      <Badge variant="outline" className="border-[hsl(var(--mint))]/30 bg-[hsl(var(--mint))]/10 text-[hsl(var(--mint))] text-[10px] gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--mint))] animate-pulse" /> Live
                      </Badge>
                    )}
                    {drive.is_verified && (
                      <Badge variant="outline" className="border-primary/20 bg-primary-light text-primary text-[10px]">Verified</Badge>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-1 text-lg sm:text-xl font-extrabold leading-tight text-foreground group-hover:text-primary transition-colors">
                  {drive.title}
                </h3>

                {/* Company */}
                <p className="mb-3 text-sm font-semibold text-muted-foreground">{drive.company}</p>

                {/* Roles */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {drive.roles?.slice(0, 3).map(r => (
                    <span key={r} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {r}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="mb-5 space-y-2 text-xs text-muted-foreground flex-1">
                  <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary/60" /> {drive.date} · {drive.start_time || "TBA"} – {drive.end_time || "TBA"}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary/60" /> {drive.venue_name || drive.city}</p>
                  <p className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5 text-primary/60" /> {fmtSalary(drive.salary_min)} – {fmtSalary(drive.salary_max)} / year</p>
                  {drive.openings && (
                    <p className="flex items-center gap-2"><Users className="h-3.5 w-3.5 text-primary/60" /> {drive.openings} openings · {drive.registration_count || 0} RSVPs</p>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[hsl(var(--purple))] to-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity group-hover:opacity-90">
                    Apply Now <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/drives" className="text-sm font-semibold text-primary hover:underline">View all drives →</Link>
        </div>
      </div>
    </section>
  );
};

export default WalkinCards;
