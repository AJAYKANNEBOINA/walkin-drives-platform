import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { drives as mockDrives } from "@/data/mockData";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { mergeWithFallback } from "@/lib/driveFallback";

interface DriveItem {
  id: string;
  title: string;
  company: string;
  company_initials: string | null;
  city: string;
  date: string;
  roles: string[] | null;
  salary_min: number | null;
  salary_max: number | null;
  experience_min: number | null;
  experience_max: number | null;
  status: string | null;
  is_verified: boolean | null;
  openings: number | null;
  industry: string | null;
}

const formatSalary = (n: number | null) => {
  if (!n) return "";
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
};

const toMockDriveItems = (mockDrives: any[]): DriveItem[] =>
  mockDrives.map((d) => ({
    id: d.id,
    title: d.title,
    company: d.company,
    company_initials: d.companyInitials,
    city: d.city,
    date: d.date,
    roles: d.roles,
    salary_min: d.salaryMin,
    salary_max: d.salaryMax,
    experience_min: d.experienceMin,
    experience_max: d.experienceMax,
    status: d.status,
    is_verified: d.isVerified,
    openings: d.openings,
    industry: d.industry,
  }));

const fallbackDrives = toMockDriveItems(mockDrives);

const getDriveKey = (drive: DriveItem) =>
  [drive.company, drive.title, drive.city, drive.date]
    .map((value) => value.trim().toLowerCase())
    .join("::");

const Drives = () => {
  const [drives, setDrives] = useState<DriveItem[]>(fallbackDrives);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const { data, error } = await supabase
          .from("drives")
          .select("id, title, company, company_initials, city, date, roles, salary_min, salary_max, experience_min, experience_max, status, is_verified, openings, industry")
          .eq("approval_status", "approved")
          .order("date", { ascending: true });

        if (error) throw error;
        setDrives(mergeWithFallback(data ?? [], fallbackDrives, fallbackDrives.length, getDriveKey));
      } catch {
        setDrives(fallbackDrives);
      }
    };

    fetchDrives();
  }, []);

  const filtered = drives.filter((d) => {
    const q = search.toLowerCase();
    return !search ||
      d.title.toLowerCase().includes(q) ||
      d.company.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q) ||
      d.roles?.some((r) => r.toLowerCase().includes(q)) ||
      d.industry?.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="hero-gradient py-10 sm:py-14">
        <div className="container text-center">
          <h1 className="mb-3 text-2xl font-extrabold text-primary-foreground sm:text-3xl md:text-4xl">
            Walk-in Drives
          </h1>
          <p className="mx-auto mb-6 max-w-lg text-sm text-primary-foreground/70 sm:text-base">
            Browse all verified walk-in opportunities across India
          </p>

          {/* Search */}
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Input
                placeholder="Search by company, role, city, domain..."
                className="h-12 rounded-xl border-0 bg-background/95 pl-11 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} drive{filtered.length !== 1 ? "s" : ""} found
        </p>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="mb-4 text-muted-foreground">No drives found matching your search</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((drive, i) => (
              <motion.div
                key={drive.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Link to={`/drives/${drive.id}`} className="block group">
                  <div className="relative rounded-[1.25rem] border border-border bg-card p-7 card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
                    {drive.industry && (
                      <span className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-widest text-primary">
                        {drive.industry}
                      </span>
                    )}

                    <span className="mb-3 block text-sm font-bold uppercase tracking-wide text-primary">
                      {drive.company}
                    </span>

                    <h3 className="mb-3 text-xl font-extrabold leading-tight text-foreground transition-colors group-hover:text-primary">
                      {drive.roles?.[0] || drive.title}
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {drive.roles?.join(", ")} · {drive.city} · {drive.date}
                    </p>

                    {(drive.salary_min || drive.salary_max) && (
                      <p className="mb-5 text-xs font-semibold text-foreground">
                        {formatSalary(drive.salary_min)} – {formatSalary(drive.salary_max)} P.A.
                        {drive.openings && <span className="ml-2 font-normal text-muted-foreground">· {drive.openings} openings</span>}
                      </p>
                    )}

                    <div className="mb-5 flex items-center gap-2">
                      {drive.is_verified && <Badge variant="outline" className="border-primary/20 text-[10px] text-primary">Verified</Badge>}
                      {drive.status === "live" && <Badge variant="outline" className="border-[hsl(var(--mint))]/30 text-[10px] text-[hsl(var(--mint))]">● Live</Badge>}
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-[hsl(var(--purple))] to-[hsl(var(--purple))] px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity group-hover:opacity-90">
                      Apply Now
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Drives;
