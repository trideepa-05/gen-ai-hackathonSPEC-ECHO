import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (demoMode || email || password) {
      localStorage.setItem('auth', JSON.stringify({ email, isLoggedIn: true }));
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#1E293B] flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1E3A8A] rounded-full blur-3xl"></div>
        </div>
        
        {/* Abstract fraud network visualization */}
        <div className="relative z-10 text-center">
          <Shield className="w-64 h-64 text-[#3B82F6] mx-auto mb-8 drop-shadow-2xl" strokeWidth={1} />
          <h2 className="text-4xl font-bold text-white mb-4">Detect Fraud with AI</h2>
          <p className="text-white/70 text-xl">Advanced machine learning algorithms protecting your insurance claims</p>
        </div>
      </div>

      {/* Right side - Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <Shield className="w-12 h-12 text-[#3B82F6] mr-3" />
              <h1 className="text-3xl font-bold text-[#1E3A8A]">ShadowTrace</h1>
            </div>

            <h2 className="text-2xl font-semibold text-center mb-2">Welcome Back</h2>
            <p className="text-center text-gray-600 mb-8">Sign in to your account to continue</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@shadowtrace.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 bg-gray-50 border-gray-300"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border-gray-300 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E3A8A]/90 hover:to-[#3B82F6]/90 text-white h-12"
              >
                Login
              </Button>
            </form>

            <div className="flex items-center justify-between mt-6 text-sm">
              <button
                type="button"
                onClick={() => navigate("/claim-form")}
                className="text-[#3B82F6] hover:underline"
              >
                Register Now
              </button>
              <button type="button" className="text-gray-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Demo Mode Toggle */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="demo-mode" className="text-sm">Demo Mode</Label>
                  <p className="text-xs text-gray-500">Access without credentials</p>
                </div>
                <Switch
                  id="demo-mode"
                  checked={demoMode}
                  onCheckedChange={setDemoMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
