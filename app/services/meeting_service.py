from app.services.transcription import transcribe_audio
from app.services.summarizer import generate_summary
from app.services.action_extractor import extract_action_items

def process_meeting(audio_path:str):
    try:    
        transcript = transcribe_audio(audio_path)
        summary = generate_summary(transcript)
        action_items = extract_action_items(transcript)
        
        return {"success":True,
                "transcript":transcript,
                "summary":summary,
                "action_items":action_items
                }
        
    except Exception as e:
        return {
            "success":False,
            "error":str(e)
        }
    
    