from groq import Groq
from app.config import GROQ_API_KEY

client = Groq(api_key = GROQ_API_KEY)

def transcribe_audio(audio_path:str):
    
    with open (audio_path,"rb") as audio:
        response = client.audio.transcriptions.create(
            file=audio,
            model = "whisper-large-v3"
        )
    return response.text