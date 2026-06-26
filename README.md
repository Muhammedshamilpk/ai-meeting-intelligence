# Enterprise AI Meeting Intelligence

An AI-powered meeting intelligence platform that automatically transcribes meeting recordings, generates concise summaries, extracts action items, and creates professional follow-up emails. The application is built using **FastAPI**, **React**, **TypeScript**, **PostgreSQL**, **OpenAI Whisper**, and **Groq Llama 3.3**.

---

## 🚀 Features

- 🎤 Upload meeting audio recordings
- 📝 AI-powered speech-to-text transcription
- 📄 Automatic meeting summarization
- ✅ Action item extraction with owners and deadlines
- 📧 AI-generated follow-up email drafts
- 📚 Meeting history management
- 🔍 Search previous meetings
- 📊 Interactive dashboard with meeting statistics
- 🗑️ Delete meeting records
- ⚙️ Modern enterprise-style user interface

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios


### Backend

- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- Uvicorn

### AI Services

- OpenAI Whisper (Speech-to-Text)
- Groq Llama 3.3 70B (Summarization, Action Items & Email Generation)

---

## 📁 Project Structure

```text
Enterprise-AI-Meeting-Intelligence
│
├── app
│   ├── api
│   ├── database
│   ├── repositories
│   ├── schemas
│   ├── services
│   ├── utils
│   └── main.py
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── types
│   │   ├── utils
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── uploads
├── requirements.txt
├── .env
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/enterprise-ai-meeting-intelligence.git

cd enterprise-ai-meeting-intelligence
```

---

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

---

### 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Configure Environment Variables

Create a `.env` file in the project root.

```env
GROQ_API_KEY=your_groq_api_key

DATABASE_URL=postgresql://username:password@localhost/database_name
```

---

### 5. Start the FastAPI Server

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

### 6. Frontend Setup

Navigate to the frontend folder

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Frontend URL

```
http://localhost:3000
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/upload` | Upload and process meeting audio |
| GET | `/api/meetings` | Get all meetings |
| GET | `/api/meetings/{id}` | Get meeting details |
| DELETE | `/api/meetings/{id}` | Delete a meeting |

---

# 🤖 AI Workflow

```text
Audio Upload
      │
      ▼
OpenAI Whisper
(Speech-to-Text)
      │
      ▼
Groq Llama 3.3
      │
      ├── Summary
      ├── Action Items
      └── Follow-up Email
      │
      ▼
PostgreSQL Database
      │
      ▼
React Dashboard
```

---

# 📊 Dashboard

The dashboard displays:

- Total Meetings
- Total Action Items
- Emails Generated
- Pending Tasks
- Recent Meetings

---

# 📄 Meeting Details

Each processed meeting includes:

- Meeting Transcript
- AI Summary
- Action Items
- Follow-up Email
- Upload Date
- Meeting ID

---

# 🗄️ Database Schema

| Field | Type |
|--------|------|
| id | Integer |
| original_filename | String |
| stored_filename | String |
| uploaded_at | Timestamp |
| transcript | Text |
| summary | Text |
| action_items | JSON |
| email | Text |

---

# 📷 Application Screens

- Dashboard
- Upload Meeting
- Meeting History
- Meeting Details
- Settings

---

# 🚀 Future Enhancements

- User Authentication
- Team Workspace Support
- Calendar Integration
- Email Sending via SMTP
- Export to PDF/DOCX
- Meeting Analytics
- Keyword Search
- Docker Deployment
- Cloud Storage Integration
- Role-Based Access Control

---

# 👨‍💻 Author

**Muhammed Shamil P K**

AI & Machine Learning Engineer

- GitHub: https://github.com/Muhammedshamilpk
- LinkedIn: https://linkedin.com/in/muhammedshamilpk

---

