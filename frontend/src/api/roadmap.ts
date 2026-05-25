import type { RoadmapResponse } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export async function fetchRoadmap(handle: string, token: string): Promise<RoadmapResponse> {
  const res = await fetch(`${API_BASE}/roadmap?handle=${encodeURIComponent(handle)}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to fetch roadmap' }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }
  return res.json()
}
