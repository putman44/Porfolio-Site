// src/components/relay/RelayOutcomes.tsx
import { Check, Plus, Rocket, Settings2 } from "lucide-react";

const launchIncludes = [
  "Lead-process discovery and baseline review",
  "Connection of one primary inbound lead source",
  "Client-specific configuration and business rules",
  "Lead validation and duplicate protection",
  "Lead storage / CRM or agreed system integration",
  "Immediate customer acknowledgment",
  "Business notification and routing",
  "Two-touch automated nurture sequence",
  "Client-specific messaging and branding",
  "Retry and failure handling",
  "Production testing and launch",
  "Initial owner/team handoff",
];

const managedIncludes = [
  "Hosting and infrastructure",
  "Workflow monitoring and integration health checks",
  "Failure review and troubleshooting",
  "Message and configuration updates",
  "Nurture monitoring",
  "Monthly performance summary",
  "Email support for troubleshooting and configuration",
  "One small optimization or improvement per month",
];

const expansionOptions = [
  "Missed-call and phone lead recovery",
  "CRM or field-service platform integrations",
  "Additional lead sources",
  "Database reactivation",
  "Revenue and pipeline reporting",
  "Additional nurture sequences",
];

const RelayOutcomes: React.FC = () => {
  return (
    <section className="border-y border-foreground/10 bg-foreground/[0.025] py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-14 max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            The Relay offer
          </p>
          <h2 className="text-4xl font-black tracking-[-0.045em] sm:text-5xl">
            Launch the system. Keep it working. Expand when it makes sense.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/68">
            Relay is not designed to create demand where none exists. It is
            designed to help you get more value from the demand you already
            worked and paid to create.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/10 lg:grid-cols-3">
          <article className="bg-background p-7 sm:p-8">
            <Rocket
              className="mb-8 text-emerald-600 dark:text-emerald-300"
              size={24}
            />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">
              Relay Launch
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight">
              $3,000
            </h3>
            <p className="mt-1 font-semibold text-foreground/62">
              One-time implementation
            </p>
            <ul className="mt-7 space-y-3 text-sm leading-relaxed text-foreground/68">
              {launchIncludes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300"
                    size={17}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-foreground/10 pt-6 text-sm leading-relaxed text-foreground/62">
              Typical implementation target: 2–4 weeks, depending on
              integrations and access.
            </p>
          </article>

          <article className="bg-background p-7 sm:p-8">
            <Settings2 className="mb-8 text-primary" size={24} />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">
              Relay Managed
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight">
              $1,000/month
            </h3>
            <p className="mt-1 font-semibold text-foreground/62">
              Ongoing operation and support
            </p>
            <ul className="mt-7 space-y-3 text-sm leading-relaxed text-foreground/68">
              {managedIncludes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300"
                    size={17}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-foreground/10 pt-6 text-sm leading-relaxed text-foreground/62">
              Major feature additions, new integrations, additional locations,
              or expanded workflows are scoped separately.
            </p>
          </article>

          <article className="bg-background p-7 sm:p-8">
            <Plus
              className="mb-8 text-emerald-600 dark:text-emerald-300"
              size={24}
            />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">
              Optional expansion
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight">
              Extend Relay around your operation.
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/62">
              Add capabilities as your lead flow, team, and reporting needs
              grow.
            </p>
            <ul className="mt-7 space-y-3 text-sm leading-relaxed text-foreground/68">
              {expansionOptions.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300"
                    size={17}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};

export default RelayOutcomes;
