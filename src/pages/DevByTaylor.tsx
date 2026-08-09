// src/pages/DevByTaylor.tsx
import DevByTaylorAbout from "../components/dev-by-taylor/DevByTaylorAbout";
import DevByTaylorFooter from "../components/dev-by-taylor/DevByTaylorFooter";
import DevByTaylorHero from "../components/dev-by-taylor/DevByTaylorHero";
import DevByTaylorNavbar from "../components/dev-by-taylor/DevByTaylorNavbar";
import DevByTaylorPaths from "../components/dev-by-taylor/DevByTaylorPaths";

const DevByTaylor: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-left text-foreground">
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
        className="pointer-events-none absolute -top-64 right-[-18rem] z-0 h-[42rem] w-[42rem] rounded-full bg-primary/15 blur-[140px]"
      />

      <DevByTaylorNavbar />
      <main className="relative z-10">
        <DevByTaylorHero />
        <DevByTaylorPaths />
        <DevByTaylorAbout />
      </main>
      <DevByTaylorFooter />
    </div>
  );
};

export default DevByTaylor;
