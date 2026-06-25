from fastapi import FastAPI
from app.api.upload import router as upload_router
from app.database.database import engine
from app.database.models import Base 

app=FastAPI(
    title = "Enterprise AI Meeting Intelligence",
    description = "AI-powered meeting transcription, summarization, action item extraction, and email generation.",
    version= "1.0.0"
)

app.include_router(
    upload_router,
    prefix="/api",
    tags = ["Upload"]
)
@app.get("/")
async def root():
    return { 
            "message":"Welcome to Enterprise AI Meeting Intelligence API"}
    
Base.metadata.create_all(bind=engine)