import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Check, X, Sparkles, LogOut, ArrowLeft, Users, FileText, Mail, Trash2, Pencil, RefreshCw, ClipboardList } from "lucide-react";
import WalkinsLogo from "@/components/WalkinsLogo";

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

const emptyForm = {
  title: "", company: "", company_initials: "", company_about: "", company_address: "",
  city: "", date: "", start_time: "", end_time: "", venue_name: "", venue_address: "",
  roles: "", eligibility: "", salary_min: "", salary_max: "", experience_min: "", experience_max: "",
  documents_required: "", openings: "", industry: "", department: "", employment_type: "",
  education: "", key_skills: "", job_description: "", specifications: "", apply_url: "",
};

const Admin = () => {
  const { user, isAdmin, loading, signOut, accessToken, adminChecked } = useAuth();
  const navigate = useNavigate();
  const [drives, setDrives] = useState<DriveRow[]>([]);
  const [subscribers, setSubscribers] = useState<{ id: string; email: string; subscribed_at: string }[]>([]);
  const [stats, setStats] = useState({ total_drives: 0, pending_drives: 0, approved_drives: 0, total_subscribers: 0, total_applications: 0 });
  const [loadingData, setLoadingData] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!loading && adminChecked && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, loading, adminChecked, navigate]);

  useEffect(() => {
    if (isAdmin && accessToken) {
      fetchAll();
    }
  }, [isAdmin, accessToken]);

  const fetchAll = async () => {
    if (!accessToken) return;
    setLoadingData(true);
    try {
      const [drivesData, subsData, statsData] = await Promise.all([
        api.admin.getDrives(accessToken),
        api.admin.getSubscribers(accessToken),
        api.admin.getStats(accessToken),
      ]);
      setDrives(drivesData || []);
      setSubscribers(subsData || []);
      setStats(statsData || {});
    } catch (err: any) {
      toast.error(err.message || "Failed to load data");
    } finally {
      setLoadingData(false);
    }
  };

  const handleApproval = async (id: string, action: "approve" | "reject") => {
    if (!accessToken) return;
    try {
      if (action === "approve") {
        await api.admin.approveDrive(accessToken, id);
      } else {
        await api.admin.rejectDrive(accessToken, id);
      }
      toast.success(`Drive ${action}d`);
      fetchAll();
    } catch {
      toast.error(`Failed to ${action} drive`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!accessToken) return;
    if (!confirm("Are you sure you want to delete this drive?")) return;
    try {
      await api.admin.deleteDrive(accessToken, id);
      toast.success("Drive deleted");
      fetchAll();
    } catch {
      toast.error("Failed to delete drive");
    }
  };

  const handleEdit = (drive: any) => {
    setEditingId(drive.id);
    setForm({
      title: drive.title || "",
      company: drive.company || "",
      company_initials: drive.company_initials || "",
      company_about: drive.company_about || "",
      company_address: drive.company_address || "",
      city: drive.city || "",
      date: drive.date || "",
      start_time: drive.start_time || "",
      end_time: drive.end_time || "",
      venue_name: drive.venue_name || "",
      venue_address: drive.venue_address || "",
      roles: (drive.roles || []).join(", "),
      eligibility: drive.eligibility || "",
      salary_min: drive.salary_min?.toString() || "",
      salary_max: drive.salary_max?.toString() || "",
      experience_min: drive.experience_min?.toString() || "",
      experience_max: drive.experience_max?.toString() || "",
      documents_required: (drive.documents_required || []).join(", "),
      openings: drive.openings?.toString() || "",
      industry: drive.industry || "",
      department: drive.department || "",
      employment_type: drive.employment_type || "",
      education: drive.education || "",
      key_skills: (drive.key_skills || []).join(", "),
      job_description: drive.job_description || "",
      specifications: (drive.specifications || []).join("\n"),
      apply_url: drive.apply_url || "",
    });
  };

  const buildDrivePayload = () => ({
    title: form.title,
    company: form.company,
    company_initials: form.company_initials || form.company.substring(0, 3).toUpperCase(),
    company_about: form.company_about || undefined,
    company_address: form.company_address || undefined,
    city: form.city,
    date: form.date,
    start_time: form.start_time || undefined,
    end_time: form.end_time || undefined,
    venue_name: form.venue_name || undefined,
    venue_address: form.venue_address || undefined,
    roles: form.roles ? form.roles.split(",").map(r => r.trim()) : undefined,
    eligibility: form.eligibility || undefined,
    salary_min: form.salary_min ? parseInt(form.salary_min) : undefined,
    salary_max: form.salary_max ? parseInt(form.salary_max) : undefined,
    experience_min: form.experience_min ? parseInt(form.experience_min) : undefined,
    experience_max: form.experience_max ? parseInt(form.experience_max) : undefined,
    documents_required: form.documents_required ? form.documents_required.split(",").map(d => d.trim()) : undefined,
    openings: form.openings ? parseInt(form.openings) : undefined,
    industry: form.industry || undefined,
    department: form.department || undefined,
    employment_type: form.employment_type || undefined,
    education: form.education || undefined,
    key_skills: form.key_skills ? form.key_skills.split(",").map(s => s.trim()) : undefined,
    job_description: form.job_description || undefined,
    specifications: form.specifications ? form.specifications.split("\n").filter(Boolean) : undefined,
    apply_url: form.apply_url || undefined,
  });

  const handleSubmitDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (!form.title || !form.company || !form.city || !form.date) {
      toast.error("Title, Company, City and Date are required");
      return;
    }

    try {
      if (editingId) {
        await api.admin.updateDrive(accessToken, editingId, buildDrivePayload());
        toast.success("Drive updated!");
        setEditingId(null);
      } else {
        await api.admin.createDrive(accessToken, buildDrivePayload());
        toast.success("Drive posted!");
      }
      setForm(emptyForm);
      fetchAll();
    } catch (err: any) {
      toast.error(err.message || "Failed to save drive");
    }
  };

  const handleCleanup = async () => {
    if (!accessToken) return;
    try {
      const result = await api.admin.cleanupExpired(accessToken);
      toast.success(result.message);
      fetchAll();
    } catch {
      toast.error("Failed to cleanup expired drives");
    }
  };

  if (loading || !adminChecked || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  const pendingDrives = drives.filter(d => d.approval_status === "pending");
  const approvedDrives = drives.filter(d => d.approval_status === "approved");

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
              <WalkinsLogo className="h-8 w-auto text-foreground" compact />
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending_drives}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.approved_drives}</p>
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
                <p className="text-2xl font-bold">{stats.total_drives}</p>
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
                <p className="text-2xl font-bold">{stats.total_subscribers}</p>
                <p className="text-xs text-muted-foreground">Subscribers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total_applications}</p>
                <p className="text-xs text-muted-foreground">Applications</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <Button variant="outline" size="sm" onClick={fetchAll} className="gap-2">
            <RefreshCw className="h-3 w-3" /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleCleanup} className="gap-2 text-amber-600 border-amber-200 hover:bg-amber-50">
            <Trash2 className="h-3 w-3" /> Cleanup Expired Drives
          </Button>
        </div>

        <Tabs defaultValue="post" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="post">{editingId ? "Edit Drive" : "Post Drive"}</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingDrives.length})</TabsTrigger>
            <TabsTrigger value="all">All Drives ({drives.length})</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          </TabsList>

          {/* Post / Edit Drive */}
          <TabsContent value="post">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> {editingId ? "Edit Drive" : "Post New Drive"}
                </CardTitle>
                {editingId && (
                  <Button variant="ghost" size="sm" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                    Cancel Edit &mdash; Start Fresh
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitDrive} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Company *</Label><Input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>City *</Label><Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Date *</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Start Time</Label><Input value={form.start_time} onChange={e => setForm({ ...form, start_time: e.target.value })} placeholder="09:00 AM" /></div>
                    <div className="space-y-2"><Label>End Time</Label><Input value={form.end_time} onChange={e => setForm({ ...form, end_time: e.target.value })} placeholder="04:00 PM" /></div>
                    <div className="space-y-2"><Label>Venue Name</Label><Input value={form.venue_name} onChange={e => setForm({ ...form, venue_name: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Venue Address</Label><Input value={form.venue_address} onChange={e => setForm({ ...form, venue_address: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Roles (comma separated)</Label><Input value={form.roles} onChange={e => setForm({ ...form, roles: e.target.value })} placeholder="Developer, QA, DevOps" /></div>
                    <div className="space-y-2"><Label>Eligibility</Label><Input value={form.eligibility} onChange={e => setForm({ ...form, eligibility: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Min Salary</Label><Input type="number" value={form.salary_min} onChange={e => setForm({ ...form, salary_min: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Max Salary</Label><Input type="number" value={form.salary_max} onChange={e => setForm({ ...form, salary_max: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Min Experience (years)</Label><Input type="number" value={form.experience_min} onChange={e => setForm({ ...form, experience_min: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Max Experience (years)</Label><Input type="number" value={form.experience_max} onChange={e => setForm({ ...form, experience_max: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Openings</Label><Input type="number" value={form.openings} onChange={e => setForm({ ...form, openings: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Industry</Label><Input value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} placeholder="IT Services" /></div>
                    <div className="space-y-2"><Label>Employment Type</Label><Input value={form.employment_type} onChange={e => setForm({ ...form, employment_type: e.target.value })} placeholder="Full Time, Permanent" /></div>
                    <div className="space-y-2"><Label>Education</Label><Input value={form.education} onChange={e => setForm({ ...form, education: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Apply URL (external)</Label><Input value={form.apply_url} onChange={e => setForm({ ...form, apply_url: e.target.value })} placeholder="https://company.com/apply" /></div>
                    <div className="space-y-2"><Label>Key Skills (comma separated)</Label><Input value={form.key_skills} onChange={e => setForm({ ...form, key_skills: e.target.value })} /></div>
                  </div>
                  <div className="space-y-2"><Label>Documents Required (comma separated)</Label><Input value={form.documents_required} onChange={e => setForm({ ...form, documents_required: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Job Description</Label><Textarea rows={4} value={form.job_description} onChange={e => setForm({ ...form, job_description: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Specifications (one per line)</Label><Textarea rows={3} value={form.specifications} onChange={e => setForm({ ...form, specifications: e.target.value })} /></div>
                  <Button type="submit" className="w-full rounded-lg font-semibold" size="lg">
                    {editingId ? "Update Drive" : "Post Drive (Auto-Approved)"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Approval */}
          <TabsContent value="pending" className="space-y-4">
            {pendingDrives.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No drives pending approval</CardContent></Card>
            ) : (
              pendingDrives.map(drive => (
                <Card key={drive.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{drive.title}</h3>
                      <p className="text-sm text-muted-foreground">{drive.company} &middot; {drive.city} &middot; {drive.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproval(drive.id, "approve")}>
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleApproval(drive.id, "reject")}>
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* All Drives */}
          <TabsContent value="all" className="space-y-3">
            {drives.map(drive => (
              <Card key={drive.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold truncate">{drive.title}</h3>
                    <p className="text-sm text-muted-foreground">{drive.company} &middot; {drive.city} &middot; {drive.date}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <Badge variant={drive.approval_status === "approved" ? "default" : drive.approval_status === "rejected" ? "destructive" : "secondary"}>
                      {drive.approval_status}
                    </Badge>
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(drive)} title="Edit">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(drive.id)} title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                    {subscribers.map(sub => (
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
