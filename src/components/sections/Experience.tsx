import React from 'react';
import { motion } from 'framer-motion';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: (string | JSX.Element)[];
  client?: string;
}

const experiences: Experience[] = [
  {
    company: "iStreamPlanet",
    role: "Senior Software Engineer",
    period: "06.2018 - 02.2022",
    location: "Seattle, WA",
    description: [
      <>Led development of customer-facing self-service dashboards for <span className="text-blue-400 inline">major events including March Madness, World Cup, and Olympics</span>. Customers use these dashboards to schedule content, select and manage live streaming events, and add advertising.</>,
      <>Created <span className="text-blue-400 inline">Pebble</span>, an open-source design system of styled React components that <span className="text-green-400 inline">reduced development time by 40%</span> and increased reliability across teams.</>,
      <>Architected and implemented <span className="text-purple-400 inline">high-performance React components</span> using MVVM pattern, with comprehensive unit and end-to-end testing coverage.</>,
      <>Established CI/CD pipeline using GitHub Actions and implemented feature flags with LaunchDarkly, resulting in <span className="text-green-400 inline">zero deployment-related incidents</span>.</>,
      <>Built scalable APIs with <span className="text-blue-400 inline">Golang</span> and <span className="text-blue-400 inline">Node.js</span>, integrating Auth0 and MongoDB, supporting real-time data for <span className="text-green-400 inline">millions of concurrent users</span>.</>,
      <>Mentored junior engineers and led technical discussions, resulting in <span className="text-green-400 inline">3 successful promotions</span> within the team.</>
    ]
  },
  {
    company: "Rooster Park",
    role: "Software Engineer & Consultant",
    period: "10.2015 - 8.2022",
    location: "Seattle, WA",
    client: "98Point6",
    description: [
      <>Spearheaded development of <span className="text-purple-400 inline">HIPAA-compliant</span> self-service dashboards for doctors and patients, improving healthcare accessibility.</>,
      <>Architected and delivered a <span className="text-blue-400 inline">real-time doctor/patient chat system</span> with <span className="text-green-400 inline">99.9% uptime</span>.</>,
      <>Integrated complex medical forms and tools with existing <span className="text-purple-400 inline">React/TypeScript architecture</span>, ensuring ADA compliance.</>
    ]
  },
  {
    company: "Rooster Park",
    client: "Redfin",
    role: "Software Engineer & Consultant",
    period: "10.2015 - 8.2022",
    location: "Seattle, WA",
    description: [
      <>Led complete rebuild of <span className="text-blue-400 inline">Redfin.com</span>, achieving <span className="text-green-400 inline">40% faster page loads</span>.</>,
      <>Developed a library of <span className="text-purple-400 inline">20+ reusable React components</span> following Airbnb's style guide, now used across multiple teams.</>,
      <>Implemented comprehensive performance monitoring using <span className="text-blue-400 inline">Grafana and Kibana</span>, enabling data-driven optimizations.</>,
      <>Established new design system standards through close collaboration with design team, improving development velocity by <span className="text-green-400 inline">30%</span>.</>
    ]
  },
  {
    company: "Rooster Park",
    client: "Double Down Interactive",
    role: "Software Engineer & Consultant",
    period: "10.2015 - 8.2022",
    location: "Seattle, WA",
    description: [
      <>Revolutionized game development process by <span className="text-purple-400 inline">migrating legacy codebase to React</span>, reducing build times by <span className="text-green-400 inline">50%</span>.</>,
      <>Implemented automated testing and CI/CD pipelines, resulting in <span className="text-green-400 inline">90% reduction in production bugs</span>.</>,
      <>Created comprehensive documentation and best practices, leading to successful adoption by <span className="text-green-400 inline">4 development teams</span>.</>,
      <>Mentored teams through React transition, resulting in <span className="text-green-400 inline">2x faster feature delivery</span>.</>
    ]
  },
  {
    company: "Rooster Park",
    client: "Artefact",
    role: "Software Engineer & Consultant",
    period: "10.2015 - 8.2022",
    location: "Seattle, WA",
    description: [
      <>Engineered modern React components for social media platform, integrated with <span className="text-blue-400 inline">Rails backend</span>.</>,
      <>Reduced bug count by <span className="text-green-400 inline">60%</span> through systematic code review and refactoring.</>
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-slate-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.client || index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800 rounded-xl p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 space-y-2 sm:space-y-0">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-white">
                    {exp.company}
                    {exp.client && (
                      <span className="text-blue-400">
                        {" "}
                        • {exp.client}
                      </span>
                    )}
                  </h3>
                  {exp.role && (
                    <p className="text-lg sm:text-2xl text-gray-400 mt-1 font-light">
                      {exp.role}
                    </p>
                  )}
                </div>
                {exp.period && (
                  <div className="sm:text-right">
                    <p className="text-lg sm:text-2xl text-gray-300 font-light">
                      {exp.period}
                    </p>
                    {exp.location && (
                      <p className="text-base sm:text-xl text-gray-400 font-light">
                        {exp.location}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <ul className="space-y-4">
                {exp.description.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + itemIndex * 0.1 }}
                    className="flex text-gray-300 leading-relaxed"
                  >
                    <span className="text-blue-400 mr-3 flex-shrink-0">
                      &gt;
                    </span>
                    <span className="flex-1">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
