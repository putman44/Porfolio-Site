import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground">
      <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary animate-fade-in">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-secondary animate-fade-in-delay-1">
        Page Not Found
      </h2>
      <p className="text-center max-w-md mb-8 text-muted-foreground animate-fade-in-delay-2">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="cosmic-button flex items-center gap-2 animate-fade-in-delay-3"
      >
        Go Back Home <ArrowRight size={16} />
      </Link>
    </section>
  );
};

export default NotFound;
