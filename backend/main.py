import os
import time
import asyncio
from datetime import datetime, timedelta
from collections import defaultdict
from typing import Optional

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

DAILY_DEV_TOKEN = os.getenv("API_key", "")
DAILY_DEV_API = "https://api.daily.dev/public/v1"

app = FastAPI(title="Dev Journey Roadmap API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Source(BaseModel):
    id: str
    name: str
    handle: str
    image: str


class Author(BaseModel):
    name: str
    image: str


class Bookmark(BaseModel):
    id: str
    title: str
    url: str
    image: Optional[str] = None
    summary: Optional[str] = None
    type: str
    publishedAt: Optional[str] = None
    createdAt: str
    commentsPermalink: str
    source: Source
    tags: list[str]
    readTime: Optional[int] = None
    numUpvotes: int
    numComments: int
    author: Author
    bookmarkedAt: str


class Profile(BaseModel):
    id: str
    name: Optional[str] = None
    username: Optional[str] = None
    bio: Optional[str] = None
    image: Optional[str] = None
    cover: Optional[str] = None
    createdAt: str
    reputation: int
    permalink: str
    isPlus: Optional[bool] = None
    experienceLevel: Optional[str] = None
    location: dict = {}


class StackItem(BaseModel):
    id: str
    section: str
    position: int
    startedAt: Optional[str] = None
    tool: dict


class Experience(BaseModel):
    id: str
    type: str
    title: str
    company: Optional[str] = None
    startYear: Optional[int] = None
    endYear: Optional[int] = None


class DayPlan(BaseModel):
    day: int
    topic: str
    articles: list[Bookmark]
    completed: bool = False


class RoadmapResponse(BaseModel):
    profile: Profile
    stack: list[StackItem]
    experiences: list[Experience]
    days: list[DayPlan]
    totalArticles: int


headers = {"Authorization": f"Bearer {DAILY_DEV_TOKEN}"}


async def fetch_all_bookmarks() -> list[dict]:
    """Fetch all bookmarks with cursor-based pagination."""
    all_bookmarks = []
    cursor = None
    while True:
        params = {"limit": 50}
        if cursor:
            params["cursor"] = cursor
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{DAILY_DEV_API}/bookmarks/",
                headers=headers,
                params=params,
                timeout=30,
            )
        if resp.status_code == 429:
            retry_after = resp.json().get("retryAfter", 5)
            await httpx.AsyncClient().sleep(retry_after)
            continue
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail=resp.text)
        data = resp.json()
        items = data.get("data", [])
        all_bookmarks.extend(items)
        pagination = data.get("pagination", {})
        if not pagination.get("hasNextPage"):
            break
        cursor = pagination.get("cursor")
        if not cursor:
            break
    return all_bookmarks


async def fetch_profile() -> dict:
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{DAILY_DEV_API}/profile/",
            headers=headers,
            timeout=15,
        )
    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return resp.json()


async def fetch_stack() -> list[dict]:
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{DAILY_DEV_API}/profile/stack/",
            headers=headers,
            timeout=15,
        )
    if resp.status_code != 200:
        return []
    return resp.json().get("data", [])


async def fetch_experiences() -> list[dict]:
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{DAILY_DEV_API}/profile/experiences/",
            headers=headers,
            timeout=15,
        )
    if resp.status_code != 200:
        return []
    return resp.json().get("data", [])


TOPIC_KEYWORDS = {
    "Frontend Frameworks": ["react", "vue", "angular", "svelte", "nextjs", "frontend", "javascript", "typescript"],
    "Backend & APIs": ["node", "express", "fastapi", "django", "flask", "graphql", "rest", "api", "server"],
    "Database & Storage": ["postgres", "mysql", "mongodb", "redis", "sqlite", "database", "sql", "nosql", "prisma"],
    "DevOps & Cloud": ["docker", "kubernetes", "aws", "gcp", "azure", "ci/cd", "deploy", "cloud", "terraform"],
    "Testing & Quality": ["test", "jest", "vitest", "cypress", "playwright", "unit", "e2e", "tdd"],
    "Performance & Optimization": ["performance", "optimization", "bundle", "lazy", "cache", "speed", "lighthouse"],
    "Security & Auth": ["security", "auth", "oauth", "jwt", "csrf", "xss", "encryption", "authentication"],
}


def categorize_articles(bookmarks: list[dict]) -> list[DayPlan]:
    """Group bookmarks into 7 days by tags and bookmarkedAt."""
    sorted_bm = sorted(
        bookmarks,
        key=lambda x: x.get("bookmarkedAt", ""),
        reverse=True,
    )

    topic_articles: dict[str, list[dict]] = defaultdict(list)
    uncategorized = []

    for bm in sorted_bm:
        tags = [t.lower() for t in bm.get("tags", [])]
        matched = False
        for topic, keywords in TOPIC_KEYWORDS.items():
            if any(kw in tags for kw in keywords):
                topic_articles[topic].append(bm)
                matched = True
                break
        if not matched:
            uncategorized.append(bm)

    days = []
    topics = list(topic_articles.keys())
    for i in range(7):
        if i < len(topics):
            topic = topics[i]
            articles = topic_articles[topic][:5]
        elif uncategorized:
            topic = "Explore & Discover"
            start = (i - len(topics)) * 5
            articles = uncategorized[start : start + 5]
        else:
            topic = "Review & Practice"
            articles = []

        days.append(
            DayPlan(
                day=i + 1,
                topic=topic,
                articles=[Bookmark(**a) for a in articles],
                completed=False,
            )
        )

    return days


@app.get("/api/health")
async def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}


@app.get("/api/roadmap", response_model=RoadmapResponse)
async def get_roadmap(handle: str = Query(..., min_length=1)):
    try:
        bookmarks, profile_data, stack_data, experiences_data = await asyncio.gather(
            fetch_all_bookmarks(),
            fetch_profile(),
            fetch_stack(),
            fetch_experiences(),
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to fetch daily.dev data: {str(e)}")

    profile = Profile(**profile_data)
    stack = [StackItem(**s) for s in stack_data]
    experiences = [Experience(**e) for e in experiences_data]
    days = categorize_articles(bookmarks)

    return RoadmapResponse(
        profile=profile,
        stack=stack,
        experiences=experiences,
        days=days,
        totalArticles=len(bookmarks),
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
