import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-extrabold text-primary-foreground">W</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">WALKINS</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            <a href="/drives" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Drives</a>
            <a href="/employers" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">For Employers</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
          </nav>
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-4 lg:flex">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <Button className="rounded-full bg-mint text-mint-foreground hover:bg-mint/90 px-6 font-semibold">
            Get Started
          </Button>
          <a href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</a>
        </div>

        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            <a href="/drives" className="text-sm font-medium text-muted-foreground">Drives</a>
            <a href="/employers" className="text-sm font-medium text-muted-foreground">For Employers</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground">FAQ</a>
            <div className="flex gap-2 pt-2">
              <a href="/login" className="flex-1">
                <Button variant="ghost" size="sm" className="w-full">Login</Button>
              </a>
              <Button size="sm" className="flex-1 rounded-full bg-mint text-mint-foreground hover:bg-mint/90">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
