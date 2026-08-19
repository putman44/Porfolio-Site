// src/components/relay/RelayHero.tsx
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BellRing,
  Inbox,
  ListChecks,
  RefreshCw,
} from "lucide-react";

const leadJourney = [
  { label: "Demand captured", icon: Inbox },
  { label: "Customer acknowledged", icon: BellRing },
  { label: "Lead organized and routed", icon: ListChecks },
  { label: "Follow-through kept moving", icon: RefreshCw },
];

const RelayHero: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-16 py-20 lg:grid-cols-[1.12fr_0.88fr] lg:py-24">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 sm:text-sm dark:text-emerald-300">
          <span className="h-px w-8 bg-emerald-500" aria-hidden="true" />
          Relay · Lead Response &amp; Recovery
        </p>
        <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
          Capture demand. Respond fast. Follow through. Prove the value<span className="text-primary">.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/72 sm:text-xl">
          Relay is a Lead Response &amp; Recovery system for service businesses.
          Your business already spends time and money generating leads. Relay
          helps make sure those opportunities are captured, acknowledged,
          organized, brought to the right person’s attention, and followed up
          with consistently.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#relay-contact"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-emerald-600 px-7 py-3 font-semibold text-white shadow-[0_12px_38px_rgba(5,150,105,0.2)] transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-[0_16px_44px_rgba(5,150,105,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
          >
            Start with a Relay Lead-Flow Review
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#demo"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-foreground/20 bg-background/50 px-7 py-3 font-semibold transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            See a lead capture example
            <ArrowDown
              size={18}
              className="transition-transform group-hover:translate-y-1"
            />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-lg lg:max-w-none"
        aria-label="A new lead moving through the Relay process"
      >
        <div className="absolute inset-10 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative rounded-[2rem] border border-emerald-500/20 bg-background/80 p-5 shadow-2xl shadow-black/10 backdrop-blur-sm sm:p-7 dark:shadow-black/25">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-5">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                New inbound lead
              </p>
              <p className="mt-2 font-bold">Service request received</p>
            </div>
            <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
          </div>

          <ol className="relative mt-7 space-y-3">
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-[1.4rem] top-8 w-px bg-linear-to-b from-emerald-500/60 to-primary/40"
            />
            {leadJourney.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="relative flex items-center gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.035] p-4"
                >
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-emerald-500/25 bg-background text-emerald-700 dark:text-emerald-300">
                    <Icon size={19} />
                  </span>
                  <span className="font-semibold">{item.label}</span>
                  <span className="ml-auto font-mono text-[0.65rem] text-foreground/40">
                    0{index + 1}
                  </span>
                </li>
              );
            })}
          </ol>

          <p className="mt-6 border-t border-foreground/10 pt-5 font-mono text-xs uppercase tracking-[0.14em] text-foreground/55">
            Captured, acknowledged, routed, and followed through
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default RelayHero;
