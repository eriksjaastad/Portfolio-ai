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
        "tagline": "React | Professional Traveler | Innovation Focused",
        "summary": "Dynamic Senior Software Engineer with 10+ years of experience, a positive and collaborative attitude, and an eye towards continual improvement and innovation. Dedicated to creating and implementing standards that maximize productivity and minimize churn. Proven ability to ramp up quickly and perform above expectations.",
        "contact": {
            "email": "erik@logicdesigns.com",
            "linkedin": "www.linkedin.com/in/erikodin",
            "portfolio": "eriksjaastad.com",
            "location": "United States"
        },
        "location": "United States"
    },
    "skills": [
        {"name": "React", "category": "Frontend", "level": "Expert"},
        {"name": "Redux", "category": "Frontend", "level": "Expert"},
        {"name": "TypeScript", "category": "Frontend", "level": "Advanced"},
        {"name": "JavaScript", "category": "Frontend", "level": "Expert"},
        {"name": "HTML5", "category": "Frontend", "level": "Expert"},
        {"name": "CSS3", "category": "Frontend", "level": "Expert"},
        {"name": "Node.js", "category": "Backend", "level": "Advanced"},
        {"name": "API Development", "category": "Backend", "level": "Advanced"},
        {"name": "Python", "category": "Backend", "level": "Intermediate"},
        {"name": "WordPress", "category": "CMS", "level": "Advanced"},
        {"name": "PHP", "category": "Backend", "level": "Intermediate"},
        {"name": "MySQL", "category": "Database", "level": "Intermediate"},
        {"name": "Git", "category": "Tools", "level": "Advanced"},
        {"name": "Webpack", "category": "Tools", "level": "Advanced"},
        {"name": "Responsive Design", "category": "Design", "level": "Expert"},
        {"name": "Performance Optimization", "category": "Optimization", "level": "Advanced"},
        {"name": "SEO", "category": "Optimization", "level": "Advanced"}
    ],
    "experience": [
        {
            "company": "98point6 Inc.",
            "position": "Software Engineer",
            "duration": "April 2022 - August 2022",
            "location": "Seattle, Washington",
            "description": [
                "Key member of a small engineering team building self-service dashboards",
                "Developed doctor-patient communication portal",
                "Worked on patient surveys and chat client functionality"
            ],
            "technologies": ["React", "TypeScript", "Redux"],
            "consultant_role": "Rooster Park Consultant"
        },
        {
            "company": "iStreamPlanet",
            "position": "Software Engineer",
            "duration": "September 2018 - January 2022",
            "location": "Greater Seattle Area",
            "description": [
                "Built customer-facing self-service dashboards for live streaming platform",
                "Developed React components for scheduling content and managing live events",
                "Created Pebble, an open-source design system with styled React components",
                "Built APIs with Golang and Node.js, integrated with Auth0 and MongoDB",
                "Mentored junior engineers and implemented feature flags with LaunchDarkly"
            ],
            "technologies": ["React", "Redux", "Golang", "Node.js", "MongoDB", "Auth0"]
        },
        {
            "company": "Redfin",
            "position": "Software Engineer",
            "duration": "November 2017 - June 2018",
            "location": "Greater Seattle Area",
            "description": [
                "Worked on Brand Awareness team focusing on performance and accessibility",
                "Developed reusable React components implemented site-wide",
                "Improved homepage performance, SEO, and test coverage"
            ],
            "technologies": ["React", "JavaScript", "HTML", "Less"],
            "consultant_role": "Rooster Park Consultant"
        },
        {
            "company": "DoubleDown Interactive",
            "position": "Software Engineer", 
            "duration": "April 2017 - October 2017",
            "location": "Greater Seattle Area",
            "description": [
                "Developed slot games using custom library built on Google Closure",
                "Collaborated with Unity artists to refine export processes",
                "Consulted with IGT to modernize workflow processes"
            ],
            "technologies": ["JavaScript", "Google Closure", "Soy Templates"],
            "consultant_role": "Rooster Park Consultant"
        },
        {
            "company": "LogicDesigns",
            "position": "Owner/Founder",
            "duration": "July 1998 - December 2008",
            "location": "Greater Seattle Area", 
            "description": [
                "Built and scaled network of websites generating $240K revenue in 2 years",
                "Managed team of freelance designers and backend programmers",
                "Implemented SEO, SEM, and affiliate marketing strategies",
                "Created custom analytics and split-tested designs"
            ],
            "technologies": ["PHP", "MySQL", "HTML", "CSS", "JavaScript"]
        }
    ],
    "projects": [
        {
            "title": "Gerrymander Explorer",
            "description": "Interactive web application exploring gerrymandering via US congressional districts map with real census data",
            "technologies": ["React", "Census API", "Data Visualization"],
            "github": "github.com/eriksjaastad/gerrymander"
        },
        {
            "title": "Indulge - Seattle Tweet Map",
            "description": "Real-time map visualization of Seattle tweets to discover local events and trends",
            "technologies": ["Node.js", "Express", "MongoDB", "Twitter API", "Socket.IO", "Angular"],
            "github": "github.com/eriksjaastad/indulge"
        },
        {
            "title": "Pebble Design System",
            "description": "Open-source design system with styled React components, reducing development time and increasing reliability",
            "technologies": ["React", "Styled Components", "Storybook", "Design Systems"]
        },
        {
            "title": "iStreamPlanet Dashboard",
            "description": "Customer-facing self-service platform for managing live streaming events, used for major events like Olympics and World Cup",
            "technologies": ["React", "Redux", "Node.js", "MongoDB", "Auth0"]
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