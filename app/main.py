from fastapi import FastAPI
from app.api.upload import router as upload_router
from app.database.database import engine
from app.database.models import Base 
from app.api.meeting import router as meeting_router
from fastapi.middleware.cors import CORSMiddleware



app=FastAPI(
    title = "Enterprise AI Meeting Intelligence",
    description = "AI-powered meeting transcription, summarization, action item extraction, and email generation.",
    version= "1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    upload_router,
    prefix="/api",
    tags = ["Upload"]
)


app.include_router(
    meeting_router,
    prefix ="/api",
    tags=["Meetings"]
)
@app.get("/")
async def root():
    return { 
            "message":"Welcome to Enterprise AI Meeting Intelligence API"}


Base.metadata.create_all(bind=engine)