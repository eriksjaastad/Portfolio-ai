import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://logicdesigns.com';
const API = `${BACKEND_URL}/api`;

// Log the API URL for debugging
console.log('Using API URL:', API);

// Navigation Component
const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-blue-400">ES</div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors hover:text-blue-400 ${
                  activeSection === item.id ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = ({ profile }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {profile?.name || 'Erik Sjaastad'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            {profile?.tagline || 'Software Engineer | React | Professional Traveler'}
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {profile?.summary || 'Dynamic Senior Software Engineer with 10+ years of experience...'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay">
          <button 
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 font-semibold"
          >
            View My Work
          </button>
          <button 
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-all transform hover:scale-105 font-semibold"
          >
            Get In Touch
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

// About Section
const AboutSection = ({ profile }) => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-1">
              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Professional Journey</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  With over 10 years of experience in software engineering, I've had the privilege of working 
                  with industry leaders like Redfin, iStreamPlanet, and 98point6. My expertise lies in building 
                  scalable React applications and mentoring teams to deliver exceptional user experiences.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  As a professional traveler and remote work advocate, I bring a global perspective to every 
                  project. My entrepreneurial background with LogicDesigns, where I grew revenue from $0 to $240K, 
                  gives me unique insight into building products that truly matter to users.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  My creative background in ceramics and sculpture adds a unique dimension to my approach to 
                  software development - I believe great code is both functional and beautiful.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">🎯 What I Do Best</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Building scalable React/Redux applications</li>
                <li>• Mentoring and leading development teams</li>
                <li>• Creating design systems and reusable components</li>
                <li>• Performance optimization and accessibility</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-purple-400 mb-2">🌟 Core Values</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• Continuous learning and innovation</li>
                <li>• Collaborative and positive team culture</li>
                <li>• Quality code with minimal technical debt</li>
                <li>• User-centric development approach</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = ({ skills }) => {
  const skillCategories = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {}) || {};

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-green-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Intermediate': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gray-800/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Technical Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            <div key={category} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">{category}</h3>
              <div className="space-y-3">
                {categorySkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = ({ experience }) => {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Professional Experience</h2>
        <div className="space-y-8">
          {experience?.map((exp, index) => (
            <div key={index} className="bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.position}</h3>
                    <h4 className="text-xl text-blue-400 mb-2">{exp.company}</h4>
                    {exp.consultant_role && (
                      <p className="text-sm text-purple-400 mb-2">Role: {exp.consultant_role}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 font-semibold">{exp.duration}</p>
                    <p className="text-gray-400 text-sm">{exp.location}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <ul className="text-gray-300 space-y-2">
                    {exp.description?.map((desc, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies?.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = ({ projects }) => {
  return (
    <section id="projects" className="py-20 px-4 bg-gray-800/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects?.map((project, index) => (
            <div key={index} className="bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all overflow-hidden hover:transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.github && (
                    <a href={`https://${project.github}`} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                       className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ profile }) => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">Let's Work Together</h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          I'm always interested in new opportunities and exciting projects. 
          Let's discuss how we can create something amazing together.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
            <a href={`mailto:${profile?.contact?.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
              {profile?.contact?.email}
            </a>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">LinkedIn</h3>
            <a href={`https://${profile?.contact?.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              Connect with me
            </a>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Portfolio</h3>
            <a href={`https://${profile?.contact?.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              View More Work
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <a href={`mailto:${profile?.contact?.email}`} 
             className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  );
};

// Main App Component
function App() {
  const [portfolioData, setPortfolioData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  const [error, setError] = useState(null);

  // Configure axios defaults
  useEffect(() => {
    axios.defaults.timeout = 5000; // 5 second timeout
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.code === 'ECONNABORTED') {
          return Promise.reject(new Error('Request timed out. Please try again.'));
        }
        return Promise.reject(error);
      }
    );
  }, []);

  // Prevent duplicate fetches in development
  const [hasFetched, setHasFetched] = useState(false);

  // Fetch portfolio data
  useEffect(() => {
    const fetchPortfolioData = async () => {
      // Skip if we've already fetched data
      if (hasFetched) return;
      
      try {
        setError(null);
        console.log('Starting API calls to:', API);
        const endpoints = ['profile', 'skills', 'experience', 'projects'];
        const requests = endpoints.map(endpoint => {
          console.log(`Fetching ${endpoint} from: ${API}/${endpoint}`);
          return axios.get(`${API}/${endpoint}`).catch(error => {
            console.error(`Error fetching ${endpoint}:`, error.message);
            console.error('Full error:', error);
            return { data: null };
          });
        });

        const [profileRes, skillsRes, experienceRes, projectsRes] = await Promise.all(requests);

        console.log('API responses:', {
          profile: profileRes?.data,
          skills: skillsRes?.data,
          experience: experienceRes?.data,
          projects: projectsRes?.data
        });

        const newData = {
          profile: profileRes?.data,
          skills: skillsRes?.data,
          experience: experienceRes?.data,
          projects: projectsRes?.data
        };

        if (!newData.profile && !newData.skills && !newData.experience && !newData.projects) {
          throw new Error('No data received from any endpoint');
        }

        setPortfolioData(newData);
        setHasFetched(true);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setError(error.message || 'Failed to load portfolio data');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  // Scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-300 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  console.log('Rendering with data:', portfolioData);

  return (
    <div className="App bg-gray-900 text-white min-h-screen">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <HeroSection profile={portfolioData.profile} />
      <AboutSection profile={portfolioData.profile} />
      <SkillsSection skills={portfolioData.skills} />
      <ExperienceSection experience={portfolioData.experience} />
      <ProjectsSection projects={portfolioData.projects} />
      <ContactSection profile={portfolioData.profile} />
    </div>
  );
}

export default App;