# Dev Journey Roadmap

daily.dev hackathon project — turns saved articles into a 7-day learning roadmap.
Track: **Content → Action**.

## Deadline

**May 25, 2026, 12:00 UTC (3:00 PM Sofia time)** — today.

## Tech Stack

| Layer | Tech |
|-------|------|
| Backend | Python FastAPI |
| Frontend | Vite + React + TypeScript + Tailwind |
| Data | daily.dev Public API (GraphQL) |
| Deploy | Vercel (frontend) + Render (backend) |

## Dev Commands

```bash
# Backend
cd backend && python -m venv venv && source venv/bin/activate
pip install fastapi uvicorn httpx
uvicorn main:app --reload

# Frontend
cd frontend && npm install
npm run dev
```

## Architecture

```
backend/          FastAPI — fetches bookmarks via daily.dev API, generates roadmap JSON
frontend/         Vite React — input page (handle) + roadmap display + Developer DNA summary
```

- No database, no auth — use local storage for "mark as done" if needed
- Roadmap output is JSON, rendered client-side
- API key in `.env` (do not commit)

## daily.dev API

- **Plus subscription required** — API is gated behind daily.dev Plus
- **Base URL**: `https://api.daily.dev/public/v1`
- **Auth**: `Authorization: Bearer <token>` (generate at https://app.daily.dev/settings/api)
- **OpenAPI spec**: https://api.daily.dev/public/v1/docs/json
- **Docs**: https://docs.daily.dev/public-api/

### Key endpoints for this project

| Endpoint | Purpose |
|----------|---------|
| `GET /bookmarks/` | Fetch all saved articles (cursor-based pagination, default 20/page) |
| `GET /profile/` | User info: name, username, reputation, experienceLevel |
| `GET /profile/stack/` | User's declared tech stack (Developer DNA) |
| `GET /profile/experiences/` | Work history, education, projects, open source |
| `GET /tags/` | All available tags for categorization |
| `GET /recommend/keyword` | Related articles by keyword (fill roadmap gaps) |
| `GET /recommend/semantic` | Semantic recommendations (discover related topics) |

### Response patterns

- **Pagination**: cursor-based — loop while `hasNextPage` is true, pass `cursor` from response
- **Rate limits**: 429 includes `retryAfter` (seconds to wait)
- **Bookmark schema**: `id`, `title`, `url`, `tags[]`, `readTime`, `source`, `bookmarkedAt`, `summary`, `numUpvotes`, `numComments`, `author`
- **`bookmarkedAt`** is the key field for chronological grouping into 7 days
- **`tags[]`** on each bookmark is the primary signal for categorizing articles into daily topics

### Token in `.env` (do not commit)

## Scope Rules

- 7-day roadmap only (not 30-day)
- Rule-based generation first, AI later if time
- Focus: polished UI + shareable public page
- Developer DNA summary is the hook; roadmap is the product
- **Do NOT rebuild existing features**: bookmarks, top reader, reading streaks, briefings
- **Bonus points**: solution should be explorable and shareable by other users

## Submission Checklist

- [ ] Public demo URL (must be deployed and accessible)
- [ ] Post on social media tagging @dailydotdev with live URL + short summary
- [ ] README with setup + screenshots
- [ ] Demo video
- [ ] GitHub repo link
