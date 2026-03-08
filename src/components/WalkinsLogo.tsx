const WalkinsLogo = ({ className = "", compact = false }: { className?: string; compact?: boolean }) => (
  <svg
    className={className}
    viewBox={compact ? "0 0 84 84" : "0 0 360 84"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Monogram */}
    <g transform="translate(12,12)">
      <rect x="0" y="0" width="60" height="60" rx="16" fill="hsl(var(--primary))" />
      <path d="M-10 22H8" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M-14 34H6" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      <path d="M15 18L22 44L30 26L38 44L45 18" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {!compact && (
      <>
        <text x="92" y="46" fontFamily="Inter, ui-sans-serif, system-ui" fontSize="34" fontWeight="800" letterSpacing="1" fill="currentColor">
          WALKINS
        </text>
        <text x="94" y="66" fontFamily="Inter, ui-sans-serif, system-ui" fontSize="12" fontWeight="600" letterSpacing="3" fill="hsl(var(--muted-foreground))">
          WALK IN. INTERVIEW. GET HIRED.
        </text>
        <circle cx="312" cy="40" r="4" fill="hsl(var(--mint))" />
      </>
    )}
  </svg>
);

export default WalkinsLogo;
