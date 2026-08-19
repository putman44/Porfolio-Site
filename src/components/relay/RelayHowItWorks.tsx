// src/components/relay/RelayHowItWorks.tsx
import {
  BellRing,
  FolderKanban,
  MessageCircleReply,
  MousePointerClick,
  RefreshCw,
} from "lucide-react";

const steps = [
  {
    title: "Capture",
    description: "Collect the details needed to understand and route the inquiry.",
    icon: MousePointerClick,
  },
  {
    title: "Respond",
    description: "Acknowledge the person quickly so they know the request was received.",
    icon: MessageCircleReply,
  },
  {
    title: "Alert",
    description: "Put the new opportunity in front of the right person on the team.",
    icon: BellRing,
  },
  {
    title: "Organize",
    description: "Keep the contact details, request, source, and status together.",
    icon: FolderKanban,
  },
  {
    title: "Follow up",
    description: "Create a consistent next step instead of relying on memory.",
    icon: RefreshCw,
  },
];

const RelayHowItWorks: React.FC = () => {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="relay-process">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            How Relay works
          </p>
          <h2
            id="relay-process"
            className="text-4xl font-black tracking-[-0.045em] sm:text-5xl"
          >
            A dependable path through the systems you already use.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/68">
            Relay can work with website forms, existing inquiry systems, staff
            intake, supported phone or call-tracking systems, and CRM or
            field-service platforms. The exact connections are confirmed and
            scoped around your current lead flow.
          </p>
        </div>

        <ol className="relative grid gap-4 md:grid-cols-5">
          <span
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-linear-to-r from-emerald-500/40 via-primary/40 to-emerald-500/40 md:block"
          />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="relative">
                <div className="mb-5 flex items-center gap-4 md:block">
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-emerald-500/25 bg-background text-emerald-700 shadow-sm dark:text-emerald-300">
                    <Icon size={22} />
                  </span>
                  <span className="font-mono text-xs text-foreground/40 md:mt-5 md:block">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/62">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default RelayHowItWorks;
