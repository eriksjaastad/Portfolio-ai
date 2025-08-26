export const portfolioData = {
  personal: {
    name: "ERIK SJAASTAD",
    phone: "206-755-5373",
    email: "erik@logicdesigns.com",
    linkedin: "linkedin.com/in/erikodin",
    summary: "Dynamic Senior Software Engineer with 10+ years of experience, a positive and collaborative attitude, and an eye towards continual improvement and innovation. Dedicated to creating and implementing standards that maximize productivity and minimize churn. Proven ability to ramp up quickly and perform above expectations."
  },
  skills: [
    {
      category: "Frontend",
      technologies: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Redux", "React Router", "React Testing Library"]
    },
    {
      category: "Testing & Development",
      technologies: ["Jest", "Playwright", "StoryBook", "GIT"]
    },
    {
      category: "Backend & Infrastructure",
      technologies: ["NodeJS", "S3"]
    },
    {
      category: "Design",
      technologies: ["UX"]
    }
  ],
  experience: [
    {
      company: "Rooster Park",
      location: "Seattle, WA",
      position: "Software Engineer & Consultant",
      duration: "10.2015 - 8.2022",
      clients: [
        {
          name: "98Point6",
          achievements: [
            "Key member of a small engineering team, focused on building self-service dashboards for doctors and patients",
            "Completed work on patient surveys and doctor/patient chat client",
            "Integrated new tools and forms with the existing React architecture written in TypeScript"
          ]
        },
        {
          name: "Redfin",
          achievements: [
            "Rebuilt the Redfin career site and worked on improving the performance of the primary consumer-facing Redfin.com site",
            "Created reusable React functional and class components based on Airbnb's style guide",
            "Implemented performance monitoring with Grafana and Kibana, and accessibility",
            "Worked closely with designers to set design standards for all new designs going forward"
          ]
        },
        {
          name: "Double Down Interactive",
          achievements: [
            "Built new games, identified and resolved inefficiencies in software production, and created faster and more reliable processes",
            "Improved efficiency and quality and helped facilitate adoption by other in-house teams",
            "Created clear and concise documentation and disseminated, modeled, and demonstrated new best practices",
            "Worked with the special projects team to move game development to React architecture"
          ]
        },
        {
          name: "Artefact",
          achievements: [
            "Designed and built new components for an existing social media app using React on top of a Rails framework",
            "Found and fixed legacy bugs and updated documentation"
          ]
        }
      ]
    },
    {
      company: "iStreamPlanet",
      location: "Seattle, WA",
      position: "Senior Software Engineer",
      duration: "06.2018 - 02.2022",
      description: "iStreamPlanet is one of the largest live, real-time streaming platforms in the world, delivering thousands of events a year, such as March Madness, the World Cup, and the Olympics.",
      achievements: [
        "Key member of a small engineering team, focused on building customer-facing self-service dashboards",
        "Developed React components using MVVM, unit tests, end-to-end tests, and created component stories",
        "Released new features to S3 through GitHub Actions and implemented feature flags using LaunchDarkly",
        "Created Pebble, an open-source design system comprised of styled React components",
        "Built APIs with Golang and Node.js to interact with Auth0 and MongoDB",
        "Mentored and trained a junior engineer, who became a solid contributing member of our team"
      ]
    }
  ],
  projects: [
    {
      name: "Gerrymender",
      description: "A web application that encourages users to explore the issue of gerrymandering via an interactive map of US congressional districts and data from the US Census and other sources.",
      achievements: [
        "Designed and built React component architecture",
        "Calculations, formatting, and display of data from the census API"
      ],
      repository: "github.com/eriksjaastad/indulge"
    },
    {
      name: "Indulge",
      description: "Real time map of tweets in Seattle to see if something big is going on nearby.",
      technologies: [
        "Backend: Node, Express, MongoDB, Twitter API, Socket.IO",
        "Frontend: Angular, Google Maps API, JQueryUI Map",
        "Languages: JavaScript, HTML, SASS"
      ],
      repository: "github.com/eriksjaastad/gerrymander"
    }
  ],
  education: [
    {
      degree: "BFA, Ceramics and Sculpture",
      institution: "University of Washington",
      location: "Seattle, WA"
    }
  ],
  certifications: [
    "Full Stack JavaScript Accelerator // Code Fellows",
    "Web Development and Programming // Seattle Central Community College"
  ]
};
