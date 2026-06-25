from fastapi import APIRouter,UploadFile,File
import shutil
from pathlib import Path
from app.services.meeting_service import process_meeting
from app.utils.file_utils import generate_filename


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
    
    unique_filename = generate_filename(file.filename)    
    file_path = UPLOAD_DIR / unique_filename
    
    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(file.file,buffer)
        
    meeting = process_meeting((str(file_path)))
    
    if not meeting["success"]:
        return {
            "status":"error",
            "message": meeting["error"]
        }
    
    return {
        "status":"success",
        "origial_filename":file.filename,
        "stored_filename":unique_filename,
        "transcript":meeting["transcript"],
        "summary":meeting["summary"],
        "action_items":meeting["action_items"],
        
    }