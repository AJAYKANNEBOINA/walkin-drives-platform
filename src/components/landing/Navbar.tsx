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
    <header className="sticky top-0 z-50 bg-background border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center">
            <WalkinsLogo className="h-10 w-auto text-foreground" compact />
            <span className="ml-2 text-xl font-extrabold tracking-tight text-foreground hidden sm:inline">WALKINS</span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            <Link to="/drives" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Drives</Link>
            <a href="#faq" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">Admin</Link>
            )}
          </nav>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={signOut}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</Link>
              <Link to="/signup">
                <Button className="rounded-full bg-mint text-mint-foreground hover:bg-mint/90 px-6 font-semibold">
                  Get Started
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
                    <Button size="sm" className="w-full rounded-full bg-mint text-mint-foreground hover:bg-mint/90">Get Started</Button>
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
