from sqlalchemy import Column,Integer,String,Text,DateTime,JSON
from datetime import datetime,timezone
from app.database.database import Base

class Meeting(Base):
    
    __tablename__ = "meetings"
    
    id = Column(Integer,primary_key=True,index=True)
    original_filename = Column(String,nullable=False)
    stored_filename = Column(String,nullable=False)
    transcript = Column(Text,nullable=False)
    summary = Column(Text,nullable = False)
    action_items = Column(JSON, nullable=False)
    uploaded_at = Column(DateTime(timezone=True),default=lambda: datetime.now(timezone.utc))