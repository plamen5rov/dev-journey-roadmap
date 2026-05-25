# Changelog

## 2026-05-25

### `b2f44ce` — chore: add .gitignore and AGENTS.md for hackathon setup
- Added `.gitignore` for Python + Node + Vite stack
- Added `AGENTS.md` with project spec, API docs, scope rules, submission checklist
- Files: `.gitignore`, `AGENTS.md`

### `ea0a67c` — feat: add daily.dev skills (ask + API reference) from Claude Code
- Copied and adapted daily-dev-ask and daily.dev skills from Claude Code
- `daily-dev-ask.md`: search workflow for developer articles
- `daily-dev.md`: full API reference with all endpoints
- Files: `.opencode/skills/daily-dev-ask.md`, `.opencode/skills/daily-dev.md`

### `b140081` — docs: add design plan aligned with daily.dev design system
- Extracted daily.dev CSS tokens (food-themed palette)
- Defined layout structure, component hierarchy, responsive breakpoints
- Specified all component styles (ArticleCard, DayCard, StackTag, ProgressBar, etc.)
- Files: `DESIGN.md`

### `6f57903` — feat: scaffold full app — frontend (Vite+React+TS+Tailwind) + backend (FastAPI)
- **Frontend**: Vite + React + TypeScript + Tailwind v4 with daily.dev design tokens
  - Components: Header, HandleInput, ArticleCard, DayCard, DeveloperDNA, ProgressBar
  - Pages: InputPage (landing), RoadmapPage (7-day view)
  - React Router with `/` and `/roadmap/:handle` routes
  - API layer for `/api/roadmap` endpoint
- **Backend**: FastAPI with `/api/roadmap` endpoint
  - Fetches bookmarks, profile, stack, experiences from daily.dev API
  - Rule-based categorization into 7 daily topics
  - Cursor-based pagination for all bookmarks
  - CORS enabled for frontend
- Files: `backend/main.py`, `backend/requirements.txt`, `frontend/*` (27 files)

### `f3f7326` — fix: handle nullable API fields (author, bookmarkedAt, company) in backend models
- Made `Bookmark.author`, `Bookmark.bookmarkedAt`, `Bookmark.tags`, etc. optional with defaults
- Changed `Experience.company` from `str` to `dict` to match API response
- Files: `backend/main.py`

### `5cafa8c` — refactor: update color palette to match daily.dev dark theme
- Replaced food-themed palette with daily.dev's actual dark theme colors
- Primary bg: `#0A0A0A`, Surface: `#151515`, Accent: neon green `#5CFF5E`
- Text hierarchy: `#F2F2F2` / `#A1A1A1` / `#8E8E8E`
- Borders: `#2A2A2A`
- Updated all components to use new tokens
- Files: `frontend/src/index.css`, all component/page files
