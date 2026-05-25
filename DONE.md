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

### `8847174` — feat: add pink #ea618c as secondary accent color
- Profile avatar border uses secondary pink
- Stack tags and article tags use pink instead of purple
- Day card left border uses pink
- Header logo icon uses pink
- Primary purple stays for CTAs and main actions
- Added hover/active variants for secondary
- Files: `frontend/src/index.css`, `DeveloperDNA.tsx`, `ArticleCard.tsx`, `DayCard.tsx`, `Header.tsx`

### `90d32ee` — fix: resolve React hooks order violation blocking roadmap navigation
- `useParams()` was called conditionally inside a ternary expression
- Extracted `RoadmapRoute` as a proper component that always calls hooks
- Also fixed stale accent color (`accent-bun`) in loading spinner
- App now navigates to `/roadmap/:handle` and renders correctly
- Files: `frontend/src/App.tsx`

### `de6f79d` — feat: user-provided API token for public deployment
- Added token input field on landing page (masked, with show/hide toggle)
- Frontend sends token via Authorization header per-request
- Backend accepts Authorization header, falls back to `.env` for local dev
- Returns 401 if no token provided and no `.env` fallback
- Token never stored server-side — passed through only
- Added error display on landing page for failed requests
- Link to `daily.dev/settings/api` for token generation
- Files: `HandleInput.tsx`, `InputPage.tsx`, `App.tsx`, `roadmap.ts`, `main.py`

### `71be94c` — feat: add shareable/explorable roadmap for bonus points
- **localStorage caching**: roadmaps cached for 1 hour, shared links work without token
- **Share button**: copies URL to clipboard with toast notification
- **Download Card**: generates 1200x630 PNG share card with roadmap summary
- **ShareCard component**: shows profile, 7-day topics, article count, branding
- **Open Graph meta tags** for link previews (Twitter, Discord, etc.)
- **Dynamic document title** and OG tags when viewing a roadmap
- **Header** now has Card (download) + Share (copy link) buttons
- Files: `App.tsx`, `RoadmapPage.tsx`, `Header.tsx`, `ShareCard.tsx`, `Toast.tsx`, `index.html`, `vite.config.ts`

### `b5e65f3` — feat: add social share buttons for X, LinkedIn, Facebook
- Share button now opens dropdown with social platform options
- X (Twitter): opens tweet intent with pre-filled URL and text
- LinkedIn: opens share dialog with roadmap URL
- Facebook: opens share dialog with roadmap URL
- Copy Link option at bottom of dropdown
- Dropdown closes on outside click or selection
- Files: `Header.tsx`, `RoadmapPage.tsx`

### `80599b7` — chore: move frontend to root for Vercel deployment
- Moved all frontend files from `frontend/` to project root
- Vercel can now auto-detect Vite project at root level
- Updated `.gitignore` to exclude `backend/venv`, `__pycache__`, `.env`, `.tmp`
- Backend remains in `backend/` directory

### `5ec9f9a` — docs: write comprehensive README.md
- Project overview, tech stack, quickstart guide
- Backend and frontend setup instructions
- Configuration table for environment variables
- Architecture diagram and project structure
- Deployment instructions for Vercel + Render
- Shareable features documentation
- Data & privacy section
- Credits and license
- Files: `README.md`
