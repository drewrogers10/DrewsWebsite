import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary via-secondary to-accent text-white px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Hi, I'm <span className="text-accent">Drew</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8 text-lg md:text-2xl lg:text-3xl font-light max-w-3xl mx-auto"
          >
            Building elegant solutions with code
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12 text-base md:text-lg text-white/90 max-w-2xl mx-auto"
          >
            I'm a passionate developer focused on creating accessible, performant, and beautiful web experiences that make a difference.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              to="/projects" 
              className="btn-primary text-lg px-8 py-4 inline-block"
            >
              View My Projects
            </Link>
            <Link 
              to="/contact" 
              className="btn-secondary text-lg px-8 py-4 inline-block text-white border-white hover:bg-white hover:text-primary"
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/70"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Work Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A selection of projects that showcase my passion for creating meaningful digital experiences.
            </p>
          </motion.div>
          
          <div className="text-center">
            <Link 
              to="/projects" 
              className="btn-primary text-lg"
            >
              Explore All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What I Do
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              I specialize in modern web development with a focus on user experience and accessibility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend Development",
                description: "Creating responsive, accessible user interfaces with React, TypeScript, and modern CSS.",
                icon: "🎨"
              },
              {
                title: "Full-Stack Solutions",
                description: "Building complete web applications with robust backends and seamless integrations.",
                icon: "⚡"
              },
              {
                title: "User Experience",
                description: "Designing intuitive interfaces that prioritize usability and accessibility for all users.",
                icon: "👥"
              }
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {skill.title}
                </h3>
                <p className="text-gray-600">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/about" 
              className="btn-secondary"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
