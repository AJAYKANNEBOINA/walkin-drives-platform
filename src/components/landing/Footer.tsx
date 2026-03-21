import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import WalkinsLogo from "@/components/WalkinsLogo";

const Footer = () => (
  <footer className="border-t border-border bg-secondary/30 py-14">
    <div className="container">
      <div className="grid gap-8 sm:gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <WalkinsLogo className="h-8 w-auto" compact />
            <span className="text-lg font-bold text-foreground">WALKINS</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            India's #1 walk-in drive platform. We connect job seekers with verified, venue-based walk-in interviews across 50+ cities.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold text-foreground">Learn more</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/drives" className="transition-colors hover:text-foreground">Browse Drives</Link></li>
            <li><a href="#how-it-works" className="transition-colors hover:text-foreground">How It Works</a></li>
            <li><a href="#features" className="transition-colors hover:text-foreground">Features</a></li>
            <li><a href="#faq" className="transition-colors hover:text-foreground">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold text-foreground">Legal</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a></li>
            <li><a href="#" className="transition-colors hover:text-foreground">Terms of Service</a></li>
            <li><a href="#" className="transition-colors hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
        <p className="text-xs text-muted-foreground">© WALKINS, 2026. All rights reserved.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to top <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
