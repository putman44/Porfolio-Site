import { Briefcase, Code, User } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface Card {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const AboutSection: React.FC = () => {
  const cards: Card[] = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Web Development",
      desc: "Creating responsive websites and web applications with modern frameworks.",
    },
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: "UI/UX Design",
      desc: "Designing intuitive user interfaces and seamless user experiences.",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: "Backend Systems",
      desc: "Designing and integrating APIs, managing application data, and supporting full-stack features.",
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  const cardClasses = (idx: number) =>
    `gradient-border p-6 rounded-2xl bg-secondary/10 transform transition-all duration-300 ease-in
   ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-36"}
   hover:scale-[1.03] delay-${(idx + 1) * 100}`;

  return (
    <section id="about" className="py-12 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-secondary">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Software Engineer & Tech Creator
            </h3>
            <p>
              I build modern, responsive web applications using JavaScript and
              React, with a strong focus on clean UI and performance.
            </p>
            <p>
              I also work on the backend—designing APIs, handling
              authentication, and managing data—to deliver complete, full-stack
              solutions from start to finish.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a className="cosmic-button" href="#contact">
                Get in Touch
              </a>
              <a
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                href="#contact"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div ref={ref} className="grid grid-cols-1 gap-6">
            {cards.map((card, index) => (
              <div key={card.title} className={cardClasses(index)}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    {card.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semi-bold text-lg">{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
