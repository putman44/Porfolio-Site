// src/components/relay/RelayRevenueProblem.tsx
import { Clock3, EyeOff, Inbox, Shuffle } from "lucide-react";

const problems = [
  {
    title: "Slow response",
    description:
      "A warm inquiry sits unanswered while the person keeps looking for help.",
    icon: Clock3,
  },
  {
    title: "Inconsistent follow-up",
    description:
      "Good intentions depend on someone remembering the next call or message.",
    icon: Shuffle,
  },
  {
    title: "Buried inquiries",
    description:
      "Website forms, inboxes, and handoffs make it easy for a lead to land in the wrong place.",
    icon: Inbox,
  },
  {
    title: "Limited visibility",
    description:
      "The team cannot easily see what happened after an inquiry came in.",
    icon: EyeOff,
  },
];

const RelayRevenueProblem: React.FC = () => {
  return (
    <section className="border-y border-foreground/10 bg-foreground/[0.025] py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              The revenue problem
            </p>
            <h2 className="max-w-xl text-4xl font-black tracking-[-0.045em] sm:text-5xl">
              Generating the lead is only the first step.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/68">
              Businesses invest in getting the phone to ring and the form to be
              filled out. The opportunity is still at risk when the process
              after that moment is slow, scattered, or unclear.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <article
                  key={problem.title}
                  className="rounded-3xl border border-foreground/10 bg-background/60 p-6 transition-colors hover:border-primary/30 sm:p-7"
                >
                  <Icon className="mb-8 text-primary" size={23} />
                  <h3 className="text-xl font-bold tracking-tight">
                    {problem.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-foreground/65">
                    {problem.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelayRevenueProblem;
