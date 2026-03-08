import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Check, X, Upload, Sparkles, LogOut, ArrowLeft, Users, FileText, Mail } from "lucide-react";

interface DriveRow {
  id: string;
  title: string;
  company: string;
  city: string;
  date: string;
  approval_status: string | null;
  status: string | null;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [drives, setDrives] = useState<DriveRow[]>([]);
  const [subscribers, setSubscribers] = useState<{ id: string; email: string; subscribed_at: string }[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // AI extraction state
  const [extracting, setExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<Record<string, string | string[]> | null>(null);

  // New drive form
  const [form, setForm] = useState({
    title: "", company: "", company_initials: "", company_about: "", company_address: "",
    city: "", date: "", start_time: "", end_time: "", venue_name: "", venue_address: "",
    roles: "", eligibility: "", salary_min: "", salary_max: "", experience_min: "", experience_max: "",
    documents_required: "", openings: "", industry: "", department: "", employment_type: "",
    education: "", key_skills: "", job_description: "", specifications: "",
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchDrives();
      fetchSubscribers();
    }
  }, [isAdmin]);

  const fetchDrives = async () => {
    const { data } = await supabase
      .from("drives")
      .select("id, title, company, city, date, approval_status, status, created_at")
      .order("created_at", { ascending: false });
    setDrives(data || []);
    setLoadingData(false);
  };

  const fetchSubscribers = async () => {
    const { data } = await supabase
      .from("email_subscribers")
      .select("id, email, subscribed_at")
      .order("subscribed_at", { ascending: false });
    setSubscribers(data || []);
  };

  const handleApproval = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase
      .from("drives")
      .update({ approval_status: status, is_verified: status === "approved" })
      .eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success(`Drive ${status}`);
      fetchDrives();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExtracting(true);
    setExtractedData(null);

    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const { data, error } = await supabase.functions.invoke("extract-drive-from-image", {
        body: { image: base64 },
      });

      if (error) throw error;

      const extracted = data?.extracted;
      if (extracted) {
        setExtractedData(extracted);
        setForm((prev) => ({
          ...prev,
          title: extracted.title || prev.title,
          company: extracted.company || prev.company,
          city: extracted.city || prev.city,
          date: extracted.date || prev.date,
          start_time: extracted.start_time || prev.start_time,
          end_time: extracted.end_time || prev.end_time,
          venue_name: extracted.venue_name || prev.venue_name,
          venue_address: extracted.venue_address || prev.venue_address,
          roles: Array.isArray(extracted.roles) ? extracted.roles.join(", ") : extracted.roles || prev.roles,
          eligibility: extracted.eligibility || prev.eligibility,
          salary_min: extracted.salary_min?.toString() || prev.salary_min,
          salary_max: extracted.salary_max?.toString() || prev.salary_max,
          experience_min: extracted.experience_min?.toString() || prev.experience_min,
          experience_max: extracted.experience_max?.toString() || prev.experience_max,
          documents_required: Array.isArray(extracted.documents_required) ? extracted.documents_required.join(", ") : extracted.documents_required || prev.documents_required,
          openings: extracted.openings?.toString() || prev.openings,
          industry: extracted.industry || prev.industry,
          department: extracted.department || prev.department,
          employment_type: extracted.employment_type || prev.employment_type,
          education: extracted.education || prev.education,
          key_skills: Array.isArray(extracted.key_skills) ? extracted.key_skills.join(", ") : extracted.key_skills || prev.key_skills,
          job_description: extracted.job_description || prev.job_description,
          specifications: Array.isArray(extracted.specifications) ? extracted.specifications.join("\n") : extracted.specifications || prev.specifications,
        }));
        toast.success("Details extracted from image!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to extract details");
    } finally {
      setExtracting(false);
    }
  };

