// src/pages/Relay.tsx
import DevByTaylorFooter from "../components/dev-by-taylor/DevByTaylorFooter";
import DevByTaylorNavbar from "../components/dev-by-taylor/DevByTaylorNavbar";
import RelayAudience from "../components/relay/RelayAudience";
import RelayCallToAction from "../components/relay/RelayCallToAction";
import RelayDemo from "../components/relay/RelayDemo";
import RelayHero from "../components/relay/RelayHero";
import RelayHowItWorks from "../components/relay/RelayHowItWorks";
import RelayOutcomes from "../components/relay/RelayOutcomes";
import RelayRevenueProblem from "../components/relay/RelayRevenueProblem";
import Seo from "../components/Seo";

const Relay: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-left text-foreground">
      <Seo
        title="Relay | Lead Response & Recovery for Service Businesses"
        description="Relay helps service businesses capture demand, respond fast, follow through consistently, and prove the value of the leads they already generate."
        canonical="https://devbytaylor.com/relay"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] dark:opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-72 left-[-20rem] z-0 h-[44rem] w-[44rem] rounded-full bg-emerald-500/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-18rem] top-[38rem] z-0 h-[38rem] w-[38rem] rounded-full bg-primary/10 blur-[150px]"
      />

      <DevByTaylorNavbar />
      <main className="relative z-10">
        <RelayHero />
        <RelayRevenueProblem />
        <RelayHowItWorks />
        <RelayDemo />
        <RelayAudience />
        <RelayOutcomes />
        <RelayCallToAction />
      </main>
      <DevByTaylorFooter />
    </div>
  );
};

export default Relay;
