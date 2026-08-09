// src/components/dev-by-taylor/DevByTaylorPaths.tsx
import { ArrowUpRight, Code2, RadioTower } from "lucide-react";
import { Link } from "react-router-dom";

const DevByTaylorPaths: React.FC = () => {
  return (
    <section className="border-y border-foreground/10 bg-foreground/[0.025] py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Two primary paths
          </p>
          <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            One studio. Two ways to build what works.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="group relative flex min-h-[30rem] flex-col overflow-hidden rounded-[2rem] border border-primary/25 bg-primary/[0.07] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl sm:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[3rem] border-primary/5 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="relative flex items-start justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                01 / Revenue systems
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <RadioTower size={22} />
              </span>
            </div>
            <div className="relative mt-auto pt-24">
              <h3 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Relay
              </h3>
              <p className="mt-3 text-xl font-semibold text-foreground/80">
                Revenue automation for service businesses.
              </p>
              <p className="mt-5 max-w-xl leading-relaxed text-foreground/68">
                Relay helps businesses capture incoming leads, respond quickly,
                stay organized, and follow up consistently so opportunities do
                not quietly disappear.
              </p>
              <Link
                to="/relay"
                className="mt-8 inline-flex items-center gap-2 rounded-md font-bold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Explore Relay
                <ArrowUpRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </article>

          <article className="group relative flex min-h-[30rem] flex-col overflow-hidden rounded-[2rem] border border-sky-700/20 bg-sky-500/[0.055] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sky-600/40 hover:shadow-xl sm:p-10 dark:border-sky-300/15">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 font-mono text-[15rem] font-black leading-none text-sky-600/[0.035] dark:text-sky-200/[0.035]"
            >
              {"{}"}
            </div>
            <div className="relative flex items-start justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
                02 / Engineering
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-700 text-white shadow-lg shadow-sky-900/20 dark:bg-sky-300 dark:text-slate-950">
                <Code2 size={22} />
              </span>
            </div>
            <div className="relative mt-auto pt-24">
              <h3 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Engineering Portfolio
              </h3>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/72">
                Taylor’s software engineering work, including full-stack
                projects, professional experience, APIs, integrations, and
                industrial software.
              </p>
              <Link
                to="/portfolio"
                className="mt-8 inline-flex items-center gap-2 rounded-md font-bold text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 dark:text-sky-300"
              >
                View Portfolio
                <ArrowUpRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default DevByTaylorPaths;