  const handleSubmitDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.city || !form.date) {
      toast.error("Title, Company, City and Date are required");
      return;
    }

    const { error } = await supabase.from("drives").insert({
      title: form.title,
      company: form.company,
      company_initials: form.company_initials || form.company.substring(0, 3).toUpperCase(),
      company_about: form.company_about,
      company_address: form.company_address,
      city: form.city,
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time,
      venue_name: form.venue_name,
      venue_address: form.venue_address,
      roles: form.roles ? form.roles.split(",").map((r) => r.trim()) : null,
      eligibility: form.eligibility,
      salary_min: form.salary_min ? parseInt(form.salary_min) : null,
      salary_max: form.salary_max ? parseInt(form.salary_max) : null,
      experience_min: form.experience_min ? parseInt(form.experience_min) : null,
      experience_max: form.experience_max ? parseInt(form.experience_max) : null,
      documents_required: form.documents_required ? form.documents_required.split(",").map((d) => d.trim()) : null,
      openings: form.openings ? parseInt(form.openings) : null,
      industry: form.industry,
      department: form.department,
      employment_type: form.employment_type,
      education: form.education,
      key_skills: form.key_skills ? form.key_skills.split(",").map((s) => s.trim()) : null,
      job_description: form.job_description,
      specifications: form.specifications ? form.specifications.split("\n").filter(Boolean) : null,
      approval_status: "approved",
      is_verified: true,
      posted_by: user?.id,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Drive posted successfully!");
      setForm({
        title: "", company: "", company_initials: "", company_about: "", company_address: "",
        city: "", date: "", start_time: "", end_time: "", venue_name: "", venue_address: "",
        roles: "", eligibility: "", salary_min: "", salary_max: "", experience_min: "", experience_max: "",
        documents_required: "", openings: "", industry: "", department: "", employment_type: "",
        education: "", key_skills: "", job_description: "", specifications: "",
      });
      setExtractedData(null);
      fetchDrives();
    }
  };

  if (loading || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  const pendingDrives = drives.filter((d) => d.approval_status === "pending");
  const approvedDrives = drives.filter((d) => d.approval_status === "approved");
  const rejectedDrives = drives.filter((d) => d.approval_status === "rejected");

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-extrabold text-primary-foreground">W</span>
              </div>
              <span className="text-lg font-bold">Admin Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">{user?.email}</Badge>
            <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingDrives.length}</p>
                <p className="text-xs text-muted-foreground">Pending Approval</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{approvedDrives.length}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{drives.length}</p>
                <p className="text-xs text-muted-foreground">Total Drives</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{subscribers.length}</p>
                <p className="text-xs text-muted-foreground">Subscribers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending ({pendingDrives.length})</TabsTrigger>
            <TabsTrigger value="post">Post Drive</TabsTrigger>
            <TabsTrigger value="all">All Drives</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          </TabsList>

          {/* Pending Approval */}
          <TabsContent value="pending" className="space-y-4">
            {pendingDrives.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No drives pending approval</CardContent></Card>
            ) : (
              pendingDrives.map((drive) => (
                <Card key={drive.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{drive.title}</h3>
                      <p className="text-sm text-muted-foreground">{drive.company} · {drive.city} · {drive.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproval(drive.id, "approved")}>
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleApproval(drive.id, "rejected")}>
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Post Drive with AI */}
          <TabsContent value="post">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> Post New Drive
                </CardTitle>
                <p className="text-sm text-muted-foreground">Upload a screenshot of a job post to auto-fill details using AI, or fill manually.</p>
              </CardHeader>
              <CardContent>
                {/* AI Image Upload */}
                <div className="mb-8 p-6 border-2 border-dashed rounded-xl text-center bg-muted/30">
                  <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium mb-2">Upload Job Post Screenshot</p>
                  <p className="text-xs text-muted-foreground mb-4">AI will extract all drive details automatically</p>
                  <Input
                    type="file"
                    accept="image/*"
                    className="max-w-xs mx-auto"
                    onChange={handleImageUpload}
                    disabled={extracting}
                  />
                  {extracting && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                      <Sparkles className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Extracting details with AI...</span>
                    </div>
                  )}
                  {extractedData && (
                    <Badge className="mt-3 bg-green-100 text-green-700 border-green-200">✓ Details extracted — review below</Badge>
                  )}
                </div>

                {/* Drive Form */}
                <form onSubmit={handleSubmitDrive} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>City *</Label>
                      <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Date *</Label>
                      <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} placeholder="09:00 AM" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} placeholder="04:00 PM" />
                    </div>
                    <div className="space-y-2">
                      <Label>Venue Name</Label>
                      <Input value={form.venue_name} onChange={(e) => setForm({ ...form, venue_name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Venue Address</Label>
                      <Input value={form.venue_address} onChange={(e) => setForm({ ...form, venue_address: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Roles (comma separated)</Label>
                      <Input value={form.roles} onChange={(e) => setForm({ ...form, roles: e.target.value })} placeholder="Developer, QA, DevOps" />
                    </div>
                    <div className="space-y-2">
                      <Label>Eligibility</Label>
                      <Input value={form.eligibility} onChange={(e) => setForm({ ...form, eligibility: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Min Salary (₹)</Label>
                      <Input type="number" value={form.salary_min} onChange={(e) => setForm({ ...form, salary_min: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Salary (₹)</Label>
                      <Input type="number" value={form.salary_max} onChange={(e) => setForm({ ...form, salary_max: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Min Experience (years)</Label>
                      <Input type="number" value={form.experience_min} onChange={(e) => setForm({ ...form, experience_min: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Experience (years)</Label>
                      <Input type="number" value={form.experience_max} onChange={(e) => setForm({ ...form, experience_max: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Openings</Label>
                      <Input type="number" value={form.openings} onChange={(e) => setForm({ ...form, openings: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="IT Services" />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <Input value={form.employment_type} onChange={(e) => setForm({ ...form, employment_type: e.target.value })} placeholder="Full Time, Permanent" />
                    </div>
                    <div className="space-y-2">
                      <Label>Education</Label>
                      <Input value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Key Skills (comma separated)</Label>
                      <Input value={form.key_skills} onChange={(e) => setForm({ ...form, key_skills: e.target.value })} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Documents Required (comma separated)</Label>
                    <Input value={form.documents_required} onChange={(e) => setForm({ ...form, documents_required: e.target.value })} />
                  </div>

                  <div className="space-y-2">
                    <Label>Job Description</Label>
                    <Textarea rows={4} value={form.job_description} onChange={(e) => setForm({ ...form, job_description: e.target.value })} />
                  </div>

                  <div className="space-y-2">
                    <Label>Specifications (one per line)</Label>
                    <Textarea rows={4} value={form.specifications} onChange={(e) => setForm({ ...form, specifications: e.target.value })} />
                  </div>

                  <Button type="submit" className="w-full rounded-lg font-semibold" size="lg">
                    Post Drive (Auto-Approved)
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Drives */}
          <TabsContent value="all" className="space-y-3">
            {drives.map((drive) => (
              <Card key={drive.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{drive.title}</h3>
                    <p className="text-sm text-muted-foreground">{drive.company} · {drive.city} · {drive.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={drive.approval_status === "approved" ? "default" : drive.approval_status === "rejected" ? "destructive" : "secondary"}>
                      {drive.approval_status}
                    </Badge>
                    {drive.approval_status !== "approved" && (
                      <Button size="sm" variant="outline" onClick={() => handleApproval(drive.id, "approved")}>Approve</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {drives.length === 0 && (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No drives yet</CardContent></Card>
            )}
          </TabsContent>

          {/* Subscribers */}
          <TabsContent value="subscribers">
            <Card>
              <CardHeader><CardTitle>Email Subscribers ({subscribers.length})</CardTitle></CardHeader>
              <CardContent>
                {subscribers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No subscribers yet</p>
                ) : (
                  <div className="space-y-2">
                    {subscribers.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <span className="text-sm font-medium">{sub.email}</span>
                        <span className="text-xs text-muted-foreground">{new Date(sub.subscribed_at).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
