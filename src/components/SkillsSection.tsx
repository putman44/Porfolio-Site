import { useState } from "react";
import { motion, type Variants } from "framer-motion";

interface Skill {
  name: string;
}

type Category = "frontend" | "backend" | "tools";

const Frontend: Skill[] = [
  { name: "HTML/CSS" },
  { name: "JavaScript" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "Tailwind CSS" },
  { name: "Motion" },
  { name: "React Spring" },
  { name: "OAuth2" },
];

const Backend: Skill[] = [
  { name: "Node.js" },
  { name: "Express" },
  { name: "MongoDB" },
  { name: "MySQL" },
  { name: "Python" },
  { name: "Swagger UI" },
  { name: "SQLAlchemy" },
  { name: "JWT Auth" },
];

const Tools: Skill[] = [
  { name: "Git/GitHub" },
  { name: "Docker" },
  { name: "Figma" },
  { name: "VS Code" },
];

const skillsMap: Record<Category, Skill[]> = {
  frontend: Frontend,
  backend: Backend,
  tools: Tools,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const skillVariants: Variants = {
  hidden: { opacity: 0, scale: 0, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("frontend");

  const categories: Category[] = ["frontend", "backend", "tools"];

  return (
    <section
      id="skills"
      className="py-15 xl:w-3/6 px-6 bg-secondary/10 w-10/12 mx-auto rounded-3xl"
    >
      {/* ---------- HEADING ---------- */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        My <span className="text-primary">Skills</span>
      </h2>

      {/* ---------- CATEGORY TABS ---------- */}
      <div className="flex justify-center gap-6 mb-10 relative">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className="relative px-6 py-2 font-semibold text-secondary hover:text-secondary transition"
          >
            <span
              className={`${
                activeCategory === category ? "text-primary" : "text-primary/80"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>

            {activeCategory === category && (
              <motion.span
                layoutId="underline"
                className="absolute left-0 -bottom-1 h-0.5 w-full bg-primary rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* ---------- SKILLS GRID ---------- */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeCategory} // remount grid to restart animation
      >
        {skillsMap[activeCategory].map((skill) => (
          <motion.div
            key={skill.name}
            variants={skillVariants}
            whileHover={{
              scale: 1.1,
              rotate: 2,
              y: -3,
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
            className="flex text-primary-foreground p-3 items-center justify-center font-semibold rounded-xl bg-primary shadow-sm hover:shadow-md cursor-default"
          >
            {skill.name}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;
