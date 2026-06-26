from sqlalchemy.orm import Session
from app.agents.coordinator_agent import CoordinatorAgent


def process_meeting(audio_path:str, original_filename:str, stored_filename:str, db:Session):
    
    try:    
        coordinator = CoordinatorAgent(db)
       
        
        result  =coordinator.run(
            audio_path=audio_path,
            original_filename=original_filename,
            stored_filename=stored_filename
            
        )
        
        return {"success":True,
                **result
                }
        
        
    except Exception as e:
        return {
            "success":False,
            "error":str(e)
        }
    
    