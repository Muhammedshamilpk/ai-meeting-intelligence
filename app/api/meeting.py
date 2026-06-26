from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.repositories.meeting_repository import MeetingRepository
from app.schemas.meeting import MeetingResponseSchema

router = APIRouter()

@router.get("/meetings/{meeting_id}",response_model=MeetingResponseSchema)
def get_all_meetings(meeting_id:int,
    db:Session = Depends(get_db)
):
    repository = MeetingRepository(db)
    meeting = repository.get_meeting_by_id(meeting_id)
    
    if meeting is None:
        return {
            "status":"error",
            "message":"Meeting not found"
        }
    return {
    "id": meeting.id,
    "original_filename": meeting.original_filename,
    "stored_filename": meeting.stored_filename,
    "uploaded_at": meeting.uploaded_at,
    "transcript": meeting.transcript,
    "summary": meeting.summary,
    "action_items": meeting.action_items,
    "email":meeting.email
}