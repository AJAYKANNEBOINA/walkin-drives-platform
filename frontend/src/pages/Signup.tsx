import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WalkinsLogo from "@/components/WalkinsLogo";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock, User, CheckCircle2 } from "lucide-react";

const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL || '';

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      // Use our custom backend signup (auto-confirms + sends Resend email)
      const resp = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name: fullName })
      });

      const data = await resp.json();

      if (!resp.ok) {
        toast.error(data.detail || "Signup failed");
        setLoading(false);
        return;
      }

      // If we got a session back, set it in Supabase client
      if (data.session?.access_token) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token
        });
      }

      setSignedUp(true);
      toast.success("Account created! Check your email for a welcome message.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (signedUp) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm text-center">
          <WalkinsLogo className="h-10 w-auto mx-auto mb-6" showText={true} />
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-4 h-16 w-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-2 text-xl font-bold text-foreground">Account Created!</h1>
            <p className="mb-2 text-sm text-muted-foreground">
              Welcome to WALKINS! Your account is ready to use.
            </p>
            <p className="mb-6 text-xs text-muted-foreground">
              We've sent a welcome email to <strong className="text-foreground">{email}</strong>. Check your inbox (and spam folder).
            </p>
            <div className="space-y-3">
              <Button className="w-full rounded-xl" onClick={() => navigate("/drives")}>
                Browse Walk-in Drives
              </Button>
              <Link to="/login">
                <Button variant="outline" className="w-full rounded-xl">Go to Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 hero-gradient lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <Link to="/">
          <WalkinsLogo className="h-16 w-auto" variant="white" showText={false} />
        </Link>
        <h2 className="text-2xl font-bold text-primary-foreground text-center mb-2 mt-6">
          India's First Walk-in Drive Platform
        </h2>
        <p className="text-primary-foreground/70 text-center max-w-md">
          Walk In. Interview. Get Hired.
        </p>
      </div>

      {/* Right side */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:hidden">
            <Link to="/">
              <WalkinsLogo className="h-10 w-auto mx-auto mb-3" showText={true} />
            </Link>
          </div>

          <h1 className="mb-2 text-2xl font-extrabold text-foreground">Create your account</h1>
          <p className="mb-8 text-sm text-muted-foreground">Join India's first walk-in drive platform</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  className="h-11 pl-10 rounded-xl"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="h-11 pl-10 rounded-xl"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="h-11 pl-10 pr-10 rounded-xl"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 rounded-xl font-semibold" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
          <p className="mt-2 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">Back to homepage</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
