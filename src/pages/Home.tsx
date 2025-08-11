import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHorizontalScroll, ScrollSection } from "../hooks/useHorizontalScroll";
import HorizontalScrollContainer, { ScrollSection as ScrollSectionComponent } from "../components/HorizontalScrollContainer";
import ScrollDrivenWaveform from "../components/ScrollDrivenWaveform";

import DynamicBackgroundFilter from "../components/DynamicBackgroundFilter";

import { TransitionButton } from "../components/TransitionWrapper";

const Home = () => {
  // Define the sections for horizontal scrolling
  const sections: ScrollSection[] = [
    { id: 'chaos', title: 'CHAOS', chaosLevel: 1.0, colorTheme: 'noise' },
    { id: 'filtering', title: 'FILTERING', chaosLevel: 0.6, colorTheme: 'transition' },
    { id: 'organizing', title: 'ORGANIZING', chaosLevel: 0.3, colorTheme: 'signal' },
    { id: 'signal', title: 'SIGNAL', chaosLevel: 0.0, colorTheme: 'pure' }
  ];

  const {
    containerRef,
    scrollProgress,
    isScrolling,
    getChaosLevel
  } = useHorizontalScroll(sections);



  return (
    <div className="min-h-screen relative">
      {/* Dynamic Background Color Filter */}
      <DynamicBackgroundFilter
        scrollProgress={scrollProgress}
        className="fixed inset-0"
      />

      {/* Global Waveform Background */}
      <ScrollDrivenWaveform
        chaosLevel={getChaosLevel()}
        scrollProgress={scrollProgress}
        isScrolling={isScrolling}
        className="fixed inset-0"
      />



      {/* Horizontal Scroll Container */}
      <HorizontalScrollContainer containerRef={containerRef}>
        
        {/* Section 1: NOISE/CHAOS - Hero Introduction */}
        <ScrollSectionComponent id="chaos">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="text-center text-white w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 lg:p-10 border border-white/10 transition-all duration-500 ease-out hover:bg-white/8 hover:border-white/20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5, duration: 1.0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
              style={{
                textShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
                transform: `rotate(${Math.sin(Date.now() * 0.001) * 2}deg)`
              }}
            >
              DREW
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8, duration: 1.0 }}
              className="mb-8 text-xl md:text-3xl font-light"
            >
              From <span className="text-red-300 font-bold">CHAOS</span> to <span className="text-blue-300 font-bold">CLARITY</span>
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1.1, duration: 1.0 }}
              className="mb-12 text-lg text-white/80 max-w-2xl mx-auto"
            >
              I transform complex problems into elegant solutions, filtering signal from noise in the digital landscape.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-white/60 text-sm"
            >
              Scroll right to discover the signal →
            </motion.div>
          </motion.div>
        </ScrollSectionComponent>

        {/* Section 2: FILTERING - Skills & Approach */}
        <ScrollSectionComponent id="filtering">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true }}
            className="text-center text-white w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 lg:p-10 border border-white/10 transition-all duration-500 ease-out hover:bg-white/8 hover:border-white/20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-purple-200">
              FILTERING THE NOISE
            </h2>
            
            <p className="text-xl mb-12 text-white/90 max-w-3xl mx-auto">
              Through careful analysis and modern development practices, I separate meaningful patterns from digital chaos.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Frontend Mastery",
                  description: "React, TypeScript, and modern frameworks",
                  icon: "⚛️",
                  chaos: 0.7
                },
                {
                  title: "System Architecture",
                  description: "Scalable, maintainable code structures",
                  icon: "🏗️",
                  chaos: 0.5
                },
                {
                  title: "User Experience",
                  description: "Intuitive, accessible interfaces",
                  icon: "✨",
                  chaos: 0.3
                }
              ].map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                >
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-200">
                    {skill.title}
                  </h3>
                  <p className="text-white/80">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollSectionComponent>

        {/* Section 3: ORGANIZING - Featured Work */}
        <ScrollSectionComponent id="organizing">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true }}
            className="text-center text-white w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 lg:p-10 border border-white/10 transition-all duration-500 ease-out hover:bg-white/8 hover:border-white/20"
            data-transition-source="organizing-panel"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-blue-200">
              ORGANIZING SOLUTIONS
            </h2>
            
            <p className="text-xl mb-12 text-white/90 max-w-3xl mx-auto">
              Structured approaches to complex challenges, bringing order to digital experiences.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: "E-Commerce Platform",
                  description: "Full-stack solution with React, Node.js, and PostgreSQL",
                  tags: ["React", "Node.js", "PostgreSQL"],
                  link: "/projects"
                },
                {
                  title: "Data Visualization",
                  description: "Interactive dashboards with D3.js and real-time updates",
                  tags: ["D3.js", "WebSocket", "Python"],
                  link: "/projects"
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-blue-200">
                    {project.title}
                  </h3>
                  <p className="text-white/80 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={project.link}
                    className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    View Details →
                  </Link>
                </motion.div>
              ))}
            </div>

            <TransitionButton
              transition={{ 
                route: '/projects', 
                sourceSelector: '[data-transition-source="organizing-panel"]',
                type: 'expand'
              }}
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Explore All Projects
            </TransitionButton>
          </motion.div>
        </ScrollSectionComponent>

        {/* Section 4: PURE SIGNAL - Contact & Call to Action */}
        <ScrollSectionComponent id="signal">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-4xl bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-cyan-200">
              PURE SIGNAL
            </h2>
            
            <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto">
              Clear communication. Precise execution. Let's create something meaningful together.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20"
              >
                <h3 className="text-2xl font-semibold mb-4 text-cyan-200">
                  Ready to Build?
                </h3>
                <p className="text-white/80 mb-6">
                  Transform your ideas into elegant digital solutions with modern web technologies.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Start a Project
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20"
              >
                <h3 className="text-2xl font-semibold mb-4 text-cyan-200">
                  Let's Connect
                </h3>
                <p className="text-white/80 mb-6">
                  Discuss opportunities, share ideas, or just say hello. Clear communication starts here.
                </p>
                <Link 
                  to="/about" 
                  className="inline-block border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-cyan-300/60 text-sm"
            >
              Signal achieved. Message clear.
            </motion.div>
          </motion.div>
        </ScrollSectionComponent>

      </HorizontalScrollContainer>
    </div>
  );
};

export default Home;
