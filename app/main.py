from fastapi import FastAPI
from app.api.upload import router as upload_router

app=FastAPI(
    title = "Enterprise AI Meeting Intelligence",
    Description = "AI-powered meeting transcription, summarization, action item extraction, and email generation.",
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