import { motion } from "framer-motion";

const About = () => {
  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"] },
    { category: "Tools & Others", items: ["Git", "Docker", "AWS", "Figma", "Jest"] }
  ];

  const values = [
    {
      title: "Design-Driven",
      description: "I believe great code starts with great design. Every interface should be intuitive and delightful.",
      icon: "🎨"
    },
    {
      title: "Mobile-First",
      description: "With mobile traffic dominating the web, I design and develop with mobile users as the priority.",
      icon: "📱"
    },
    {
      title: "Accessibility",
      description: "Building inclusive experiences that work for everyone, regardless of their abilities or circumstances.",
      icon: "♿"
    },
    {
      title: "Performance",
      description: "Fast, efficient code that delivers exceptional user experiences without compromise.",
      icon: "⚡"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Me
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Passionate developer with a love for creating meaningful digital experiences that make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/api/placeholder/400/500"
                alt="Drew - Portfolio photo"
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Hi, I'm Drew
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with over 5 years of experience creating 
                  digital solutions that combine beautiful design with robust functionality. My 
                  journey in tech started with a curiosity about how things work, and it's evolved 
                  into a career dedicated to building experiences that matter.
                </p>
                <p>
                  I specialize in modern web technologies, with a particular focus on React, 
                  TypeScript, and Node.js. But beyond the technical skills, I'm driven by the 
                  impact that well-crafted software can have on people's lives.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open source projects, or sharing knowledge with the developer community through 
                  blog posts and mentoring.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              My Values & Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide every project I work on and every line of code I write.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div className="text-3xl mr-4 flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
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
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern web applications from concept to deployment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-accent hover:text-primary transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Build Something Amazing
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and collaborate on innovative projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="btn-primary bg-accent text-primary hover:bg-yellow-400"
              >
                Get In Touch
              </a>
              <a 
                href="/projects" 
                className="btn-secondary border-white text-white hover:bg-white hover:text-primary"
              >
                View My Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
