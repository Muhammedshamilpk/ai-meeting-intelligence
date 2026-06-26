from app.services.transcription import transcribe_audio

class TranscriptionAgent:
    
    def run(self,audio_path:str):
        print(("[Transcription Agent] Started"))
        
        transcript = transcribe_audio(audio_path)
        
        print(("[Transcription Agent] Completed"))
        
        return {
            "transcript":transcript
        }
        
        
   