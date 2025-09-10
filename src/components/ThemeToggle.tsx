import { useState, useEffect } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4" />;
      case "dark":
        return <Moon className="w-4 h-4" />;
      default:
        return <Laptop className="w-4 h-4" />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative overflow-hidden group transition-all duration-500 hover:scale-105"
      title={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} mode`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
      
      <div className="relative z-10 flex items-center space-x-2">
        <div className="transform transition-transform duration-300 group-hover:rotate-180">
          {getIcon()}
        </div>
        <span className="hidden sm:inline text-xs font-medium">
          {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "Auto"}
        </span>
      </div>
      
      {/* Animated background pulse */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-blue-600/30 opacity-0 group-hover:opacity-20 animate-pulse rounded-md" />
    </Button>
  );
};

export default ThemeToggle;