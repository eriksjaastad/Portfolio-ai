import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
  icon: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript', level: 90, category: 'frontend', icon: '📘' },
  { name: 'JavaScript', level: 95, category: 'frontend', icon: '🟨' },
  { name: 'HTML5', level: 90, category: 'frontend', icon: '🌐' },
  { name: 'CSS3', level: 90, category: 'frontend', icon: '🎨' },
  { name: 'Redux', level: 90, category: 'frontend', icon: '🔄' },
  { name: 'React Router', level: 85, category: 'frontend', icon: '🛣️' },
  
  // Backend & Tools
  { name: 'NodeJS', level: 85, category: 'backend', icon: '🟩' },
  { name: 'MongoDB', level: 80, category: 'backend', icon: '🍃' },
  { name: 'S3', level: 85, category: 'backend', icon: '☁️' },
  
  // Testing & Development
  { name: 'Jest', level: 90, category: 'tools', icon: '🃏' },
  { name: 'React Testing Library', level: 90, category: 'tools', icon: '🧪' },
  { name: 'Playwright', level: 85, category: 'tools', icon: '🎭' },
  { name: 'StoryBook', level: 85, category: 'tools', icon: '📚' },
  { name: 'Git', level: 90, category: 'tools', icon: '📦' }
];

export function Skills() {
  const categories = ['frontend', 'backend', 'tools'];
  
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white capitalize mb-6">
                {category === 'frontend' ? 'Frontend Development' :
                 category === 'backend' ? 'Backend Development' :
                 'Tools & Technologies'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md"
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-2" role="img" aria-label={skill.name}>
                          {skill.icon}
                        </span>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </h4>
                      </div>
                      
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                        />
                      </div>
                      <div className="mt-1 text-right text-sm text-gray-600 dark:text-gray-300">
                        {skill.level}%
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
