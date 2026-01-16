import { useScroll, useTransform, motion } from "framer-motion";

const X_LINES = 60;
const INITIAL_WIDTH = 20;

const ScrollingWaves: React.FC = () => {
  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      {/* Bars on left */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between pointer-events-none">
        {Array.from({ length: X_LINES }).map((_, i) => {
          // Each bar's width depends on scrollYProgress
          const width = useTransform(scrollYProgress, (scrollP) => {
            const percentilePosition = (i - 2.5) / X_LINES;
            return (
              INITIAL_WIDTH / 4 +
              10 *
                Math.cos(((percentilePosition - scrollP) * Math.PI) / 1) ** 100
            );
          });

          return (
            <motion.div
              key={i}
              className="bg-secondary h-[1vh]"
              style={{ width }}
            />
          );
        })}
      </div>

      {/* Rotating Gear */}
      <motion.div
        className="absolute transform translate-x-4 w-7"
        style={{
          top: useTransform(scrollYProgress, (p) => `${p * 100}%`),
          rotate: useTransform(scrollYProgress, (p) => `${p * 360 * 8}deg`),
          transformOrigin: "center",
        }}
      >
        <img src="Gear.svg" alt="Gear" className="w-24 h-24" />
      </motion.div>
    </div>
  );
};
export default ScrollingWaves;
