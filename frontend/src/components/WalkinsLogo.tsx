import logoDefault from "@/assets/walkins-logo.png";
import logoWhite from "@/assets/walkins-logo-white.png";

interface WalkinsLogoProps {
  className?: string;
  compact?: boolean;
  variant?: "default" | "white";
  showText?: boolean;
}

const WalkinsLogo = ({
  className = "",
  compact = false,
  variant = "default",
  showText = true,
}: WalkinsLogoProps) => {
  const logoSrc = variant === "white" ? logoWhite : logoDefault;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoSrc}
        alt="WALKINS Logo"
        className="h-full w-auto object-contain"
      />
      {showText && !compact && (
        <span
          className={`text-xl font-extrabold tracking-tight ${
            variant === "white" ? "text-white" : "text-foreground"
          }`}
        >
          WALKINS
        </span>
      )}
    </div>
  );
};

export default WalkinsLogo;
