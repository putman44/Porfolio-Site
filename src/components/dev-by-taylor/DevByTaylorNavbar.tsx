// src/components/dev-by-taylor/DevByTaylorNavbar.tsx
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Relay", to: "/relay" },
  { label: "Portfolio", to: "/portfolio" },
];

const DevByTaylorNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/85 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="container mx-auto flex h-20 max-w-7xl items-center justify-between"
      >
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label="Dev by Taylor home"
        >
          <img
            src="/devbytaylorIcon.svg"
            alt=""
            aria-hidden="true"
            className="h-9 w-9 shrink-0 rounded-lg"
          />
          <span className="text-lg font-bold tracking-[-0.03em]">
            Dev by Taylor
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-7">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={pathname === item.to ? "page" : undefined}
                className="relative rounded-sm py-2 text-sm font-medium text-foreground/65 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary aria-[current=page]:text-foreground"
              >
                {item.label}
                {pathname === item.to && (
                  <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>
          <span className="h-5 w-px bg-foreground/15" aria-hidden="true" />
          <span className="flex rounded-md p-2 transition-colors hover:bg-foreground/5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
            <ThemeToggle />
          </span>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <span className="flex rounded-md p-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
            <ThemeToggle />
          </span>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="rounded-md p-2 text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full border-b border-foreground/10 bg-background px-8 py-5 shadow-xl md:hidden"
            >
              <div className="container mx-auto flex max-w-7xl flex-col">
                {navigation.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    aria-current={pathname === item.to ? "page" : undefined}
                    className="border-b border-foreground/10 py-4 text-base font-medium text-foreground/70 last:border-0 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary aria-[current=page]:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default DevByTaylorNavbar;
