const WalkinsLogo = ({ className = "", compact = false }: { className?: string; compact?: boolean }) => (
  <svg
    className={className}
    viewBox={compact ? "0 0 84 84" : "0 0 420 84"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Monogram icon */}
    <g transform="translate(12,12)">
      <rect x="0" y="0" width="60" height="60" rx="16" fill="hsl(var(--primary))" />
      {/* motion trails */}
      <path d="M-10 22H8" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M-14 34H6" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      {/* W */}
      <path d="M15 18L22 44L30 26L38 44L45 18" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {!compact && (
      <>
        {/* WALK letters */}
        <text x="92" y="50" fontFamily="Inter, ui-sans-serif, system-ui" fontSize="38" fontWeight="900" letterSpacing="2" fill="hsl(var(--primary))">
          WALK
        </text>

        {/* Walking legs on the L-K gap area */}
        {/* Left leg */}
        <path d="M200 52 L196 68" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="195" cy="70" rx="5" ry="2.5" fill="hsl(var(--primary))" />
        {/* Right leg */}
        <path d="M206 52 L212 68" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="213" cy="70" rx="5" ry="2.5" fill="hsl(var(--primary))" />

        {/* INS letters */}
        <text x="218" y="50" fontFamily="Inter, ui-sans-serif, system-ui" fontSize="38" fontWeight="900" letterSpacing="2" fill="hsl(var(--primary))">
          INS
        </text>

        {/* Tagline */}
        <text x="94" y="78" fontFamily="Inter, ui-sans-serif, system-ui" fontSize="10" fontWeight="600" letterSpacing="3" fill="hsl(var(--muted-foreground))">
          WALK IN. INTERVIEW. GET HIRED.
        </text>
      </>
    )}
  </svg>
);

export default WalkinsLogo;
