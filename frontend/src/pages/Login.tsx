import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WalkinsLogo from "@/components/WalkinsLogo";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes("Email not confirmed")) {
          toast.error("Please verify your email before logging in. Check your inbox.");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 hero-gradient lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <Link to="/">
          <WalkinsLogo className="h-16 w-auto text-primary-foreground mb-6" />
        </Link>
        <h2 className="text-2xl font-bold text-primary-foreground text-center mb-2">
          India's First Walk-in Drive Platform
        </h2>
        <p className="text-primary-foreground/70 text-center max-w-md">
          Walk In. Interview. Get Hired.
        </p>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:hidden">
            <Link to="/">
              <WalkinsLogo className="h-10 w-auto text-foreground mx-auto mb-3" compact />
            </Link>
          </div>

          <h1 className="mb-2 text-2xl font-extrabold text-foreground">Welcome back</h1>
          <p className="mb-8 text-sm text-muted-foreground">Sign in to your WALKINS account</p>

          <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">Create account</Link>
          </p>
          <p className="mt-2 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">Back to homepage</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
