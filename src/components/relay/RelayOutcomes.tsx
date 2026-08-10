import {
  ArrowRightLeft,
  Eye,
  FolderCheck,
  MessageSquareText,
  RefreshCcw,
  UserCheck,
} from "lucide-react";

const outcomes = [
  {
    title: "Faster acknowledgement",
    description: "Let new inquiries know they were received and what comes next.",
    icon: MessageSquareText,
  },
  {
    title: "Consistent follow-up",
    description: "Give every promising inquiry a defined next step.",
    icon: RefreshCcw,
  },
  {
    title: "Organized information",
    description: "Keep the lead’s request and contact details together.",
    icon: FolderCheck,
  },
  {
    title: "Clearer team handoff",
    description: "Make ownership and the next action easier to understand.",
    icon: ArrowRightLeft,
  },
  {
    title: "Fewer quiet disappearances",
    description: "Reduce the chance that a good inquiry is simply forgotten.",
    icon: UserCheck,
  },
  {
    title: "Better process visibility",
    description: "See where inquiries are moving and where attention is needed.",
    icon: Eye,
  },
];

const RelayOutcomes: React.FC = () => {
  return (
    <section className="border-y border-foreground/10 bg-foreground/[0.025] py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            Business outcomes
          </p>
          <h2 className="text-4xl font-black tracking-[-0.045em] sm:text-5xl">
            Know what happens to every new lead.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/68">
            Relay is designed to improve the operating habits around new
            opportunities—without relying on inflated promises or magic
            numbers.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome) => {
            const Icon = outcome.icon;
            return (
              <article key={outcome.title} className="bg-background p-7 sm:p-8">
                <Icon className="mb-10 text-emerald-600 dark:text-emerald-300" size={23} />
                <h3 className="text-xl font-bold tracking-tight">
                  {outcome.title}
                </h3>
                <p className="mt-3 leading-relaxed text-foreground/62">
                  {outcome.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelayOutcomes;
