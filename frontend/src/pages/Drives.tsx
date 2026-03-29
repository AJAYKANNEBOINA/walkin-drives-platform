import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, X } from "lucide-react";

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
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  return `${(n / 1000).toFixed(0)}K`;
};

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

const CITIES = ["All", "Hyderabad", "Bangalore", "Chennai", "Pune", "Mumbai", "Delhi NCR", "Kolkata", "Ahmedabad", "Jaipur", "Kochi"];
const INDUSTRIES = ["All", "IT Services", "BPO / BPM", "Customer Support", "Product / SaaS", "Consulting", "Data & Analytics"];

const Drives = () => {
  const [drives, setDrives] = useState<DriveItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const fetchDrives = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (selectedCity !== "All") params.city = selectedCity;
      if (selectedIndustry !== "All") params.industry = selectedIndustry;
      if (search) params.search = search;

      const result = await api.getDrives(params);
      setDrives(result.drives || []);
    } catch {
      setDrives([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, [selectedCity, selectedIndustry]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDrives();
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCity("All");
    setSelectedIndustry("All");
  };

  const hasActiveFilters = selectedCity !== "All" || selectedIndustry !== "All" || search !== "";

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
          <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by company, role, city, skills..."
                  className="h-12 rounded-xl border-0 bg-background/95 pl-10 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button type="submit" className="h-12 rounded-xl px-6">Search</Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-xl bg-background/95 border-0"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="border-b bg-card">
          <div className="container py-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Filters</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                  <X className="h-3 w-3 mr-1" /> Clear All
                </Button>
              )}
            </div>

            {/* City Filter */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> City
              </p>
              <div className="flex flex-wrap gap-2">
                {CITIES.map(city => (
                  <Button
                    key={city}
                    variant={selectedCity === city ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs h-8"
                    onClick={() => setSelectedCity(city)}
                  >
                    {city}
                  </Button>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Industry</p>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map(ind => (
                  <Button
                    key={ind}
                    variant={selectedIndustry === ind ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs h-8"
                    onClick={() => setSelectedIndustry(ind)}
                  >
                    {ind}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* City Tabs (always visible) */}
      <div className="border-b bg-card/50">
        <div className="container py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CITIES.map(city => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "ghost"}
                size="sm"
                className={`rounded-full text-xs h-7 ${selectedCity === city ? '' : 'text-muted-foreground'}`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        <p className="mb-6 text-sm text-muted-foreground">
          {loading ? "Loading..." : `${drives.length} drive${drives.length !== 1 ? "s" : ""} found`}
          {hasActiveFilters && !loading && (
            <button onClick={clearFilters} className="ml-2 text-primary hover:underline text-xs">
              Clear filters
            </button>
          )}
        </p>

        {!loading && drives.length === 0 ? (
          <div className="py-20 text-center">
            <p className="mb-4 text-muted-foreground">No drives found matching your search</p>
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {drives.map((drive, i) => (
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
                      {drive.roles?.join(", ")} &middot; {drive.city} &middot; {formatDate(drive.date)}
                    </p>

                    {(drive.salary_min || drive.salary_max) && (
                      <p className="mb-5 text-xs font-semibold text-foreground">
                        &#8377;{formatSalary(drive.salary_min)} &ndash; &#8377;{formatSalary(drive.salary_max)} P.A.
                        {drive.openings && <span className="ml-2 font-normal text-muted-foreground">&middot; {drive.openings} openings</span>}
                      </p>
                    )}

                    <div className="mb-5 flex items-center gap-2">
                      {drive.is_verified && <Badge variant="outline" className="border-primary/20 text-[10px] text-primary">Verified</Badge>}
                      {drive.status === "live" && <Badge variant="outline" className="border-[hsl(var(--mint))]/30 text-[10px] text-[hsl(var(--mint))]">Live</Badge>}
                      {drive.status === "upcoming" && <Badge variant="outline" className="border-blue-200 text-[10px] text-blue-600">Upcoming</Badge>}
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-[hsl(var(--purple))] to-[hsl(var(--purple))] px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity group-hover:opacity-90">
                      View Details
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
