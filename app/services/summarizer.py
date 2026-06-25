from groq import Groq
from app.config import GROQ_API_KEY

client = Groq(api_key = GROQ_API_KEY)

def generate_summary(transcript:str):
    
    prompt = f"""
    You are an AI meeting assistant.

Summarize the following meeting in 4-6 bullet points.
    
Transcript:
{transcript}
    
"""
    response = client.chat.completions.create(
       model="llama-3.3-70b-versatile",
       messages=[
           {
               "role":"user",
               "content": prompt
           }
       ] ,
       
       temperature = 0.3
    )
    
    return response.choices[0].message.content