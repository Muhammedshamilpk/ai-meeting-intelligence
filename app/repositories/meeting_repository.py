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
        action_items,
        email
    ):
        meeting = Meeting(
        original_filename=original_filename,
        stored_filename=stored_filename,
        transcript=transcript,
        summary=summary,
        action_items=action_items,
        email=email
        )
        
        self.db.add(meeting)
        self.db.commit()
        self.db.refresh(meeting)
        
        
        return meeting
    
    def get_all_meetings(self):
        return self.db.query(Meeting).all()

    def get_meeting_by_id(self,meeting_id:int):
        return (
            self.db.query(Meeting)
            .filter(Meeting.id==meeting_id)
            .first()
        )