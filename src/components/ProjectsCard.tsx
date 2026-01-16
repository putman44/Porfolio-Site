import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: Array<string>;
  demoUrl: string;
  githubUrl: string;
}

interface ProjectsCardProps {
  projects: Project[];
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div
          className="group bg-secondary/10 rounded-lg overflow-hidden shadow-xs card-hover"
          key={project.id}
        >
          <div className="h-48 my-2 overflow-hidden ">
            <img
              className="w-fit mx-auto rounded-xl h-full object-contain transition-transform duration-500 group-hover:scale-110"
              src={project.image}
              alt={project.title}
            />
          </div>
          <div className="p-3">
            <div className="h-[60px] flex flex-wrap justify-center-safe gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span
                  className="px-2 h-fit bg-primary py-1 text-xs font-medium border rounded-full"
                  key={index}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl line-clamp-1 font-semibold mb-1">
              {project.title}
            </h3>
            <p className="text-sm mb-4 line-clamp-3">{project.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <a
                  className="p-2  rounded-3xl hover:bg-primary text-foreground/80 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.demoUrl}
                >
                  <ExternalLink size={25} />
                </a>
                <a
                  className="p-2  rounded-3xl text-foreground/80 hover:bg-primary transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.githubUrl}
                >
                  <Github size={25} />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProjectsCard;
