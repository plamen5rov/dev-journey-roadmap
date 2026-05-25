export interface Source {
  id: string
  name: string
  handle: string
  image: string
}

export interface Author {
  name: string
  image: string
}

export interface Bookmark {
  id: string
  title: string
  url: string
  image: string | null
  summary: string | null
  type: string
  publishedAt: string | null
  createdAt: string
  commentsPermalink: string
  source: Source
  tags: string[]
  readTime: number | null
  numUpvotes: number
  numComments: number
  author: Author
  bookmarkedAt: string
}

export interface Profile {
  id: string
  name: string | null
  username: string | null
  bio: string | null
  image: string | null
  cover: string | null
  createdAt: string
  reputation: number
  permalink: string
  isPlus: boolean | null
  experienceLevel: string | null
  location: {
    city: string
    country: string
  }
}

export interface StackItem {
  id: string
  section: string
  position: number
  startedAt: string | null
  tool: {
    id: string
    title: string
    faviconUrl: string
  }
}

export interface Experience {
  id: string
  type: string
  title: string
  company: string | null
  startYear: number | null
  endYear: number | null
}

export interface DayPlan {
  day: number
  topic: string
  articles: Bookmark[]
  completed: boolean
}

export interface RoadmapResponse {
  profile: Profile
  stack: StackItem[]
  experiences: Experience[]
  days: DayPlan[]
  totalArticles: number
}
