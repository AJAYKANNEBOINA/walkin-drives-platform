import { MapPin, Clock, Users, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drive, formatSalary } from "@/data/mockData";

interface DriveCardProps {
  drive: Drive;
  variant?: "grid" | "list";
}

const statusColors: Record<string, string> = {
  live: "bg-green-500/10 text-green-700 border-green-200",
  upcoming: "bg-primary-light text-primary border-primary/20",
  completed: "bg-muted text-muted-foreground border-border",
};

const DriveCard = ({ drive, variant = "grid" }: DriveCardProps) => {
  if (variant === "list") {
    return (
      <div className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:card-shadow-hover hover:-translate-y-0.5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light font-bold text-primary">
            {drive.companyInitials}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-foreground">{drive.title}</h3>
              {drive.isVerified && <Badge variant="outline" className="border-primary/20 bg-primary-light text-primary text-[10px]">Verified</Badge>}
              {drive.status === "live" && <Badge variant="outline" className={statusColors.live + " text-[10px]"}>● Live Now</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{drive.company} · {drive.city}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{drive.date}</span>
          <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{formatSalary(drive.salaryMin)} – {formatSalary(drive.salaryMax)}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{drive.registrationCount} RSVPs</span>
          <Button size="sm" variant="outline">View Drive</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between p-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light font-bold text-primary text-sm">
            {drive.companyInitials}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{drive.company}</p>
            <p className="text-xs text-muted-foreground">{drive.city}</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {drive.isFeatured && <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 text-[10px]">Featured</Badge>}
          {drive.isVerified && <Badge variant="outline" className="border-primary/20 bg-primary-light text-primary text-[10px]">Verified</Badge>}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-5 pb-4">
        <h3 className="mb-2 font-semibold text-foreground leading-snug">{drive.title}</h3>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {drive.roles.slice(0, 3).map(r => (
            <span key={r} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{r}</span>
          ))}
        </div>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {drive.date} · {drive.startTime} – {drive.endTime}</p>
          <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {drive.venueName}</p>
          <p className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {formatSalary(drive.salaryMin)} – {formatSalary(drive.salaryMax)} / year</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" /> {drive.registrationCount} RSVPs
        </span>
        <Button size="sm">RSVP Now</Button>
      </div>
    </div>
  );
};

export default DriveCard;
