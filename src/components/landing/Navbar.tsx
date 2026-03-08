import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 nav-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">W</span>
            </div>
            <span className="text-xl font-bold text-foreground">WALKINS</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="/drives" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Drives</a>
            <a href="/employers" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">For Employers</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
          </nav>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm">Login</Button>
          <Button size="sm">Sign Up</Button>
        </div>
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <a href="/drives" className="text-sm font-medium text-muted-foreground">Drives</a>
            <a href="/employers" className="text-sm font-medium text-muted-foreground">For Employers</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground">FAQ</a>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="sm" className="flex-1">Login</Button>
              <Button size="sm" className="flex-1">Sign Up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
