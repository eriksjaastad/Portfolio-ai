import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Gerrymender",
    description: "A web application that encourages users to explore gerrymandering via an interactive map of US congressional districts. Integrates data from the US Census and other sources for comprehensive analysis.",
    tags: ["React", "Census API", "Data Visualization", "Interactive Maps"],
    image: "/gerrymender.jpg",
    link: "https://gerrymender.com",
    github: "https://github.com/eriksjaastad/gerrymander"
  },
  {
    title: "Indulge",
    description: "Real-time map visualization of tweets in Seattle to discover trending local events. Features live updates and geographic clustering of social media activity.",
    tags: ["Node.js", "Express", "MongoDB", "Socket.IO", "Google Maps API"],
    image: "/indulge.jpg",
    link: "https://indulge.com",
    github: "https://github.com/eriksjaastad/indulge"
  },
  {
    title: "Pebble Design System",
    description: "An open-source design system built at iStreamPlanet, comprising styled React components. Significantly reduced development time and increased reliability across projects.",
    tags: ["React", "TypeScript", "StoryBook", "Design System"],
    image: "/pebble.jpg",
    link: "https://pebble.design"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative pb-[60%] bg-gray-200 dark:bg-gray-600">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute inset-0 bg-blue-600/10"
                >
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 flex items-center justify-center text-4xl text-blue-600">
                    🚀
                  </div>
                </motion.div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 
                               dark:text-blue-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-blue-600 text-white 
                             rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Project
                  </motion.a>
                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border-2 border-blue-600 text-blue-600 
                               dark:text-blue-400 rounded-lg hover:bg-blue-600 
                               hover:text-white transition-colors"
                    >
                      GitHub
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
