// src/components/dev-by-taylor/DevByTaylorAbout.tsx
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DevByTaylorAbout: React.FC = () => {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="about-taylor">
      <div className="container mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            About the builder
          </p>
        </div>
        <div>
          <h2
            id="about-taylor"
            className="max-w-4xl text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-5xl"
          >
            I’m Taylor Putman, a software developer focused on building
            practical systems, applications, and automation that make
            complicated processes work better.
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground/68">
            Dev by Taylor brings that work together—from the engineering
            projects in my portfolio to Relay’s focused approach to revenue
            automation for service businesses.
          </p>
          <Link
            to="/portfolio"
            className="group mt-8 inline-flex items-center gap-2 rounded-md font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            View my portfolio
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DevByTaylorAbout;
