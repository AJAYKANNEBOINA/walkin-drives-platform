import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  MapPin, Clock, Briefcase, Star, Users, Calendar,
  Share2, Navigation, CheckCircle2, AlertTriangle, ArrowRight, Loader2,
  ExternalLink, Send
} from "lucide-react";

interface DriveData {
  id: string;
  title: string;
  company: string;
  company_initials: string | null;
  company_about: string | null;
  company_address: string | null;
  city: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  venue_name: string | null;
  venue_address: string | null;
  roles: string[] | null;
  salary_min: number | null;
  salary_max: number | null;
  experience_min: number | null;
  experience_max: number | null;
  openings: number | null;
  registration_count: number | null;
  is_verified: boolean | null;
  is_featured: boolean | null;
  status: string | null;
  rating: number | null;
  review_count: number | null;
  job_description: string | null;
  specifications: string[] | null;
  documents_required: string[] | null;
  key_skills: string[] | null;
  industry: string | null;
  department: string | null;
  employment_type: string | null;
  education: string | null;
  eligibility: string | null;
  apply_url: string | null;
}

const fmtSalary = (v: number | null) => {
  if (!v) return "N/A";
  if (v >= 100000) return `${(v / 100000).toFixed(1)}L`;
  return `${(v / 1000).toFixed(0)}K`;
};

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

const DriveDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [drive, setDrive] = useState<DriveData | null>(null);
  const [similarDrives, setSimilarDrives] = useState<DriveData[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Apply form state
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyForm, setApplyForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_note: ""
  });

  useEffect(() => {
    const fetchDrive = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const data = await api.getDrive(id!);
        setDrive(data);

        const similar = await api.getSimilarDrives(id!);
        setSimilarDrives(similar || []);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDrive();
  }, [id]);

  useEffect(() => {
    if (user) {
      setApplyForm(prev => ({
        ...prev,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || ""
      }));
    }
  }, [user]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.full_name || !applyForm.email) {
      toast.error("Name and email are required");
      return;
    }

    setApplying(true);
    try {
      await api.submitApplication({
        drive_id: id!,
        full_name: applyForm.full_name,
        email: applyForm.email,
        phone: applyForm.phone,
        cover_note: applyForm.cover_note
      });
      toast.success("Application submitted! Check your email for confirmation.");
      setShowApplyForm(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit application");
    } finally {
      setApplying(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${drive?.company} - ${drive?.title}`,
        text: `Check out this walk-in drive at ${drive?.company} in ${drive?.city}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !drive) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Drive not found</h1>
          <Link to="/drives" className="mt-4 inline-block text-primary hover:underline">Browse all drives</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const initials = drive.company_initials || drive.company.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[hsl(var(--purple))] via-primary to-[hsl(var(--mint))]/60">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[hsl(var(--purple))]/30 to-primary/20"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container relative py-10 md:py-14">
          <div className="mb-6 flex items-center gap-2 text-sm text-primary-foreground/60">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <span>&rsaquo;</span>
            <Link to="/drives" className="hover:text-primary-foreground">Drives</Link>
            <span>&rsaquo;</span>
            <span className="text-primary-foreground">{drive.city}</span>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <motion.h1
                className="mb-3 text-2xl font-extrabold text-primary-foreground md:text-3xl lg:text-4xl"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              >
                {drive.title}
              </motion.h1>
              <motion.div
                className="flex flex-wrap items-center gap-3 text-sm text-primary-foreground/80"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="font-semibold text-primary-foreground">{drive.company}</span>
                {drive.rating && (
                  <>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-current text-amber-300" /> {drive.rating}
                    </span>
                    <span>|</span>
                    <span>{(drive.review_count || 0).toLocaleString()} Reviews</span>
                  </>
                )}
                {drive.is_verified && (
                  <Badge className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground text-[10px]">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
                  </Badge>
                )}
              </motion.div>
            </div>
            <motion.div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15 text-xl font-extrabold text-primary-foreground backdrop-blur-sm md:h-20 md:w-20"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
            >
              {initials}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <div className="space-y-6">
            {/* Quick info bar */}
            <motion.div
              className="flex flex-wrap gap-6 rounded-2xl border border-border bg-card p-5 card-shadow text-sm"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            >
              {(drive.experience_min != null || drive.experience_max != null) && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="font-semibold text-foreground">{drive.experience_min || 0}-{drive.experience_max || 0} years</p>
                  </div>
                </div>
              )}
              {(drive.salary_min || drive.salary_max) && (
                <div className="flex items-center gap-2">
                  <span className="text-lg text-primary">&#8377;</span>
                  <div>
                    <p className="text-xs text-muted-foreground">Salary</p>
                    <p className="font-semibold text-foreground">&#8377;{fmtSalary(drive.salary_min)} - &#8377;{fmtSalary(drive.salary_max)} P.A.</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{drive.city}</p>
                </div>
              </div>
              {drive.openings && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Openings</p>
                    <p className="font-semibold text-foreground">{drive.openings}</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Time & Venue */}
            {(drive.venue_name || drive.start_time) && (
              <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
                <h2 className="mb-4 text-lg font-bold text-foreground">Time and Venue</h2>
                <div className="space-y-3 text-sm">
                  {drive.start_time && (
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 text-primary" />
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">{formatDate(drive.date)}</strong>, {drive.start_time}{drive.end_time ? ` - ${drive.end_time}` : ""}
                      </p>
                    </div>
                  )}
                  {drive.venue_name && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">{drive.venue_name}</p>
                        {drive.venue_address && <p className="text-muted-foreground">{drive.venue_address}</p>}
                      </div>
                    </div>
                  )}
                </div>
                {drive.venue_address && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(drive.venue_address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="mt-4 gap-2 rounded-full">
                      <Navigation className="h-3.5 w-3.5" /> Get Directions
                    </Button>
                  </a>
                )}
              </div>
            )}

            {/* About the Role */}
            {drive.job_description && (
              <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
                <h2 className="mb-4 text-lg font-bold text-foreground">About the Role</h2>
                <div className="whitespace-pre-line text-sm leading-[1.8] text-muted-foreground">
                  {drive.job_description}
                </div>
                {drive.specifications && drive.specifications.length > 0 && (
                  <>
                    <h3 className="mb-3 mt-8 text-base font-bold text-foreground">Details:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {drive.specifications.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                          <span className="leading-relaxed">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {/* Documents Required */}
            {drive.documents_required && drive.documents_required.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
                <h2 className="mb-4 text-lg font-bold text-foreground">Documents Required</h2>
                <p className="mb-3 text-sm text-muted-foreground">Please carry these mandatory documents for the interview:</p>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {drive.documents_required.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{i + 1}</span>
                      <span className="leading-relaxed">{doc}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Key Skills */}
            {drive.key_skills && drive.key_skills.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
                <h2 className="mb-4 text-lg font-bold text-foreground">Key Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {drive.key_skills.map(skill => (
                    <span key={skill} className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* About Company */}
            {drive.company_about && (
              <div className="rounded-2xl border border-border bg-secondary/30 p-6">
                <h2 className="mb-3 text-lg font-bold text-foreground">About {drive.company}</h2>
                <p className="text-sm leading-[1.8] text-muted-foreground">{drive.company_about}</p>
                {drive.company_address && (
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Address:</strong> {drive.company_address}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Beware notice */}
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <h3 className="mb-1 text-base font-bold text-foreground">Beware of imposters!</h3>
                  <p className="text-sm text-muted-foreground">
                    WALKINS does not promise a job or an interview in exchange of money. Fraudsters may ask you to pay in the pretext of registration fee, refundable fee, etc. Please be cautious and report any suspicious activity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-20 space-y-6">
              {/* RSVP Card */}
              <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {drive.is_verified && (
                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </Badge>
                  )}
                  {drive.status === "live" && (
                    <Badge variant="outline" className="border-[hsl(var(--mint))]/30 bg-[hsl(var(--mint))]/10 text-[hsl(var(--mint))] text-xs">Live Now</Badge>
                  )}
                  {drive.is_featured && (
                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 text-xs">Featured</Badge>
                  )}
                </div>

                <div className="mb-5 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{formatDate(drive.date)}</p>
                      {drive.start_time && <p className="text-xs text-muted-foreground">{drive.start_time}{drive.end_time ? ` - ${drive.end_time}` : ""}</p>}
                    </div>
                  </div>
                  {drive.venue_name && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">{drive.venue_name}</p>
                        <p className="text-xs text-muted-foreground">{drive.city}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{drive.registration_count || 0} RSVPs</p>
                      {drive.openings && <p className="text-xs text-muted-foreground">{drive.openings} openings</p>}
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                {drive.apply_url ? (
                  <a href={drive.apply_url} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full rounded-full font-semibold gap-2" size="lg">
                      Apply on Company Website <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                ) : (
                  <Button
                    className="w-full rounded-full font-semibold gap-2"
                    size="lg"
                    onClick={() => setShowApplyForm(!showApplyForm)}
                  >
                    {showApplyForm ? "Cancel" : "Apply / RSVP Now"}
                  </Button>
                )}

                {/* Apply Form */}
                {showApplyForm && !drive.apply_url && (
                  <form onSubmit={handleApply} className="mt-4 space-y-3 border-t pt-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Full Name *</Label>
                      <Input
                        value={applyForm.full_name}
                        onChange={e => setApplyForm({ ...applyForm, full_name: e.target.value })}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Email *</Label>
                      <Input
                        type="email"
                        value={applyForm.email}
                        onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                        placeholder="you@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Phone</Label>
                      <Input
                        value={applyForm.phone}
                        onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Note (optional)</Label>
                      <Textarea
                        value={applyForm.cover_note}
                        onChange={e => setApplyForm({ ...applyForm, cover_note: e.target.value })}
                        placeholder="Brief about yourself..."
                        rows={2}
                      />
                    </div>
                    <Button type="submit" className="w-full rounded-full gap-2" disabled={applying}>
                      {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      {applying ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                )}

                <Button variant="outline" className="mt-2 w-full rounded-full gap-2" size="lg" onClick={handleShare}>
                  <Share2 className="h-4 w-4" /> Share Drive
                </Button>
              </div>

              {/* Similar drives */}
              {similarDrives.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
                  <h3 className="mb-4 text-sm font-bold text-foreground">Similar drives in {drive.city}</h3>
                  <div className="space-y-3">
                    {similarDrives.map((d: any) => (
                      <Link
                        key={d.id}
                        to={`/drives/${d.id}`}
                        className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-secondary"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                          {d.company_initials || d.company?.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">{d.company}</p>
                          <p className="truncate text-xs text-muted-foreground">{d.roles?.[0] || d.title}</p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DriveDetail;
