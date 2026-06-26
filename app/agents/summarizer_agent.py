from app.services.summarizer import generate_summary

class SummaryAgent:
    
    def run(self,transcript:str):
        
        print("[Summary Agnet] Started")
        
        summary = generate_summary(transcript)
        
        print("[Summary Agnet] Completed")
        
        return {
            "summary":summary
            }