import { Link } from "react-router-dom";

const DevByTaylor: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold">Dev by Taylor</h1>
      <Link className="cosmic-button" to="/portfolio">
        View portfolio
      </Link>
    </main>
  );
};

export default DevByTaylor;
