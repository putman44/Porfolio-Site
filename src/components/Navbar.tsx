// src/components/Navbar.tsx
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

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
    ["0 0 0 rgba(0,0,0,0)", "0 4px 12px rgba(0,0,0,0.08)"],
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
        <Link
          to="/"
          aria-label="Main Dev by Taylor site"
          className="flex items-center gap-2 text-xl font-bold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <img
            src="/devbytaylorIcon.svg"
            alt=""
            aria-hidden="true"
            className="h-9 w-9 shrink-0 rounded-lg"
          />
          <span className="hidden text-glow text-foreground lg:inline">
            Dev by Taylor
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-4">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-foreground/45">
              Portfolio
            </span>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {item.name}
              </a>
            ))}
          </div>
          <span className="h-5 w-px bg-foreground/15" aria-hidden="true" />
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm font-semibold text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Main
            </Link>
            <Link
              to="/relay"
              className="text-sm font-semibold text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Relay
            </Link>
          </div>
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
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed h-fit inset-0 z-40 flex flex-col items-center justify-center bg-background md:hidden"
            >
              <div className="m-6 flex flex-col items-center gap-5 text-xl">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">
                  Portfolio sections
                </span>
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
                <span className="my-1 h-px w-28 bg-foreground/15" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">
                  Dev by Taylor
                </span>
                <Link
                  to="/"
                  className="font-semibold text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Main site
                </Link>
                <Link
                  to="/relay"
                  className="font-semibold text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Relay
                </Link>
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
