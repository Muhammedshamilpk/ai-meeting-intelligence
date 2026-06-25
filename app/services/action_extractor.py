from groq import Groq
from app.config import GROQ_API_KEY
import json

client = Groq(api_key=GROQ_API_KEY)

def extract_action_items(transcript:str):
    
    prompt = f"""
    You are an AI meeting assistant.

Extract all action items from the meeting.

Return ONLY valid JSON.
Format:
[
    {{
        "task":"...",
        "owner":"...",
        "deadline":"..."
    }}
]

if no deadline exists , return null

Transcript:
{transcript}
    """
    
    response = client.chat.completions.create(
        model = "llama-3.3-70b-versatile",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ],
        
        temperature=0
    )
    
    return json.loads(response.choices[0].message.content)