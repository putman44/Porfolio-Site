import { ArrowRight } from "lucide-react";
import ProjectsCard from "./ProjectsCard";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: Array<string>;
  demoUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Production-Ready Service Management REST API",
    description:
      "A RESTful API for managing customers, mechanics, inventory parts, and service tickets, built with Flask, SQLAlchemy, and a relational database, featuring authentication, role-based access control, and Swagger UI documentation.",
    image: "MechanicsAPI.png",
    tags: ["Flask", "Python", "SwaggerUI", "JWT Auth", "PostgreSQL"],
    demoUrl:
      "https://project-advanced-api-development.onrender.com/api/docs/#/",
    githubUrl: "https://github.com/putman44/Project-Advanced-API-Development",
  },
  {
    id: 2,
    title: "Spotify Playlist Manager",
    description:
      "A web application to search, manage, and save Spotify playlists. Built with React, JavaScript, and Spotify Web API, this app allows users to create playlists, add tracks, and manage tracks efficiently.",
    image: "SpotifyPlaylistManager.png",
    tags: ["React", "TailwindCSS", "Javascript", "OAuth2"],
    demoUrl: "https://spotify-playlist-manager-alpha.vercel.app/",
    githubUrl: "https://github.com/putman44/Spotify-Playlist-Manager",
  },
  {
    id: 3,
    title: "Open Trivia Database Quiz App",
    description:
      "The Trivia Quiz App is a dynamic, interactive quiz platform built with React. Users can select a category and difficulty, answer multiple-choice questions, and view their results at the end. The app demonstrates proficiency with modern React features, including hooks, useReducer for state management, contextual state lifting, API integration, and localStorage persistence.",
    image: "OpenTriviaDatabase.png",
    tags: ["React", "Javascript", "useReducer"],
    demoUrl: "https://open-trivia-database-quiz-app.vercel.app/",
    githubUrl: "https://github.com/putman44/Open-Trivia-Database-Quiz-App",
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-12 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects</span>
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, perfomance, and user experience.
        </p>
        <ProjectsCard projects={projects} />
        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            href="https://github.com/putman44/"
            target="_blank"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
