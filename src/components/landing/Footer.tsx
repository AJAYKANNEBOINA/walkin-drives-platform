import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-navy text-[hsl(var(--navy-foreground))] py-16">
    <div className="container">
      <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-extrabold text-primary-foreground">W</span>
            </div>
            <span className="text-xl font-extrabold">WALKINS</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[hsl(var(--navy-foreground))]/60">
            WALKINS is India's #1 walk-in drive platform. We connect job seekers with verified, venue-based walk-in interviews across 50+ cities. No online applications — just show up, interview, and get hired. Trusted by thousands of companies and lakhs of job seekers every month.
          </p>
        </div>

        {/* Learn more */}
        <div>
          <h4 className="mb-4 text-sm font-bold text-mint">Learn more</h4>
          <ul className="space-y-3 text-sm text-[hsl(var(--navy-foreground))]/60">
            <li><a href="/drives" className="transition-colors hover:text-[hsl(var(--navy-foreground))]">Browse Drives</a></li>
            <li><a href="#" className="transition-colors hover:text-[hsl(var(--navy-foreground))]">How It Works</a></li>
            <li><a href="/employers" className="transition-colors hover:text-[hsl(var(--navy-foreground))]">For Employers</a></li>
            <li><a href="#" className="transition-colors hover:text-[hsl(var(--navy-foreground))]">About Us</a></li>
            <li><a href="#" className="transition-colors hover:text-[hsl(var(--navy-foreground))]">Contact</a></li>
          </ul>
        </div>

        {/* Privacy & legal */}
        <div>
          <h4 className="mb-4 text-sm font-bold text-mint">Privacy & legal</h4>
          <ul className="space-y-3 text-sm text-[hsl(var(--navy-foreground))]/60">
            <li><a href="#" className="transition-colors hover:text-[hsl(var(--navy-foreground))]">Privacy Policy</a></li>
            <li><a href="#" className="transition-colors hover:text-[hsl(var(--navy-foreground))]">Terms of Service</a></li>
            <li><a href="#" className="transition-colors hover:text-[hsl(var(--navy-foreground))]">Cookie Notice</a></li>
          </ul>
        </div>
      </div>

      {/* Social + copyright */}
      <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[hsl(var(--navy-foreground))]/10 pt-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[hsl(var(--navy-foreground))]/50">Follow us</span>
          <div className="flex gap-3">
            <a href="#" className="text-[hsl(var(--navy-foreground))]/50 hover:text-[hsl(var(--navy-foreground))] transition-colors text-lg font-bold">in</a>
            <a href="#" className="text-[hsl(var(--navy-foreground))]/50 hover:text-[hsl(var(--navy-foreground))] transition-colors text-lg font-bold">𝕏</a>
            <a href="#" className="text-[hsl(var(--navy-foreground))]/50 hover:text-[hsl(var(--navy-foreground))] transition-colors text-lg font-bold">f</a>
            <a href="#" className="text-[hsl(var(--navy-foreground))]/50 hover:text-[hsl(var(--navy-foreground))] transition-colors text-lg font-bold">▶</a>
          </div>
        </div>

        <p className="text-xs text-[hsl(var(--navy-foreground))]/40">
          © WALKINS (walkindrives.in), 2026. All rights reserved.
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--navy-foreground))]/70 hover:text-[hsl(var(--navy-foreground))] transition-colors"
        >
          Back to top <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
