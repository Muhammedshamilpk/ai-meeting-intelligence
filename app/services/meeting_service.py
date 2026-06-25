from app.services.transcription import transcribe_audio
from app.services.summarizer import generate_summary
from app.services.action_extractor import extract_action_items
from app.repositories.meeting_repository import MeetingRepository
from sqlalchemy.orm import Session



def process_meeting(audio_path:str, original_filename:str, stored_filename:str, db:Session):
    
    try:    
        transcript = transcribe_audio(audio_path)
        
        summary = generate_summary(transcript)
        
        action_items = extract_action_items(transcript)
        
        repository = MeetingRepository(db)
        
        meeting = repository.create_meeting(
            
            original_filename=original_filename,
            stored_filename=stored_filename,
            transcript=transcript,
            summary=summary,
            action_items=action_items
            
        )
        
        return {"success":True,
                "meeting_id":meeting.id,
                "transcript":transcript,
                "summary":summary,
                "action_items":action_items
                }
        
        
    except Exception as e:
        return {
            "success":False,
            "error":str(e)
        }
    
    