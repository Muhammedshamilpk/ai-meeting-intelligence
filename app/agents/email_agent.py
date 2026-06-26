from app.services.email_generator import generate_followup_email

class EmailAgent:
    
    def run(self,summary,action_items):
        
        print("[Email Agent] Started")
        
        email = generate_followup_email(summary,action_items)
        
        print("[Email Agent] Completed")
        
        return {
            "email":email
        }
    
