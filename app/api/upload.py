from fastapi import APIRouter,UploadFile,File
import shutil
from pathlib import Path
from app.services.transcription import transcribe_audio

router = APIRouter()

UPLOAD_DIR =Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/upload")
async def upload_audio(file:UploadFile = File(...)):
    
    #validate audio
    allowed_extensions = {".mp3",".wav",".m4a"}
    
    extension = Path(file.filename).suffix.lower()
    
    if extension not in allowed_extensions:
        return {
            "status":"error",
            "message":"Only MP3, WAV and M4A file are allowed."
        }
        
    file_path = UPLOAD_DIR / file.filename
    
    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(file.file,buffer)
        
    transcript = transcribe_audio(str(file_path))
        
    return {
        "status":"success",
        "filename":file.filename,
        "transcript":transcript
    }