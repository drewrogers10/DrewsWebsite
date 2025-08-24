import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../content/projects.json";
import SignalToNoiseAnimation from "../components/SignalToNoiseAnimation";

const Projects = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gradient-dark-1 via-gradient-dark-2 to-gradient-dark-3 text-white py-20 relative overflow-hidden">
        <SignalToNoiseAnimation />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My Projects
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              A collection of projects that showcase my passion for creating meaningful digital experiences. 
              Each project represents a unique challenge and learning opportunity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-gray-900">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard 
                key={project.slug} 
                project={project} 
                index={index}
              />
            ))}
          </div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
              Interested in Working Together?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and collaborate on innovative projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="btn-primary"
              >
                Get In Touch
              </a>
              <a 
                href="https://github.com/drewrogers10" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
