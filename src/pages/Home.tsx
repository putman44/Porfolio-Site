// src/pages/Home.tsx
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ProjectsSection from "../components/ProjectsSection";
import ScrollingWaves from "../components/ScrollingWaves";
import Seo from "../components/Seo";
import SkillsSection from "../components/SkillsSection";
import StarBackground from "../components/StarBackground";

const Home = () => {
  return (
    <div className="relative">
      <Seo
        title="Taylor Putman | Software Engineering Portfolio"
        description="Explore Taylor Putman’s software engineering portfolio, including full-stack applications, APIs, integrations, industrial software, automation, and selected projects."
        canonical="https://devbytaylor.com/portfolio"
      />
      <StarBackground />

      <ScrollingWaves />

      <Navbar />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
