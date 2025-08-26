import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data/portfolio';

const Experience: React.FC = () => {
  const { experience } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="experience" className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Professional Experience
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {experience.map((job, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card hover:border-blue-500/50"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {job.position}
                  </h3>
                  <h4 className="text-xl text-blue-600 dark:text-blue-400 mb-2">
                    {job.company}
                  </h4>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    {job.duration}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500">
                    {job.location}
                  </p>
                </div>
              </div>

              {job.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {job.description}
                </p>
              )}

              {job.clients ? (
                <div className="space-y-6">
                  {job.clients.map((client, clientIndex) => (
                    <div key={clientIndex} className="border-l-4 border-blue-500 pl-4">
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {client.name}
                      </h5>
                      <ul className="space-y-2">
                        {client.achievements.map((achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="text-gray-600 dark:text-gray-300 flex items-start"
                          >
                            <span className="text-blue-500 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {job.achievements?.map((achievement, achievementIndex) => (
                    <li
                      key={achievementIndex}
                      className="text-gray-600 dark:text-gray-300 flex items-start"
                    >
                      <span className="text-blue-500 mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
