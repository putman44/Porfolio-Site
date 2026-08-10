import ServiceBusinessPreview from "./ServiceBusinessPreview";

const RelayDemo: React.FC = () => {
  return (
    <section
      id="demo"
      className="scroll-mt-20 border-y border-foreground/10 bg-[#071f2b] py-24 text-slate-100 sm:py-32"
      aria-labelledby="relay-demo-heading"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.6fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Interactive Relay demo
            </p>
            <h2
              id="relay-demo-heading"
              className="max-w-3xl text-4xl font-black tracking-[-0.045em] sm:text-5xl"
            >
              Experience the first step of a better lead process.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-slate-300">
            This is the real reusable Relay form running in safe demonstration
            mode. Complete it with sample information to see the full
            interaction and confirmation state.
          </p>
        </div>

        <ServiceBusinessPreview />
      </div>
    </section>
  );
};

export default RelayDemo;
