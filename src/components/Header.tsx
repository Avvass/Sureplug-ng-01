import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, MapPin, Phone, User, LogOut } from "lucide-react";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    
    if (role) {
      setIsLoggedIn(true);
      setUserRole(role);
      setUserName(name || email || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    setUserRole("");
    toast.success("Logged out successfully!");
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      toast.error("Please login to access your cart!");
      navigate("/login");
      return;
    }
    // Handle cart functionality here
    toast.info("Cart functionality coming soon!");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-primary">Sure Plug NG</h1>
              <p className="text-xs text-muted-foreground">Premium Tech Store</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-brand-primary transition-colors">
              Home
            </a>
            <a href="#phones" className="text-foreground hover:text-brand-primary transition-colors">
              Smartphones
            </a>
            <a href="#laptops" className="text-foreground hover:text-brand-primary transition-colors">
              MacBooks
            </a>
            <a href="#airpods" className="text-foreground hover:text-brand-primary transition-colors">
              AirPods
            </a>
            <a href="#contact" className="text-foreground hover:text-brand-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Location Indicator */}
            <div className="hidden lg:flex items-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Abuja</span>
            </div>

            {/* Auth & Cart */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              {isLoggedIn ? (
                <>
                  <Button variant="outline" size="sm" className="relative" onClick={handleCartClick}>
                    <ShoppingCart className="w-4 h-4" />
                    <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </span>
                  </Button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                      Hello, {userName}
                    </span>
                    {userRole === "admin" && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => navigate("/admin")}
                        className="text-brand-primary hover:text-brand-secondary"
                      >
                        Dashboard
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white border-0 hover:from-brand-secondary hover:to-brand-primary"
                >
                  <User className="w-4 h-4 mr-1" />
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-foreground hover:text-brand-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#phones"
                className="text-foreground hover:text-brand-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Smartphones
              </a>
              <a
                href="#laptops"
                className="text-foreground hover:text-brand-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                MacBooks
              </a>
              <a
                href="#airpods"
                className="text-foreground hover:text-brand-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AirPods
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-brand-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="flex items-center space-x-2 pt-2 border-t border-border">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Banex Plaza, Wuse & Heart Plaza</span>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;