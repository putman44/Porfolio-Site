// src/components/ProjectsSection.tsx
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
    title: "Field Force (Private Enterprise Project)",
    description:
      "A multi-tenant workflow management platform built for coordinating clients, vendors, and contractors in production environments. Developed secure backend services, relational data models, authentication workflows, and operational dashboards while collaborating directly with stakeholders. Project details and source code remain private under NDA.",
    image: "FieldForce.png",
    tags: ["React", "Python", "PostgreSQL", "SQLAlchemy", "JWT"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    id: 2,
    title: "Production-Ready Service Management REST API",
    description:
      "A production-style REST API for managing customers, service tickets, mechanics, and inventory workflows. Built with Flask, SQLAlchemy, JWT authentication, role-based access control, Swagger documentation, and relational database architecture.",
    image: "MechanicsAPI.png",
    tags: ["Flask", "Python", "SwaggerUI", "JWT Auth", "PostgreSQL"],
    demoUrl:
      "https://project-advanced-api-development.onrender.com/api/docs/#/",
    githubUrl: "https://github.com/putman44/Project-Advanced-API-Development",
  },
  {
    id: 3,
    title: "Spotify Playlist Manager",
    description:
      "A web application to search, manage, and save Spotify playlists. Built with React, JavaScript, and Spotify Web API, this app allows users to create playlists, add tracks, and manage tracks efficiently.",
    image: "SpotifyPlaylistManager.png",
    tags: ["React", "CSS Modules", "JavaScript", "OAuth2"],
    demoUrl: "https://spotify-playlist-manager-alpha.vercel.app/",
    githubUrl: "https://github.com/putman44/Spotify-Playlist-Manager",
  },
  {
    id: 4,
    title: "Interactive-Trivia-SPA",
    description:
      "Interactive Trivia SPA is a dynamic, interactive quiz platform built with React. Users can select a category and difficulty, answer multiple-choice questions, and view their results at the end. The app demonstrates proficiency with modern React features, including hooks, useReducer for state management, contextual state lifting, API integration, and localStorage persistence.",
    image: "OpenTriviaDatabase.png",
    tags: ["React", "JavaScript", "useReducer"],
    demoUrl: "https://interactive-trivia-spa.vercel.app/",
    githubUrl: "https://github.com/putman44/Interactive-Trivia-SPA/",
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
