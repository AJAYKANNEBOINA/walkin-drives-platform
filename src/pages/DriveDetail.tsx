import { useParams, Link } from "react-router-dom";
import { drives, formatSalary } from "@/data/mockData";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Clock, Briefcase, Star, Users, Calendar,
  FileText, Building2, ArrowLeft, Share2, Navigation, CheckCircle2, AlertTriangle
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
          <Link to="/drives" className="mt-4 inline-block text-primary hover:underline">← Back to drives</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>›</span>
            <Link to="/drives" className="hover:text-foreground">Drives</Link>
            <span>›</span>
            <span className="text-foreground">{drive.city}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Main content */}
          <div className="space-y-6">
            {/* Header card */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 card-shadow">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h1 className="mb-2 text-xl font-extrabold text-foreground md:text-2xl">{drive.title}</h1>
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold text-foreground">{drive.company}</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" /> {drive.rating}
                    </span>
                    <span className="text-muted-foreground">| {drive.reviewCount.toLocaleString()} Reviews</span>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" /> {drive.experienceMin}-{drive.experienceMax} years
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1.5">
                      ₹ {formatSalary(drive.salaryMin)} - {formatSalary(drive.salaryMax)} P.A.
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {drive.city}
                  </div>
                </div>

                {/* Company logo placeholder */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary-light text-lg font-extrabold text-primary md:h-20 md:w-20">
                  {drive.companyInitials}
                </div>
              </div>

              {/* Time and Venue */}
              <div className="mt-6 rounded-xl bg-secondary/50 p-4">
                <h3 className="mb-2 text-sm font-bold text-foreground">Time and Venue</h3>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                    {drive.date}, {drive.startTime} - {drive.endTime}
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    {drive.venueName}, {drive.venueAddress}
                  </p>
                </div>
              </div>

              {/* Meta row */}
              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
                <span>Posted: <strong className="text-foreground">{drive.postedAgo}</strong></span>
                <span>|</span>
                <span>Openings: <strong className="text-foreground">{drive.openings}</strong></span>
                <span>|</span>
                <span>Applicants: <strong className="text-foreground">{drive.registrationCount}</strong></span>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" className="rounded-full">Register to RSVP</Button>
                  <Button className="rounded-full">Login to Apply</Button>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 card-shadow">
              <h2 className="mb-4 text-lg font-bold text-foreground">Job Description</h2>
              <div className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {drive.jobDescription}
              </div>

              {/* Specifications */}
              <h3 className="mb-3 mt-6 text-base font-bold text-foreground">Specifications:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {drive.specifications.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                    {spec}
                  </li>
                ))}
              </ul>

              {/* Interview Location */}
              <h3 className="mb-2 mt-6 text-base font-bold text-foreground">Interview Location:</h3>
              <p className="text-sm text-muted-foreground">
                {drive.venueName}, {drive.venueAddress}
              </p>
              <Button variant="outline" size="sm" className="mt-3 gap-2 rounded-full">
                <Navigation className="h-3.5 w-3.5" /> Get Directions
              </Button>

              {/* Documents */}
              <h3 className="mb-3 mt-6 text-base font-bold text-foreground">Please carry below mandatory documents for the interview:</h3>
              <ol className="space-y-1.5 text-sm text-muted-foreground">
                {drive.documentsRequired.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="shrink-0 font-semibold text-foreground">{i + 1})</span>
                    {doc}
                  </li>
                ))}
              </ol>

              {/* Role & Industry info */}
              <div className="mt-8 space-y-2 border-t border-border pt-6 text-sm">
                <p><strong className="text-foreground">Role:</strong> <span className="text-muted-foreground">{drive.roles.join(", ")}</span></p>
                <p><strong className="text-foreground">Industry Type:</strong> <span className="text-muted-foreground">{drive.industry}</span></p>
                <p><strong className="text-foreground">Department:</strong> <span className="text-muted-foreground">{drive.department}</span></p>
                <p><strong className="text-foreground">Employment Type:</strong> <span className="text-muted-foreground">{drive.employmentType}</span></p>
              </div>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 card-shadow">
              <h2 className="mb-2 text-lg font-bold text-foreground">Education</h2>
              <p className="text-sm text-muted-foreground">{drive.education}</p>
            </div>

            {/* Key Skills */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 card-shadow">
              <h2 className="mb-4 text-lg font-bold text-foreground">Key Skills</h2>
              <div className="flex flex-wrap gap-2">
                {drive.keySkills.map(skill => (
                  <span key={skill} className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* About Company */}
            <div className="rounded-2xl border border-border bg-secondary/50 p-6 md:p-8">
              <h2 className="mb-3 text-lg font-bold text-foreground">About {drive.company}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{drive.companyAbout}</p>

              <h3 className="mb-1 mt-5 text-sm font-bold text-foreground">Company Info</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Address:</strong> {drive.companyAddress}
              </p>
            </div>

            {/* Beware notice */}
            <div className="rounded-2xl border border-border bg-secondary/50 p-6 md:p-8">
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
            {/* Sticky RSVP card */}
            <div className="sticky top-20 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
                <div className="mb-4 flex items-center gap-2">
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

                <div className="mb-4 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">{drive.date}</p>
                      <p className="text-xs text-muted-foreground">{drive.startTime} - {drive.endTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">{drive.venueName}</p>
                      <p className="text-xs text-muted-foreground">{drive.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
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
              <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
                <h3 className="mb-4 text-sm font-bold text-foreground">Similar drives in {drive.city}</h3>
                <div className="space-y-3">
                  {drives
                    .filter(d => d.city === drive.city && d.id !== drive.id)
                    .slice(0, 3)
                    .map(d => (
                      <Link
                        key={d.id}
                        to={`/drives/${d.id}`}
                        className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-secondary"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-xs font-bold text-primary">
                          {d.companyInitials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">{d.company}</p>
                          <p className="truncate text-xs text-muted-foreground">{d.roles[0]}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DriveDetail;
