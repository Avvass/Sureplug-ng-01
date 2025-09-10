import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Laptop, Headphones, Shield, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin credentials
    if (loginData.email === "amagaji216@gmail.com" && loginData.password === "123456") {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userEmail", loginData.email);
      toast.success("Welcome Admin! Redirecting to dashboard...");
      navigate("/admin");
      return;
    }

    // Regular user login
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const user = users.find((u: any) => u.email === loginData.email && u.password === loginData.password);
    
    if (user) {
      localStorage.setItem("userRole", "user");
      localStorage.setItem("userEmail", loginData.email);
      localStorage.setItem("userName", user.name);
      toast.success("Login successful! Welcome back!");
      navigate("/");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    if (users.find((u: any) => u.email === signupData.email)) {
      toast.error("Email already registered!");
      return;
    }

    users.push({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem("registeredUsers", JSON.stringify(users));
    toast.success("Account created successfully! Please login.");
    
    // Switch to login tab
    const loginTab = document.querySelector('[data-value="login"]') as HTMLElement;
    loginTab?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent relative overflow-hidden">
      {/* Floating Tech Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce">
          <Smartphone className="w-12 h-12 text-white/20" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <Laptop className="w-16 h-16 text-white/15" />
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-300">
          <Headphones className="w-14 h-14 text-white/20" />
        </div>
        <div className="absolute top-60 left-1/2 animate-pulse delay-500">
          <Smartphone className="w-8 h-8 text-white/10 transform rotate-45" />
        </div>
        <div className="absolute bottom-40 right-10 animate-bounce delay-700">
          <Shield className="w-10 h-10 text-white/15" />
        </div>
      </div>

      {/* Back Button */}
      <Button
        variant="ghost"
        className="absolute top-6 left-6 text-white hover:bg-white/20 z-10"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Store
      </Button>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-white/80 rounded-lg flex items-center justify-center">
                <span className="text-brand-primary font-bold text-xl">SP</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Sure Plug NG</h1>
            <p className="text-white/80 text-lg">Premium Tech Store</p>
            <p className="text-white/60 text-sm mt-1">Your gateway to cutting-edge technology</p>
          </div>

          {/* Auth Card */}
          <Card className="backdrop-blur-sm bg-white/95 border border-white/30 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-brand-primary">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">
                Access your tech paradise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" data-value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10 h-12 border-gray-200 focus:border-brand-primary"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-12 border-gray-200 focus:border-brand-primary"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white font-semibold text-lg">
                      Sign In to Tech Paradise
                    </Button>
                  </form>
                  
                  <div className="text-center mt-4 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-2">🔐 Admin Access</p>
                    <p className="text-xs text-gray-500">Use admin credentials to access dashboard</p>
                  </div>
                </TabsContent>

                {/* Signup Tab */}
                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          className="pl-10 h-12 border-gray-200 focus:border-brand-primary"
                          value={signupData.name}
                          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10 h-12 border-gray-200 focus:border-brand-primary"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-gray-700 font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-12 border-gray-200 focus:border-brand-primary"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-gray-700 font-medium">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-12 border-gray-200 focus:border-brand-primary"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-brand-secondary to-brand-accent hover:from-brand-accent hover:to-brand-secondary text-white font-semibold text-lg">
                      Join Tech Paradise
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer Text */}
          <p className="text-center text-white/60 text-sm mt-6">
            🔐 Secure • 📱 Premium Tech • 🚀 Fast Delivery
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;