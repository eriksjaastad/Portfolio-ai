import React from 'react';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-20 min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300">
              As a Senior Software Engineer at iStreamPlanet, I played a key role in building 
              customer-facing self-service dashboards for one of the largest live streaming 
              platforms in the world, delivering major events like March Madness, the World Cup, 
              and the Olympics.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              I created Pebble, an open-source design system of styled React components, 
              which significantly improved developer efficiency and reliability. My expertise 
              spans from React and TypeScript to building APIs with Golang and Node.js, 
              integrating with services like Auth0 and MongoDB.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Through my work at Rooster Park, I've contributed to major projects for clients 
              like 98Point6, Redfin, and Double Down Interactive, focusing on building 
              self-service dashboards, improving performance, and implementing best practices 
              that maximize productivity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Core Strengths
              </h3>
              <ul className="space-y-3">
                {[
                  "Frontend Architecture & Development",
                  "Performance Optimization",
                  "Team Leadership & Mentoring",
                  "Problem Solving & Innovation",
                  "Technical Communication"
                ].map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {strength}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Facts
              </h3>
              <ul className="space-y-3">
                {[
                  "10+ Years of Professional Experience",
                  "50+ Successfully Delivered Projects",
                  "Worked with Fortune 500 Companies",
                  "Open Source Contributor",
                  "International Remote Work Experience"
                ].map((fact, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + (index * 0.1) }}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {fact}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
