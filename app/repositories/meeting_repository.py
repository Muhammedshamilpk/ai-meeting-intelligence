from sqlalchemy.orm import Session

from app.database.models import Meeting


class MeetingRepository:
    
    def __init__(self,db:Session):
        self.db=db
        
    def create_meeting(
        self,
        original_filename,
        stored_filename,
        transcript,
        summary,
        action_items
    ):
        meeting = Meeting(
        original_filename=original_filename,
        stored_filename=stored_filename,
        transcript=transcript,
        summary=summary,
        action_items=action_items
        )
        
        self.db.add(meeting)
        self.db.commit()
        self.db.refresh(meeting)
        
        
        return meeting