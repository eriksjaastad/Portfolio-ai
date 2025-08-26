from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Portfolio Data Models
class ContactInfo(BaseModel):
    email: str
    linkedin: str
    portfolio: str
    phone: Optional[str] = None
    location: str

class Skill(BaseModel):
    name: str
    category: str
    level: str  # "Expert", "Advanced", "Intermediate"

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company: str
    position: str
    duration: str
    location: str
    description: List[str]
    technologies: List[str]
    consultant_role: Optional[str] = None

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    technologies: List[str]
    link: Optional[str] = None
    github: Optional[str] = None
    image: Optional[str] = None

class Profile(BaseModel):
    name: str
    title: str
    tagline: str
    summary: str
    contact: ContactInfo
    location: str

# Portfolio Data
ERIK_PORTFOLIO_DATA = {
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

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Erik Sjaastad Portfolio API"}

@api_router.get("/profile")
async def get_profile():
    return ERIK_PORTFOLIO_DATA["profile"]

@api_router.get("/skills")
async def get_skills():
    return ERIK_PORTFOLIO_DATA["skills"]

@api_router.get("/experience") 
async def get_experience():
    return ERIK_PORTFOLIO_DATA["experience"]

@api_router.get("/projects")
async def get_projects():
    return ERIK_PORTFOLIO_DATA["projects"]

# Legacy status endpoints (keeping for compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()