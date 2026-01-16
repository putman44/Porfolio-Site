import { Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../context/useTheme";
const ThemeToggle = () => {
  const { setIsDarkMode, isDarkMode } = useTheme();

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

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
