from groq import Groq
from app.config import GROQ_API_KEY

client = Groq(api_key = GROQ_API_KEY)

def generate_followup_email(summary:str, action_items:list):
    prompt = f"""
    You are an Enterprise AI Meeting Assistant.

Generate a professional follow-up email based ONLY on the information provided.

Meeting Summary:
{summary}

Action Items:
{action_items}

Instructions:

- Use a professional business tone.
- Do not invent information.
- Do not add assumptions.
- Keep the email concise (under 250 words).
- Do not repeat the same information.
- Include a clear subject line.
- Thank the attendees.
- Include a short meeting summary.
- List all action items as bullet points.
- Mention the owner and deadline for each task.
- End with a professional closing.

Output format:

Subject: ...

Hi Team,

Thank attendees.

Meeting Summary:
...

Action Items:
• Owner - Task (Deadline)

Best Regards,
AI Meeting Assistant
    """
    response = client.chat.completions.create(
        model= "llama-3.3-70b-versatile",
        messages=[{
            "role":"user",
            "content":prompt
        }
    ],
        temperature=0.2
    )
    
    return response.choices[0].message.content