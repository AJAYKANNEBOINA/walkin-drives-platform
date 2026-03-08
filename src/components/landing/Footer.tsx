const Footer = () => (
  <footer className="border-t border-border bg-secondary/30 py-12">
    <div className="container">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <span className="text-xs font-bold text-primary-foreground">W</span>
            </div>
            <span className="text-lg font-bold text-foreground">WALKINS</span>
          </div>
          <p className="text-sm text-muted-foreground">India's #1 Walk-in Drive Platform. Only real, venue-based interviews.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">For Job Seekers</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/drives" className="hover:text-foreground">Browse Drives</a></li>
            <li><a href="#" className="hover:text-foreground">Today's Drives</a></li>
            <li><a href="#" className="hover:text-foreground">Cities</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">For Employers</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Post a Drive</a></li>
            <li><a href="#" className="hover:text-foreground">Pricing</a></li>
            <li><a href="#" className="hover:text-foreground">Employer Dashboard</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 WALKINS (walkindrives.in). All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
