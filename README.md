# 🎯 JobSkill Gap – Job Description Skill Mapper

A modern, full-stack SaaS web application designed to bridge the gap between job market requirements and student skill sets. It analyzes real job descriptions, extracts required technical and soft skills, compares them with student proficiencies, generates a priority matrix, and produces an interactive, tracked learning checklist.

---

## 🎨 Visual Design & Theme
- **Theme**: Clean modern SaaS aesthetic with a **white and purple** palette (`brand-50` to `brand-950`, indigo/violet gradients, emerald and amber accents).
- **Typography**: Inter with tabular figures, crisp badge indicators, and high contrast.
- **Components**: Metric cards, circular match score gauge, animated progress bars, multi-column matrix, interactive checklist with real-time status persistence.

---

## 🚀 Core Features

### 1. Job Description Analyzer
- Paste any raw job description or job posting.
- **Smart Taxonomy Engine**: Detects over 250+ technical and soft skills across 10 categories (Frontend, Backend, Programming Languages, Databases, DevOps & Cloud, Data & AI, Testing, Architecture, Security, Soft Skills).
- **Context-Aware Heuristics**: Analyzes frequency of mention and extracts required proficiency (`Beginner`, `Intermediate`, `Advanced`) and importance (`Critical`, `High`, `Medium`, `Low`).
- **One-Click Sample Presets**: Includes 4 pre-loaded realistic job postings (Senior Full Stack Engineer, Cloud DevOps & SRE, AI & Data Platform Engineer, Frontend React Specialist).

### 2. Student Skill Assessment
- Enter existing skills and rate individual proficiency: **Beginner**, **Intermediate**, or **Advanced**.
- Dynamic search and filter across all skill categories.
- 1-click quick-add pills for common skills.
- Pre-loaded student personas (e.g. *Frontend Developer transitioning to Full Stack*, *Recent CS Graduate*, *Full Stack Engineer upskilling for Cloud*).
- Persistent student profile storage in the database.

### 3. Skill Gap Analysis
- Automatic canonical normalization and alias matching (e.g. `k8s` → `Kubernetes`, `postgres` → `PostgreSQL`, `react.js` → `React`).
- Clear classification into 3 distinct buckets:
  - **Matching Skills**: Student meets or exceeds required proficiency level.
  - **Weak Skills**: Student possesses beginner/intermediate knowledge, but the job asks for advanced competency (quick upskilling wins).
  - **Missing Skills**: Requirements not found in the student profile (high-priority learning targets).
- **Weighted Match Score %**: Calculated based on requirement importance and proficiency depth.
- **Readiness Tiers**: *Exceptional Match (Ready to Apply)*, *Strong Candidate*, *Moderate Match*, or *Significant Skill Gap*.
- **Categorized Breakdown**: Visual progress bars showing domain competencies.

### 4. Priority Engine
- Automatically prioritizes gaps based on job mention frequency, required level, and industry importance.
- Interactive priority selector: adjust any skill between **Critical**, **High**, **Medium**, and **Low**.
- Generates realistic study time estimations (e.g. 8 to 40 hours per skill) and difficulty levels.
- Provides actionable steps and curated documentation/tutorial links for every missing skill.

### 5. Learning Checklist
- Kanban-style and list-style interactive progress checklist.
- One-click status cycling: `To Learn` → `In Progress` → `Completed`.
- Real-time overall progress percentage and remaining study hours calculator.
- Notes and project link editor per skill item.
- Automatic live persistence to MongoDB / database.

### 6. Database & Persistence
- **Primary Database**: MongoDB with Mongoose ODM.
- **Resilient Fallback Mode**: If MongoDB is not running locally, the backend automatically and seamlessly activates an embedded local persistent JSON store (`backend/data/local-database.json`) so the app is always fully functional out of the box with zero setup hurdles.
- Automatic status indicator pill in the UI showing `MongoDB Active` vs `Local DB Store`.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons.
- **Backend**: Node.js, Express REST API, Mongoose, CORS, Dotenv.
- **Database**: MongoDB (with Mongoose schemas, timestamps, and automatic local persistent fallback).

---

## 📁 Project Structure

