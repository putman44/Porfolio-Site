import { ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 bg-primary/10 relative border-t border-border mt-12 flex flex-wrap justify-between items-center">
      <span className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} devbytaylor, all rights reserved.
      </span>
      <a
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        href="#hero"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};

export default Footer;
