import { useParams, Link, useNavigate } from "react-router-dom";
import { drives, formatSalary } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  MapPin, Clock, Briefcase, Star, Users, Calendar,
  Share2, Navigation, CheckCircle2, AlertTriangle, ArrowRight
} from "lucide-react";

const DriveDetail = () => {
  const { id } = useParams();
  const drive = drives.find(d => d.id === id);

  if (!drive) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Drive not found</h1>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">← Back to home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const similarDrives = drives.filter(d => d.city === drive.city && d.id !== drive.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[hsl(var(--purple))] via-primary to-[hsl(var(--mint))]/60">
        {/* Animated glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[hsl(var(--purple))]/30 to-primary/20"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container relative py-10 md:py-14">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-primary-foreground/60">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <span>›</span>
            <Link to="/drives" className="hover:text-primary-foreground">Drives</Link>
            <span>›</span>
            <span className="text-primary-foreground">{drive.city}</span>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <motion.h1
                className="mb-3 text-2xl font-extrabold text-primary-foreground md:text-3xl lg:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {drive.title}
              </motion.h1>
              <motion.div
                className="flex flex-wrap items-center gap-3 text-sm text-primary-foreground/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="font-semibold text-primary-foreground">{drive.company}</span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-current text-amber-300" /> {drive.rating}
                </span>
                <span>|</span>
                <span>{drive.reviewCount.toLocaleString()} Reviews</span>
                {drive.isVerified && (
                  <Badge className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground text-[10px]">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
                  </Badge>
                )}
              </motion.div>
            </div>
            <motion.div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15 text-xl font-extrabold text-primary-foreground backdrop-blur-sm md:h-20 md:w-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {drive.companyInitials}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="font-semibold text-foreground">{drive.experienceMin}-{drive.experienceMax} years</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg text-primary">₹</span>
                <div>
                  <p className="text-xs text-muted-foreground">Salary</p>
                  <p className="font-semibold text-foreground">{formatSalary(drive.salaryMin)} - {formatSalary(drive.salaryMax)} P.A.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{drive.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Openings</p>
                  <p className="font-semibold text-foreground">{drive.openings}</p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                Posted: <strong className="text-foreground">{drive.postedAgo}</strong>
                <span className="mx-1">|</span>
                Applicants: <strong className="text-foreground">{drive.registrationCount}</strong>
              </div>
            </motion.div>

            {/* Time & Venue */}
            <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
              <h2 className="mb-4 text-lg font-bold text-foreground">Time and Venue</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-primary" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">{drive.date}</strong>, {drive.startTime} - {drive.endTime}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{drive.venueName}</p>
                    <p className="text-muted-foreground">{drive.venueAddress}</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 gap-2 rounded-full">
                <Navigation className="h-3.5 w-3.5" /> Get Directions
              </Button>
            </div>

            {/* About the Role */}
            <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
              <h2 className="mb-4 text-lg font-bold text-foreground">About the Role</h2>
              <div className="whitespace-pre-line text-sm leading-[1.8] text-muted-foreground">
                {drive.jobDescription}
              </div>

              {/* Must have / Specifications */}
              <h3 className="mb-3 mt-8 text-base font-bold text-foreground">Must have:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {drive.specifications.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                    <span className="leading-relaxed">{spec}</span>
                  </li>
                ))}
              </ul>

              {/* Nice to have - skills */}
              <h3 className="mb-3 mt-8 text-base font-bold text-foreground">Nice to have:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>Strong communication and interpersonal skills</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>Ability to work independently and as part of a team</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                  <span>A positive can-do attitude; willing to learn and grow</span>
                </li>
              </ul>
            </div>

            {/* Documents Required */}
            <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
              <h2 className="mb-4 text-lg font-bold text-foreground">Documents Required</h2>
              <p className="mb-3 text-sm text-muted-foreground">Please carry below mandatory documents for the interview:</p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {drive.documentsRequired.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-[10px] font-bold text-primary">{i + 1}</span>
                    <span className="leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-xs font-semibold text-destructive">
                  Note: Original documents are mandatory. Photocopies or digital copies may not be accepted.
                </p>
              </div>
            </div>

            {/* Role details */}
            <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="text-sm font-semibold text-foreground">{drive.roles.join(", ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Industry Type</p>
                  <p className="text-sm font-semibold text-foreground">{drive.industry}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="text-sm font-semibold text-foreground">{drive.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Employment Type</p>
                  <p className="text-sm font-semibold text-foreground">{drive.employmentType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Education</p>
                  <p className="text-sm font-semibold text-foreground">{drive.education}</p>
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
              <h2 className="mb-4 text-lg font-bold text-foreground">Key Skills</h2>
              <div className="flex flex-wrap gap-2">
                {drive.keySkills.map(skill => (
                  <span key={skill} className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-primary-light hover:text-primary hover:border-primary/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* About Company */}
            <div className="rounded-2xl border border-border bg-secondary/30 p-6">
              <h2 className="mb-3 text-lg font-bold text-foreground">About {drive.company}</h2>
              <p className="text-sm leading-[1.8] text-muted-foreground">{drive.companyAbout}</p>
              <div className="mt-5 border-t border-border pt-4">
                <h3 className="mb-1 text-sm font-bold text-foreground">Company Info</h3>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Address:</strong> {drive.companyAddress}
                </p>
              </div>
            </div>

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
                  {drive.isVerified && (
                    <Badge variant="outline" className="border-primary/20 bg-primary-light text-primary text-xs gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </Badge>
                  )}
                  {drive.status === "live" && (
                    <Badge variant="outline" className="border-[hsl(var(--mint))]/30 bg-[hsl(var(--mint))]/10 text-[hsl(var(--mint))] text-xs">● Live Now</Badge>
                  )}
                  {drive.isFeatured && (
                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 text-xs">Featured</Badge>
                  )}
                </div>

                <div className="mb-5 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{drive.date}</p>
                      <p className="text-xs text-muted-foreground">{drive.startTime} - {drive.endTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{drive.venueName}</p>
                      <p className="text-xs text-muted-foreground">{drive.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{drive.registrationCount} RSVPs</p>
                      <p className="text-xs text-muted-foreground">{drive.openings} openings</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full rounded-full font-semibold" size="lg">
                  RSVP / Register Now
                </Button>
                <Button variant="outline" className="mt-2 w-full rounded-full gap-2" size="lg">
                  <Share2 className="h-4 w-4" /> Share Drive
                </Button>
              </div>

              {/* Similar drives */}
              {similarDrives.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
                  <h3 className="mb-4 text-sm font-bold text-foreground">Similar drives in {drive.city}</h3>
                  <div className="space-y-3">
                    {similarDrives.map(d => (
                      <Link
                        key={d.id}
                        to={`/drives/${d.id}`}
                        className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-secondary"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-xs font-bold text-primary">
                          {d.companyInitials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">{d.company}</p>
                          <p className="truncate text-xs text-muted-foreground">{d.roles[0]}</p>
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
