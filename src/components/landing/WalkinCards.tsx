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
    <section className="py-16 sm:py-20 bg-[hsl(var(--navy))]">
      <div className="container">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--mint))]">Walk-in Opportunities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[hsl(var(--navy-foreground))]">Today's Walk-in Drives</h2>
            <p className="mt-1 text-sm sm:text-base text-[hsl(var(--navy-foreground))]/60">Featured drives happening now across top cities</p>
          </div>
          <Link to="/drives" className="hidden items-center gap-1 text-sm font-semibold text-[hsl(var(--mint))] hover:underline md:flex">
            View all drives <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                className="group flex flex-col h-full rounded-[1.25rem] bg-white p-8 sm:p-10 shadow-lg shadow-black/10 transition-all duration-300 hover:shadow-2xl hover:shadow-black/15 hover:-translate-y-1"
              >
                {/* Company label - blue uppercase */}
                <span className="mb-6 text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: '#2563EB' }}>
                  {drive.company}
                </span>

                {/* Role - large bold black */}
                <h3 className="mb-4 text-[1.75rem] sm:text-[2rem] font-extrabold leading-[1.15] tracking-[-0.01em]" style={{ color: '#0F172A' }}>
                  {drive.roles?.[0] || drive.title}
                </h3>

                {/* Description - gray text */}
                <p className="mb-8 text-[15px] leading-[1.7]" style={{ color: '#6B7280' }}>
                  {drive.city} · {drive.date}{drive.start_time ? `, ${drive.start_time} – ${drive.end_time || 'TBA'}` : ""}
                </p>

                {/* Gradient CTA pill */}
                <div className="mt-auto">
                  <span className="inline-flex items-center rounded-full px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-[#6C3AED]/20" style={{ background: 'linear-gradient(135deg, #6C3AED 0%, #2563EB 100%)' }}>
                    Apply Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/drives" className="text-sm font-semibold text-[hsl(var(--mint))] hover:underline">View all drives →</Link>
        </div>
      </div>
    </section>
  );
};

export default WalkinCards;
