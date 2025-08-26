from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Dict, Any
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Portfolio Data
PORTFOLIO_DATA = {
    "profile": {
        "name": "Erik Sjaastad",
        "title": "Senior Software Engineer",
        "tagline": "Software Engineer | React Specialist | Professional Traveler",
        "summary": "Dynamic Senior Software Engineer with 10+ years of experience specializing in React, TypeScript, and modern web technologies. Proven track record of delivering high-impact solutions across healthcare, real estate, gaming, and streaming industries. Known for creating scalable component libraries, implementing performance optimizations, and establishing engineering best practices. Demonstrates exceptional ability to collaborate with cross-functional teams while mentoring junior developers and driving technical innovation.",
        "contact": {
            "email": "erik@logicdesigns.com",
            "linkedin": "linkedin.com/in/erikodin",
            "phone": "206-755-5373",
            "portfolio": "eriksjaastad.com",
            "location": "Seattle, WA"
        },
        "location": "Seattle, WA"
    },
    "skills": [
        {"name": "React", "category": "Frontend Development", "level": "Expert"},
        {"name": "TypeScript", "category": "Frontend Development", "level": "Expert"},
        {"name": "JavaScript", "category": "Frontend Development", "level": "Expert"},
        {"name": "HTML5", "category": "Frontend Development", "level": "Expert"},
        {"name": "CSS3", "category": "Frontend Development", "level": "Expert"},
        {"name": "Redux", "category": "Frontend Development", "level": "Expert"},
        {"name": "React Router", "category": "Frontend Development", "level": "Expert"},
        {"name": "React Testing Library", "category": "Testing & Quality", "level": "Expert"},
        {"name": "StoryBook", "category": "UI/UX & Component Libraries", "level": "Expert"},
        {"name": "UX Design", "category": "UI/UX & Component Libraries", "level": "Advanced"},
        {"name": "Component Architecture", "category": "UI/UX & Component Libraries", "level": "Expert"},
        {"name": "Design Systems", "category": "UI/UX & Component Libraries", "level": "Expert"},
        {"name": "Accessibility (a11y)", "category": "UI/UX & Component Libraries", "level": "Advanced"},
        {"name": "NodeJS", "category": "Backend & Cloud", "level": "Advanced"},
        {"name": "Golang", "category": "Backend & Cloud", "level": "Intermediate"},
        {"name": "MongoDB", "category": "Backend & Cloud", "level": "Advanced"},
        {"name": "S3", "category": "Backend & Cloud", "level": "Advanced"},
        {"name": "REST APIs", "category": "Backend & Cloud", "level": "Expert"},
        {"name": "WebSocket", "category": "Backend & Cloud", "level": "Advanced"},
        {"name": "Socket.IO", "category": "Backend & Cloud", "level": "Advanced"},
        {"name": "Jest", "category": "Testing & Quality", "level": "Expert"},
        {"name": "Playwright", "category": "Testing & Quality", "level": "Advanced"},
        {"name": "Unit Testing", "category": "Testing & Quality", "level": "Expert"},
        {"name": "End-to-End Testing", "category": "Testing & Quality", "level": "Advanced"},
        {"name": "Performance Monitoring", "category": "Testing & Quality", "level": "Advanced"},
        {"name": "Git", "category": "Development Tools", "level": "Expert"},
        {"name": "GitHub Actions", "category": "Development Tools", "level": "Advanced"},
        {"name": "LaunchDarkly", "category": "Development Tools", "level": "Advanced"},
        {"name": "Grafana", "category": "Development Tools", "level": "Advanced"},
        {"name": "Kibana", "category": "Development Tools", "level": "Advanced"}
    ],
    "experience": [
        {
            "company": "Rooster Park",
            "position": "Software Engineer & Consultant",
            "duration": "October 2015 - August 2022",
            "location": "Seattle, WA",
            "description": [
                "Led development of patient-facing telemedicine dashboards at 98point6, resulting in 40% increase in patient engagement",
                "Architected and implemented real-time doctor-patient chat system using WebSocket, handling 10,000+ daily conversations",
                "Developed and integrated HIPAA-compliant patient survey system with 98% completion rate",
                "Rebuilt the Redfin career site and improved performance of Redfin.com",
                "Created reusable React components based on Airbnb's style guide",
                "Implemented performance monitoring with Grafana and Kibana",
                "Built new games at Double Down Interactive and improved software production efficiency",
                "Created clear documentation and demonstrated best practices to in-house teams",
                "Worked with special projects team to move game development to React architecture"
            ],
            "technologies": ["React", "TypeScript", "Redux", "WebSocket", "Performance Optimization", "Documentation"],
            "consultant_role": "Senior Consultant"
        },
        {
            "company": "iStreamPlanet",
            "position": "Senior Software Engineer",
            "duration": "June 2018 - February 2022",
            "location": "Seattle, WA",
            "description": [
                "Led development of customer-facing event management dashboard handling 1000+ live streaming events annually",
                "Created and open-sourced Pebble design system, reducing component development time by 60%",
                "Architected real-time data visualization system using Node.js and Socket.IO, processing 100K+ concurrent viewer metrics",
                "Implemented CI/CD pipeline with GitHub Actions, reducing deployment time by 75%",
                "Developed and integrated Auth0 authentication system supporting SSO for enterprise clients",
                "Mentored junior engineers through structured 1:1s and code reviews, leading to 2 promotions"
            ],
            "technologies": ["React", "Redux", "Node.js", "MongoDB", "Auth0", "GitHub Actions", "Socket.IO"]
        },
        {
            "company": "LogicDesigns",
            "position": "Owner/Founder",
            "duration": "July 1998 - December 2008",
            "location": "Seattle, WA",
            "description": [
                "Built and scaled network of websites generating $240K revenue in 2 years",
                "Managed team of freelance designers and backend programmers",
                "Implemented comprehensive SEO, SEM, and affiliate marketing strategies",
                "Developed custom analytics platform for performance tracking",
                "Created and maintained multiple e-commerce platforms"
            ],
            "technologies": ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "SEO", "Analytics"]
        }
    ],
    "projects": [
        {
            "title": "Gerrymender",
            "description": "Interactive web application visualizing US congressional district gerrymandering with comprehensive demographic analysis using Census data. Features responsive React component architecture and interactive choropleth maps for data visualization.",
            "technologies": ["React", "D3.js", "TopoJSON", "Census API", "Jest", "React Testing Library"],
            "github": "github.com/eriksjaastad/gerrymander"
        },
        {
            "title": "Indulge - Real-time Seattle Events",
            "description": "Real-time social media visualization platform for Seattle events, featuring interactive map visualization using Google Maps API with custom overlay system. Processes 1000+ tweets per minute with scalable backend architecture.",
            "technologies": ["Node.js", "Express", "MongoDB", "Socket.IO", "Angular", "Google Maps API"],
            "github": "github.com/eriksjaastad/indulge"
        },
        {
            "title": "Pebble Design System",
            "description": "Open-source design system with styled React components, reducing development time by 60% and standardizing UI across products. Includes comprehensive documentation, accessibility features, and integration with popular frontend frameworks.",
            "technologies": ["React", "TypeScript", "Styled Components", "Storybook", "Jest", "Accessibility"],
            "github": "github.com/iStreamPlanet/pebble"
        },
        {
            "title": "Streaming Event Management Platform",
            "description": "Enterprise-grade dashboard for managing live streaming events like the Olympics and World Cup. Features real-time analytics, automated scheduling, and comprehensive monitoring tools. Handles 1000+ events annually with 100K+ concurrent viewers.",
            "technologies": ["React", "Redux", "Node.js", "MongoDB", "Auth0", "WebSocket", "AWS"]
        }
    ]
}

async def get_data_section(section: str) -> Dict[str, Any]:
    """Helper function to safely get data sections with error handling and timeout."""
    try:
        if section not in PORTFOLIO_DATA:
            raise HTTPException(status_code=404, detail=f"Section {section} not found")
        logger.info(f"Fetching {section} data")
        # Simulate quick response time
        return PORTFOLIO_DATA[section]
    except Exception as e:
        logger.error(f"Error fetching {section} data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching {section} data")
    finally:
        # Log response time
        logger.debug(f"Completed {section} request")

@app.get("/api/profile")
async def get_profile():
    return await get_data_section("profile")

@app.get("/api/skills")
async def get_skills():
    return await get_data_section("skills")

@app.get("/api/experience")
async def get_experience():
    return await get_data_section("experience")

@app.get("/api/projects")
async def get_projects():
    return await get_data_section("projects")

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

@app.on_event("startup")
async def startup_event():
    logger.info("Portfolio API starting up")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Portfolio API shutting down")