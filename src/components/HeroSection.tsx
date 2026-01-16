import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  y: any; // motion value
  src: string;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ y, src }) => (
  <motion.div style={{ y }} className="absolute inset-0">
    <div
      className="h-full w-full bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${src})` }}
    />
  </motion.div>
);

const HeroSection = () => {
  const { scrollY } = useScroll();

  // Map scroll → parallax offsets
  const bgF = useTransform(scrollY, [0, 800], [0, 200]);
  const bgM = useTransform(scrollY, [0, 600], [0, 200]);
  const bgB = useTransform(scrollY, [0, 400], [0, 200]);
  const contentY = useTransform(scrollY, [0, 600], [0, 200]);

  // Input: [0, 600] → scrollY from 0 to 600 pixels
  // Output: [0, 100] → move 0 → 100 pixels vertically (y)

  return (
    <section
      id="hero"
      className="relative min-h-[300px] mt-16 md:min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Foreground layer */}
      <ParallaxLayer y={bgF} src="Foreground.svg" />

      {/* Middle layer */}
      <ParallaxLayer y={bgM} src="Middle.svg" />

      {/* Background layer */}
      <ParallaxLayer y={bgB} src="Background.svg" />

      {/* Foreground content */}
      <motion.header
        style={{ y: contentY }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span className="text-secondary opacity-0 animate-fade-in">
            Hi, I'm
          </span>
          <span className="text-primary ml-2 opacity-0 animate-fade-in-delay-1">
            Taylor
          </span>
          <span className="text-secondary ml-2 opacity-0 animate-fade-in-delay-2">
            Putman
          </span>
        </h1>

        <p className="py-4 text-lg md:text-xl max-w-sm mx-auto opacity-0 animate-fade-in-delay-3">
          I create stellar web experiences with modern technologies.
        </p>

        <div className="opacity-0 animate-fade-in-delay-4">
          <a className="cosmic-button text-gray-100" href="#projects">
            View My Work
          </a>
        </div>
      </motion.header>

      {/* Scroll Indicator */}
      <div
        aria-label="Scroll down"
        className="hidden absolute bottom-12 left-1/2 -translate-x-1/2 md:flex flex-col items-center animate-bounce"
      >
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;