```text
JobSkill-Gap/
├── backend/
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   ├── data/
│   │   └── local-database.json   (auto-generated local fallback store)
│   └── src/
│       ├── config/
│       │   └── db.js              (Mongoose connection + fallback store)
│       ├── controllers/
│       │   ├── analysisController.js
│       │   ├── planController.js
│       │   ├── profileController.js
│       │   └── sampleController.js
│       ├── models/
│       │   ├── Analysis.js
│       │   ├── LearningPlan.js
│       │   └── StudentProfile.js
│       ├── routes/
│       │   ├── analysisRoutes.js
│       │   ├── planRoutes.js
│       │   ├── profileRoutes.js
│       │   └── sampleRoutes.js
│       ├── services/
│       │   ├── gapAnalyzer.js
│       │   ├── priorityEngine.js
│       │   ├── sampleData.js
│       │   └── skillExtractor.js
│       └── index.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       │   └── client.js
│       ├── components/
│       │   ├── ExportModal.jsx
│       │   ├── HistoryView.jsx
│       │   ├── JobDescriptionInput.jsx
│       │   ├── LearningChecklist.jsx
│       │   ├── Navbar.jsx
│       │   ├── PriorityMatrix.jsx
│       │   ├── SkillGapResults.jsx
│       │   ├── StatsOverview.jsx
│       │   └── StudentSkillAssessment.jsx
│       ├── context/
│       │   └── AppContext.jsx
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── test-e2e.js                     (Full integration test suite)
├── package.json                    (Root convenience scripts)
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or newer recommended, tested on v24)
- npm (v9 or newer)
- MongoDB (Optional: app automatically operates in local persistent mode if MongoDB is not running)

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Configure Backend Environment
A default `.env` file is already created:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/jobskill_gap
NODE_ENV=development
```
*(If you have a MongoDB Atlas connection string, you can set it as `MONGODB_URI` in `backend/.env`)*

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install --legacy-peer-deps
```

### 4. Build Frontend Bundle
```bash
cd frontend
npm run build
```

---

## 🏃 Execution Commands

### Primary Startup Command (Starts Both Frontend & Backend Simultaneously)
```bash
# From project root:
npm run dev
```
- **Frontend** runs on: **`http://localhost:5173`** (Vite Dev Server with HMR)
- **Backend API** runs on: **`http://localhost:5000`** (Express Server with live watch)
- Requests from the frontend to `/api/*` are automatically proxied to the backend on port 5000.

---

### Alternative: Single Unified Production Server
```bash
# From project root:
npm start
```
*Serves the compiled React frontend and the backend API together on **`http://localhost:5000`**.*

---

## 🧪 Automated Testing

Run the full end-to-end integration test suite:
```bash
# From project root:
node test-e2e.js
```
This tests:
1. `GET /api/health`
2. `GET /api/samples/jobs`
3. `POST /api/analysis/extract` (taxonomy & frequency analysis)
4. `POST /api/analysis/gap` (gap calculation & plan generation)
5. `PATCH /api/plans/:id/skills/:skillName/status` (status updates & progress recalculation)
6. `GET /` (static frontend SPA delivery)

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `POST` | `/api/analysis/extract` | Extract skills from job description text |
| `POST` | `/api/analysis/gap` | Run full gap analysis, calculate score, & create plan |
| `GET` | `/api/analysis` | Retrieve all past analyses |
| `GET` | `/api/analysis/:id` | Retrieve single analysis by ID |
| `DELETE`| `/api/analysis/:id` | Delete an analysis record |
| `GET` | `/api/profile` | Get current student profile |
| `PUT` | `/api/profile` | Update profile information and skills |
| `POST` | `/api/profile/skills` | Add or update a student skill |
| `DELETE`| `/api/profile/skills/:name` | Remove a skill from student profile |
| `GET` | `/api/plans` | List all learning plans |
| `GET` | `/api/plans/:id` | Get learning plan by ID |
| `GET` | `/api/plans/analysis/:id` | Get learning plan for an analysis |
| `PATCH` | `/api/plans/:id/skills/:name/status` | Update skill status (`to_learn`, `learning`, `completed`) |
| `PATCH` | `/api/plans/:id/skills/:name/priority` | Update skill priority (`Critical`, `High`, `Medium`, `Low`) |
| `GET` | `/api/samples/jobs` | Get sample job descriptions |
| `GET` | `/api/samples/profiles` | Get sample student personas |
| `GET` | `/api/samples/taxonomy` | Get full skills taxonomy |
| `GET` | `/api/samples/status` | Get DB connection status details |

