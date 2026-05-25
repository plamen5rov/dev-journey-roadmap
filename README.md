# Dev Journey Roadmap

> Turn your daily.dev bookmarks into a personalized 7-day learning roadmap.

* Really SORRY  for the typo - it was supposed to be "jorney" not "horney"! *

[![Hackathon](https://img.shields.io/badge/Hackathon-daily.dev-FF6C37?logo=dailydotdev&logoColor=white)](https://hackathon.daily.dev)
[![Frontend](https://img.shields.io/badge/Frontend-React+Vite-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Live](https://img.shields.io/badge/Live-demo-10B981)](https://dev-hourney-roadmap.vercel.app)

## 🖼️ Screenshots

### Landing Page

![Dev Journey Roadmap - Landing Page](./homescreen.png)

### Your 7-Day Roadmap

![Dev Journey Roadmap - Learning Plan](./roadmap.png)

## Overview

Dev Journey Roadmap is a web app built for the **daily.dev hackathon** (Content → Action track). It connects to your daily.dev account, fetches your saved bookmarks, and organizes them into a structured **7-day learning plan** — grouped by topic, with your Developer DNA profile displayed alongside.

**Key features:**

- **7-Day Roadmap** — Your saved articles categorized into daily topics (Frontend, Backend, DevOps, Testing, etc.)
- **Developer DNA** — Profile summary showing your tech stack, experience level, reputation, and work history
- **Progress Tracking** — Mark days as complete with a visual progress bar
- **Shareable** — Copy a public link, download a shareable card (PNG), or post directly to X, LinkedIn, and Facebook
- **No database** — Roadmaps are cached client-side for 1 hour; no server-side storage

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vite + React 19 + TypeScript + Tailwind CSS v4 |
| **Backend** | Python 3.10 + FastAPI + httpx |
| **Data** | daily.dev Public API (GraphQL/REST) |
| **Deployment** | Vercel (frontend) + Render (backend) |

## Quickstart

### Prerequisites

- **Node.js 18+** and **npm**
- **Python 3.10+** and **pip**
- A **daily.dev Plus** subscription with an API token ([generate one](https://app.daily.dev/settings/api))

### Backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env with your daily.dev API token
echo 'API_key=dda_your_token_here' > .env

# Start the server
uvicorn main:app --reload --port 8000
```

Backend runs at `http://localhost:8000`.

### Frontend

```bash
# From the project root
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and proxies `/api` requests to the backend automatically.

### Usage

1. Open `http://localhost:5173`
2. Enter your daily.dev **username** (without `@`)
3. Paste your **API token** (starts with `dda_`)
4. Click **Generate Roadmap**
5. View your 7-day plan, track progress, and share!

## Configuration

### Environment Variables

| Variable | Location | Purpose | Required |
|----------|----------|---------|----------|
| `API_key` | `backend/.env` | daily.dev API token (Bearer auth) | Yes (for local dev) |

The frontend reads `VITE_API_URL` (defaults to `/api`). Set it if your backend is on a different host:

```bash
# .env in frontend root
VITE_API_URL=http://your-backend-url.com
```

### API Token Flow

- Users provide their **own** daily.dev API token on the landing page
- The token is sent via `Authorization` header per-request — **never stored** server-side
- For local development, the backend falls back to the `.env` token if no header is provided
- Without a token, the API returns `401 Unauthorized`

## Architecture

```
┌─────────────┐       ┌──────────────┐       ┌──────────────────┐
│   Browser   │──────▶│   Frontend   │──────▶│     Backend      │
│  (Vite dev) │  /api  │ (React+Vite) │ /api   │    (FastAPI)     │
└─────────────┘       └──────────────┘       └─────────────────┘
                                                      │
                                          ┌───────────▼───────────┐
                                          │   daily.dev API       │
                                          │   (Bearer auth)       │
                                          ───────────────────────┘
```

### Project Structure

```
dev-journey-roadmap/
├── backend/
│   ├── main.py              # FastAPI app with /api/roadmap endpoint
│   └── requirements.txt     # Python dependencies
├── src/                     # React source files
│   ├── App.tsx              # Router, state, localStorage caching
│   ├── api/roadmap.ts       # API client
│   ├── components/          # UI components (Header, DayCard, etc.)
│   ├── pages/               # InputPage, RoadmapPage
│   └── types/index.ts       # TypeScript interfaces
├── public/                  # Static assets (favicon, icons)
├── index.html               # Entry point with OG meta tags
└── vite.config.ts           # Vite config with API proxy
```

### Roadmap Generation

1. Fetches all bookmarks via cursor-based pagination from daily.dev API
2. Fetches profile, tech stack, and experiences
3. Categorizes bookmarks into 7 topics using tag keyword matching
4. Returns structured JSON rendered client-side

## Deployment

### Frontend → Vercel

1. Connect your GitHub repo to Vercel
2. Vercel auto-detects the Vite project at root level
3. Settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install`
   - **Environment variable:** `VITE_API_URL` = your backend URL

### Backend → Render

1. Create a new Web Service from your GitHub repo
2. Settings:
   - **Root directory:** `backend`
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment variable:** `API_key` = your daily.dev token (for fallback)

## Shareable Features

| Feature | Description |
|---------|-------------|
| **Public URL** | `/roadmap/:handle` — viewable by anyone (cached for 1 hour) |
| **Copy Link** | Copies shareable URL to clipboard |
| **Download Card** | Generates a 1200×630 PNG share card with roadmap summary |
| **Social Share** | One-click share to X (Twitter), LinkedIn, and Facebook |
| **OG Tags** | Open Graph meta tags for rich link previews on Discord, Slack, etc. |

## Data & Privacy

- **No database** — the app is stateless
- **No server-side storage** — user tokens are passed through only, never logged or saved
- **Client-side cache** — roadmaps stored in `localStorage` for 1 hour, auto-expired
- **No personal data collected** — only data returned by the daily.dev API is displayed

## License

MIT — see [LICENSE](LICENSE) for details.

## Credits

Built for the [daily.dev hackathon](https://hackathon.daily.dev) — Content → Action track.

Powered by the [daily.dev Public API](https://docs.daily.dev/public-api/).
