import { ArrowUpRight } from "lucide-react";

const RelayCallToAction: React.FC = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-500/25 bg-emerald-500/[0.07] px-7 py-16 sm:px-12 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-28 -top-36 h-80 w-80 rounded-full border-[4rem] border-emerald-500/[0.06]"
          />
          <div className="relative max-w-4xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              Find the leak in your lead process
            </p>
            <h2 className="text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Walk me through what happens when a new lead comes in.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/68">
              We can map the current handoffs, follow-up gaps, and visibility
              problems before deciding whether Relay is a useful fit.
            </p>
            <a
              href="mailto:automation@devbytaylor.com?subject=Relay%20lead%20process"
              className="group mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_35px_hsl(var(--primary)/0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Discuss your lead process
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelayCallToAction;
