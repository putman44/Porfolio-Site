import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Braces, Boxes, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

const DevByTaylorHero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <section className="container mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
      <motion.div
        initial={initial}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-foreground/55 sm:text-sm">
          <span className="h-px w-8 bg-primary" aria-hidden="true" />
          Independent software &amp; automation studio
        </p>
        <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
          Software.
          <br />
          Automation.
          <br />
          Systems<span className="text-primary">.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/72 sm:text-xl">
          I build practical technology that solves real-world problems for
          businesses and teams.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/relay"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground shadow-[0_10px_35px_hsl(var(--primary)/0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_hsl(var(--primary)/0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Explore Relay
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            to="/portfolio"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-foreground/20 bg-background/50 px-7 py-3 font-semibold transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            View Portfolio
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-lg lg:max-w-none"
        aria-label="Dev by Taylor connects software, automation, and systems"
      >
        <div className="absolute inset-8 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative rounded-[2rem] border border-foreground/10 bg-background/75 p-4 shadow-2xl shadow-black/10 backdrop-blur-sm sm:p-6 dark:shadow-black/25">
          <div className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/55">
            <span>System / 01</span>
            <span className="text-right">
              Build / connect / improve
            </span>
          </div>

          <div className="relative grid gap-3 py-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary/25 bg-primary/8 p-5 sm:col-span-2">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Dev by Taylor
                </span>
                <Boxes size={20} className="text-primary" />
              </div>
              <p className="max-w-xs text-xl font-bold tracking-tight">
                Practical technology, thoughtfully engineered.
              </p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.035] p-5">
              <Braces className="mb-7 text-sky-600 dark:text-sky-300" size={23} />
              <p className="font-semibold">Software</p>
              <p className="mt-1 text-sm text-foreground/60">Applications &amp; APIs</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.035] p-5">
              <Workflow className="mb-7 text-primary" size={23} />
              <p className="font-semibold">Automation</p>
              <p className="mt-1 text-sm text-foreground/60">Reliable workflows</p>
            </div>
          </div>

          <div className="border-t border-foreground/10 pt-5 font-mono text-xs uppercase tracking-[0.15em] text-foreground/55">
            Built around the problem, not the platform
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DevByTaylorHero;
