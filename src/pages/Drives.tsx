import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { drives as mockDrives } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Briefcase, ArrowRight, Users, Clock } from "lucide-react";
import { toast } from "sonner";

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
  is_featured: boolean | null;
  openings: number | null;
  industry: string | null;
  registration_count: number | null;
  venue_name: string | null;
  start_time: string | null;
  end_time: string | null;
}

const formatSalary = (n: number | null) => {
  if (!n) return "";
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
};

const statusTabs = [
  { label: "All", value: "" },
  { label: "Live Now", value: "live" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
];

const Drives = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [drives, setDrives] = useState<DriveItem[]>([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("drives")
        .select("id, title, company, company_initials, city, date, roles, salary_min, salary_max, experience_min, experience_max, status, is_verified, is_featured, openings, industry, registration_count, venue_name, start_time, end_time")
        .eq("approval_status", "approved")
        .order("date", { ascending: true });

      if (data && data.length > 0) {
        setDrives(data);
      } else {
        setDrives(mockDrives.map((d) => ({
          id: d.id, title: d.title, company: d.company,
          company_initials: d.companyInitials, city: d.city, date: d.date,
          roles: d.roles, salary_min: d.salaryMin, salary_max: d.salaryMax,
          experience_min: d.experienceMin, experience_max: d.experienceMax,
          status: d.status, is_verified: d.isVerified, is_featured: d.isFeatured,
          openings: d.openings, industry: d.industry, registration_count: d.registrationCount,
          venue_name: d.venueName, start_time: d.startTime, end_time: d.endTime,
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const cities = [...new Set(drives.map((d) => d.city))].sort();
  const industries = [...new Set(drives.map((d) => d.industry).filter(Boolean))].sort();

  const filtered = drives.filter((d) => {
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.company.toLowerCase().includes(search.toLowerCase()) || d.roles?.some((r) => r.toLowerCase().includes(search.toLowerCase()));
    const matchCity = !cityFilter || d.city === cityFilter;
    const matchStatus = !statusFilter || d.status === statusFilter;
    const matchIndustry = !industryFilter || d.industry === industryFilter;
    return matchSearch && matchCity && matchStatus && matchIndustry;
  });

  const handleApply = (driveId: string) => {
    if (!user) {
      toast.info("Please login to apply for this drive");
      navigate("/login", { state: { redirectTo: `/drives/${driveId}` } });
    } else {
      navigate(`/drives/${driveId}`);
    }
  };

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
          <div className="mx-auto max-w-2xl flex flex-col sm:flex-row gap-2">
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
            <select
              className="h-10 rounded-md bg-background/95 px-3 text-sm border-0 outline-none"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="">All Domains</option>
              {industries.map((ind) => <option key={ind} value={ind!}>{ind}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container flex gap-1 overflow-x-auto py-2">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === tab.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((drive, i) => (
              <motion.div
                key={drive.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <div className="group flex flex-col h-full rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  {/* Top */}
                  <div className="flex items-center justify-between mb-3">
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

                  {/* Title & Company */}
                  <Link to={`/drives/${drive.id}`}>
                    <h3 className="mb-1 text-lg font-extrabold leading-tight text-foreground group-hover:text-primary transition-colors">
                      {drive.title}
                    </h3>
                  </Link>
                  <p className="mb-3 text-sm font-semibold text-muted-foreground">{drive.company}</p>

                  {/* Roles */}
                  {drive.roles && drive.roles.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {drive.roles.slice(0, 3).map((r) => (
                        <span key={r} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">{r}</span>
                      ))}
                    </div>
                  )}

                  {/* Details */}
                  <div className="mb-5 space-y-2 text-xs text-muted-foreground flex-1">
                    <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary/60" /> {drive.date} · {drive.start_time || "TBA"} – {drive.end_time || "TBA"}</p>
                    <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary/60" /> {drive.venue_name || drive.city}</p>
                    {(drive.salary_min || drive.salary_max) && (
                      <p className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5 text-primary/60" /> {formatSalary(drive.salary_min)} – {formatSalary(drive.salary_max)} / year</p>
                    )}
                    {drive.openings && (
                      <p className="flex items-center gap-2"><Users className="h-3.5 w-3.5 text-primary/60" /> {drive.openings} openings · {drive.registration_count || 0} RSVPs</p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto flex items-center gap-2">
                    <Link to={`/drives/${drive.id}`} className="flex-1">
                      <Button variant="outline" className="w-full rounded-full text-sm">View Details</Button>
                    </Link>
                    <Button
                      className="flex-1 rounded-full bg-gradient-to-r from-[hsl(var(--purple))] to-primary text-primary-foreground text-sm font-semibold"
                      onClick={() => handleApply(drive.id)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
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
