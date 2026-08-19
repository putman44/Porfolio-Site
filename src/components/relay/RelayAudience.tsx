// src/components/relay/RelayAudience.tsx
import { Check, Target } from "lucide-react";

const serviceExamples = [
  "HVAC",
  "Plumbing",
  "Roofing",
  "Electrical",
  "Remodeling",
  "Landscaping",
  "Pest control",
];

const RelayAudience: React.FC = () => {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="relay-audience">
      <div className="container mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Who Relay is for
          </p>
          <h2
            id="relay-audience"
            className="max-w-3xl text-4xl font-black tracking-[-0.045em] sm:text-5xl"
          >
            Built for service businesses with inquiries already coming in.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/68">
            Relay is built for home-service businesses with meaningful inbound
            lead volume, including HVAC, plumbing, roofing, electrical,
            remodeling, landscaping, pest control, and similar companies.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5" aria-label="Example service industries">
            {serviceExamples.map((service) => (
              <span
                key={service}
                className="rounded-full border border-foreground/15 bg-foreground/[0.035] px-4 py-2 text-sm font-semibold"
              >
                {service}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-foreground/50">
            Examples only—not a list of existing customers.
          </p>
        </div>

        <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/[0.065] p-7 sm:p-9">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-600 text-white dark:bg-emerald-400 dark:text-emerald-950">
            <Target size={22} />
          </span>
          <h3 className="mt-8 text-2xl font-bold tracking-tight">
            Relay is a strong fit when:
          </h3>
          <ul className="mt-6 space-y-4 text-foreground/70">
            {[
              "You already have meaningful inbound lead volume.",
              "More than one person may need to see or act on a lead.",
              "Follow-up quality changes depending on how busy the team is.",
              "It is difficult to see where inquiries stall or disappear.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RelayAudience;
