from sqlalchemy.orm import Session

from app.agents.transcription_agent import TranscriptionAgent
from app.agents.summarizer_agent import SummaryAgent
from app.agents.action_item_agent import ActionItemAgent
from app.agents.email_agent import EmailAgent

from app.repositories.meeting_repository import MeetingRepository

class CoordinatorAgent:
    
    def __init__(self, db:Session):
        
        self.db = db
        
        self.transcription_agent = TranscriptionAgent()
        self.summary_agent = SummaryAgent()
        self.action_agnet = ActionItemAgent()
        self.email_agent = EmailAgent()
        
    def run(
        self,
        audio_path:str,
        original_filename:str,
        stored_filename:str
    ):
        state={}
        
        state.update(
            self.transcription_agent.run(audio_path)
        )
        state.update( 
                     self.summary_agent.run(state["transcript"])
                     )
        state.update( 
                     self.action_agnet.run(state["transcript"])
                    )
        state.update(
            self.email_agent.run(state["summary"],state["action_items"])
            )
        
        repository = MeetingRepository(self.db)
        
        meeting = repository.create_meeting(
            original_filename=original_filename,
            stored_filename=stored_filename,
            transcript=state["transcript"],
            summary=state["summary"],
            action_items=state["action_items"],
            email=state["email"]
        )
        
        return {
            "meeting_id": meeting.id,
            **state
        }