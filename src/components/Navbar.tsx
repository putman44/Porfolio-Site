import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Map scroll → padding & box-shadow
  const padding = useTransform(scrollY, [0, 20], [12, 5]);
  const boxShadow = useTransform(
    scrollY,
    [0, 20],
    ["0 0 0 rgba(0,0,0,0)", "0 4px 12px rgba(0,0,0,0.08)"]
  );

  // scrollY.to(inputRange, outputRange) maps one range of values to another.
  // inputRange = scroll values in pixels [0, 20]
  // outputRange = the corresponding style values [20, 12]
  // It’s a linear interpolation:
  // // scrollY padding
  // // 0       20px
  // // 10      16px
  // // 20      12px

  return (
    <motion.nav
      style={{ paddingTop: padding, paddingBottom: padding, boxShadow }}
      className="fixed top-0 left-0 w-full z-40 backdrop-blur-3xl"
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl font-bold text-primary flex items-center"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">devbytaylor</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground z-50"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed h-fit inset-0 z-40 flex flex-col items-center justify-center bg-background md:hidden"
            >
              <div className="flex flex-col m-6 items-center space-y-8 text-xl">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <ThemeToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
