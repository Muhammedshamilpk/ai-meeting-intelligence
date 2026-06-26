from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ActionItemSchema(BaseModel):
    task:str
    owner:str
    deadline:Optional[str] = None
    
class UploadResponseSchema(BaseModel):
    status:str
    meeting_id:int
    original_filename:str
    stored_filename :str
    transcript : str
    summary :str
    action_items :list[ActionItemSchema]
    email:str
    
class MeetingResponseSchema(BaseModel):
    id:int
    original_filename:str
    stored_filename :str
    uploaded_at:datetime
    transcript : str
    summary :str
    action_items :list[ActionItemSchema]
    email:str
    
    class Config:
        from_attributes = True
    
    