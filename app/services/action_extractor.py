from groq import Groq
from app.config import GROQ_API_KEY
import json

client = Groq(api_key=GROQ_API_KEY)

def extract_action_items(transcript:str):
    
    
    prompt = f"""
Extract all action items explicitly mentioned in the meeting transcript.

For each action item identify:
- task
- owner
- deadline

Return ONLY valid JSON.

If a deadline is not mentioned, return null.
If an owner is not mentioned, return null.

Transcript:
{transcript}

Return format:

[
    {{
        "task": "...",
        "owner": "...",
        "deadline": "..."
    }}
]
"""
  
    
    response = client.chat.completions.create(
        model = "llama-3.3-70b-versatile",
        messages=[
            {
                "role":"system",
                "content":"You are an enterprise meeting assistant that extracts structured action items without hallucinating."
            },
            {
                "role":"user",
                "content":prompt
            }
        ],
        
        temperature=0
    )
    
    content = response.choices[0].message.content

    try:
        return json.loads(content)
    except json.JSONDecodeError as e:
        return []