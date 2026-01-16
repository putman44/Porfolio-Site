import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ProjectsSection from "../components/ProjectsSection";
import ScrollingWaves from "../components/ScrollingWaves";
import SkillsSection from "../components/SkillsSection";
import StarBackground from "../components/StarBackground";

const Home = () => {
  return (
    <div className="relative">
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
