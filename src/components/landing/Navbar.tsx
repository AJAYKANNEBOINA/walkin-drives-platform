import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import WalkinsLogo from "@/components/WalkinsLogo";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/80 nav-blur border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <WalkinsLogo className="h-8 w-auto" compact />
          <span className="text-lg font-bold tracking-tight text-foreground">WALKINS</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</Link>
          <Link to="/drives" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Drives</Link>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">How It Works</a>
          <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
          {isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">Admin</Link>
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={signOut}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</Link>
              <Link to="/signup">
                <Button size="sm" className="rounded-full px-5 font-semibold">
                  Get Started →
                </Button>
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            <Link to="/drives" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Drives</Link>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="#features" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>FAQ</a>
            {isAdmin && <Link to="/admin" className="text-sm font-medium text-primary" onClick={() => setMobileOpen(false)}>Admin</Link>}
            <div className="flex gap-2 pt-2">
              {user ? (
                <Button variant="ghost" size="sm" className="w-full" onClick={() => { signOut(); setMobileOpen(false); }}>Logout</Button>
              ) : (
                <>
                  <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button size="sm" className="w-full rounded-full">Get Started →</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
