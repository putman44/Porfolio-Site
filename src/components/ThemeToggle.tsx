import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../context/useTheme";
const ThemeToggle = () => {
  const { setIsDarkMode, isDarkMode } = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, [setIsDarkMode]);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.toggle("dark", !isDarkMode);
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.toggle("dark", !isDarkMode);
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(" transition-colors duration-300", "focus:outline-hidden")}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};
export default ThemeToggle;
