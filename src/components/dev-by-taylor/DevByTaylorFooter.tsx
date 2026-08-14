// src/components/dev-by-taylor/DevByTaylorFooter.tsx
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const DevByTaylorFooter: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-foreground/10 bg-foreground/[0.025] py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              to="/"
              className="rounded-md text-xl font-black tracking-[-0.03em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Dev by Taylor<span className="text-primary">.</span>
            </Link>
            <p className="mt-3 text-sm text-foreground/65">
              Software, automation, and practical systems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm font-medium">
            <Link className="hover:text-primary" to="/relay">
              Relay
            </Link>
            <Link className="hover:text-primary" to="/portfolio">
              Portfolio
            </Link>
            <a
              className="inline-flex items-center gap-2 hover:text-primary"
              href="https://github.com/putman44/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={17} /> GitHub
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-primary"
              href="https://www.linkedin.com/in/taylor-putman/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={17} /> LinkedIn
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-foreground/10 pt-6 text-xs text-foreground/60">
          &copy; {new Date().getFullYear()} Dev by Taylor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default DevByTaylorFooter;
