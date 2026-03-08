import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { drives as mockDrives } from "@/data/mockData";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Briefcase, ArrowRight } from "lucide-react";

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
}

const formatSalary = (n: number | null) => {
  if (!n) return "";
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
};

const Drives = () => {
  const [drives, setDrives] = useState<DriveItem[]>([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("drives")
        .select("id, title, company, company_initials, city, date, roles, salary_min, salary_max, experience_min, experience_max, status, is_verified, openings")
        .eq("approval_status", "approved")
        .order("date", { ascending: true });

      if (data && data.length > 0) {
        setDrives(data);
      } else {
        // fallback to mock
        setDrives(mockDrives.map((d) => ({
          id: d.id, title: d.title, company: d.company,
          company_initials: d.companyInitials, city: d.city, date: d.date,
          roles: d.roles, salary_min: d.salaryMin, salary_max: d.salaryMax,
          experience_min: d.experienceMin, experience_max: d.experienceMax,
          status: d.status, is_verified: d.isVerified, openings: d.openings,
        })));
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const cities = [...new Set(drives.map((d) => d.city))];

  const filtered = drives.filter((d) => {
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.company.toLowerCase().includes(search.toLowerCase()) || d.roles?.some((r) => r.toLowerCase().includes(search.toLowerCase()));
    const matchCity = !cityFilter || d.city === cityFilter;
    return matchSearch && matchCity;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="hero-gradient py-10 sm:py-14">
        <div className="container text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-foreground mb-3">
            Walk-in Drives
          </h1>
          <p className="text-primary-foreground/70 text-sm sm:text-base max-w-lg mx-auto mb-6">
            Browse all verified walk-in opportunities across India
          </p>

          {/* Search */}
          <div className="mx-auto max-w-xl flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by role, company..."
                className="pl-10 bg-background/95 border-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="h-10 rounded-md bg-background/95 px-3 text-sm border-0 outline-none"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="">All Cities</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container py-8">
        <p className="text-sm text-muted-foreground mb-6">{filtered.length} drives found</p>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading drives...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No drives found matching your criteria</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((drive, i) => (
              <motion.div
                key={drive.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <Link to={`/drives/${drive.id}`} className="block group">
                  <div className="rounded-xl border border-border bg-card p-5 card-shadow transition-all hover:card-shadow-hover hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-xs font-bold text-primary">
                        {drive.company_initials || drive.company.substring(0, 3).toUpperCase()}
                      </div>
                      <div className="flex gap-1.5">
                        {drive.is_verified && <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">Verified</Badge>}
                        {drive.status === "live" && <Badge variant="outline" className="text-[10px] border-[hsl(var(--mint))]/30 text-[hsl(var(--mint))]">Live</Badge>}
                      </div>
                    </div>

                    <h3 className="font-bold text-foreground mb-1 text-sm group-hover:text-primary transition-colors">{drive.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{drive.company}</p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {drive.city}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {drive.date}</span>
                      {drive.openings && <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {drive.openings} openings</span>}
                    </div>

                    {drive.roles && drive.roles.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {drive.roles.slice(0, 3).map((r) => (
                          <span key={r} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{r}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {(drive.salary_min || drive.salary_max) ? (
                        <span className="text-xs font-semibold text-foreground">
                          {formatSalary(drive.salary_min)} - {formatSalary(drive.salary_max)} P.A.
                        </span>
                      ) : <span />}
                      <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:underline">
                        View <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
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
