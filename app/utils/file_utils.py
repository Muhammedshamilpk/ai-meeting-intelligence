from uuid import uuid4
from pathlib import Path


def generate_filename(filename:str):
    
    extension = Path(filename).suffix
    
    return f"{uuid4()}{extension}"