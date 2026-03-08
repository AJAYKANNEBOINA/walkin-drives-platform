import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ArrowLeft, Send, Building2, MapPin, Calendar, Clock, Users, Briefcase, GraduationCap, IndianRupee } from "lucide-react";
import WalkinsLogo from "@/components/WalkinsLogo";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";

const cities = [
  "Bangalore", "Hyderabad", "Chennai", "Mumbai", "Pune", "Delhi NCR",
  "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Kochi", "Coimbatore",
  "Noida", "Gurgaon", "Chandigarh", "Indore", "Bhopal", "Vizag",
];

const industries = [
  "IT / Software", "BPO / KPO", "Banking / Finance", "Healthcare",
  "Manufacturing", "Retail", "Telecom", "Education", "Hospitality", "Other",
];

const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const PostDrive = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      toast.info("Please login to post a drive");
      navigate("/login", { state: { redirectTo: "/post-drive" } });
    }
  }, [user, loading, navigate]);

  const [form, setForm] = useState({
    title: "",
    company: "",
    companyAbout: "",
    companyAddress: "",
    city: "",
    date: "",
    startTime: "",
    endTime: "",
    venueName: "",
    venueAddress: "",
    roles: "",
    openings: "",
    salaryMin: "",
    salaryMax: "",
    experienceMin: "",
    experienceMax: "",
    education: "",
    eligibility: "",
    industry: "",
    department: "",
    employmentType: "",
    jobDescription: "",
    keySkills: "",
    documentsRequired: "",
    specifications: "",
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.company || !form.city || !form.date || !form.roles) {
      toast.error("Please fill all mandatory fields");
      return;
    }

    setSubmitting(true);

    const driveData = {
      title: form.title.trim(),
      company: form.company.trim(),
      company_about: form.companyAbout.trim() || null,
      company_address: form.companyAddress.trim() || null,
      company_initials: form.company.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 3),
      city: form.city,
      date: form.date,
      start_time: form.startTime || null,
      end_time: form.endTime || null,
      venue_name: form.venueName.trim() || null,
      venue_address: form.venueAddress.trim() || null,
      roles: form.roles.split(",").map(r => r.trim()).filter(Boolean),
      openings: form.openings ? parseInt(form.openings) : null,
      salary_min: form.salaryMin ? parseInt(form.salaryMin) : null,
      salary_max: form.salaryMax ? parseInt(form.salaryMax) : null,
      experience_min: form.experienceMin ? parseInt(form.experienceMin) : null,
      experience_max: form.experienceMax ? parseInt(form.experienceMax) : null,
      education: form.education.trim() || null,
      eligibility: form.eligibility.trim() || null,
      industry: form.industry || null,
      department: form.department.trim() || null,
      employment_type: form.employmentType || null,
      job_description: form.jobDescription.trim() || null,
      key_skills: form.keySkills ? form.keySkills.split(",").map(s => s.trim()).filter(Boolean) : null,
      documents_required: form.documentsRequired ? form.documentsRequired.split(",").map(d => d.trim()).filter(Boolean) : null,
      specifications: form.specifications ? form.specifications.split(",").map(s => s.trim()).filter(Boolean) : null,
      posted_by: user?.id || null,
      approval_status: "pending",
      status: "upcoming",
    };

    const { error } = await supabase.from("drives").insert(driveData);
    setSubmitting(false);

    if (error) {
      toast.error("Failed to post drive: " + error.message);
    } else {
      toast.success("Drive submitted! It will be visible after admin approval.");
      navigate("/drives");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="container max-w-3xl py-8 px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Post a Walk-in Drive</h1>
          <p className="text-muted-foreground mt-1">Fill in the details below. Your drive will go live after admin review.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Info */}
          <section className="bg-card rounded-xl border p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Company Details</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Drive Title *</Label>
                <Input id="title" placeholder="e.g. Mega Walk-in for Software Engineers" value={form.title} onChange={e => update("title", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input id="company" placeholder="e.g. Infosys" value={form.company} onChange={e => update("company", e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAbout">About Company</Label>
              <Textarea id="companyAbout" placeholder="Brief description of the company..." value={form.companyAbout} onChange={e => update("companyAbout", e.target.value)} rows={2} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={form.industry} onValueChange={v => update("industry", v)}>
                  <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                  <SelectContent>
                    {industries.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input id="companyAddress" placeholder="Company HQ address" value={form.companyAddress} onChange={e => update("companyAddress", e.target.value)} />
              </div>
            </div>
          </section>

          {/* Drive Schedule */}
          <section className="bg-card rounded-xl border p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Schedule & Venue</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input id="date" type="date" value={form.date} onChange={e => update("date", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input id="startTime" type="time" value={form.startTime} onChange={e => update("startTime", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input id="endTime" type="time" value={form.endTime} onChange={e => update("endTime", e.target.value)} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Select value={form.city} onValueChange={v => update("city", v)}>
                  <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>
                    {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="venueName">Venue Name</Label>
                <Input id="venueName" placeholder="e.g. Infosys Campus, Electronic City" value={form.venueName} onChange={e => update("venueName", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venueAddress">Venue Address</Label>
              <Input id="venueAddress" placeholder="Full address of the walk-in venue" value={form.venueAddress} onChange={e => update("venueAddress", e.target.value)} />
            </div>
          </section>

          {/* Job Details */}
          <section className="bg-card rounded-xl border p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Job Details</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="roles">Roles / Positions * <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
                <Input id="roles" placeholder="e.g. Software Engineer, QA Tester" value={form.roles} onChange={e => update("roles", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="openings">Number of Openings</Label>
                <Input id="openings" type="number" min="1" placeholder="e.g. 50" value={form.openings} onChange={e => update("openings", e.target.value)} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select value={form.employmentType} onValueChange={v => update("employmentType", v)}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {employmentTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="e.g. Engineering, Support" value={form.department} onChange={e => update("department", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea id="jobDescription" placeholder="Detailed description of the role, responsibilities..." value={form.jobDescription} onChange={e => update("jobDescription", e.target.value)} rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keySkills">Key Skills <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
              <Input id="keySkills" placeholder="e.g. Java, React, SQL, Communication" value={form.keySkills} onChange={e => update("keySkills", e.target.value)} />
            </div>
          </section>

          {/* Salary & Experience */}
          <section className="bg-card rounded-xl border p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Salary & Experience</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Salary Range (₹/year)</Label>
                <div className="flex gap-2">
                  <Input type="number" min="0" placeholder="Min" value={form.salaryMin} onChange={e => update("salaryMin", e.target.value)} />
                  <Input type="number" min="0" placeholder="Max" value={form.salaryMax} onChange={e => update("salaryMax", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Experience (years)</Label>
                <div className="flex gap-2">
                  <Input type="number" min="0" placeholder="Min" value={form.experienceMin} onChange={e => update("experienceMin", e.target.value)} />
                  <Input type="number" min="0" placeholder="Max" value={form.experienceMax} onChange={e => update("experienceMax", e.target.value)} />
                </div>
              </div>
            </div>
          </section>

          {/* Eligibility */}
          <section className="bg-card rounded-xl border p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Eligibility & Requirements</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input id="education" placeholder="e.g. B.Tech / B.E / MCA" value={form.education} onChange={e => update("education", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eligibility">Eligibility Criteria</Label>
                <Input id="eligibility" placeholder="e.g. 60% aggregate, no backlogs" value={form.eligibility} onChange={e => update("eligibility", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentsRequired">Documents Required <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
              <Input id="documentsRequired" placeholder="e.g. Resume, ID proof, Passport photos" value={form.documentsRequired} onChange={e => update("documentsRequired", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specifications">Other Specifications <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
              <Input id="specifications" placeholder="e.g. Dress code: Formal, Bring laptop" value={form.specifications} onChange={e => update("specifications", e.target.value)} />
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button type="button" variant="outline" className="rounded-lg" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" className="rounded-lg font-semibold gap-2" disabled={submitting}>
              {submitting ? "Submitting..." : <><Send className="h-4 w-4" /> Submit Drive for Review</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDrive;
