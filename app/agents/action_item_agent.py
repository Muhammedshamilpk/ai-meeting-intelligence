from app.services.action_extractor import extract_action_items

class ActionItemAgent:
    
    def run(self,transcript:str):
        
        print("[Action Item Agnet] Started")
        
        action_items = extract_action_items(transcript)
        
        print("[Action Item Agent] Completed")
        
        return {
            "action_items":action_items
        }