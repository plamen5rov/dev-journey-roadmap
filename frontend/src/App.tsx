import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { InputPage } from './pages/InputPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { fetchRoadmap } from './api/roadmap'
import type { RoadmapResponse } from './types'

function AppRoutes() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (handle: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchRoadmap(handle)
      setRoadmap(data)
      navigate(`/roadmap/${handle}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<InputPage onSubmit={handleSubmit} loading={loading} />}
      />
      <Route
        path="/roadmap/:handle"
        element={
          roadmap ? (
            <RoadmapPage data={roadmap} handle={useParams().handle!} />
          ) : (
            <div className="min-h-screen bg-bg-default flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-accent-bun/30 border-t-accent-bun rounded-full animate-spin mx-auto mb-4" />
                <p className="text-text-secondary">Loading roadmap...</p>
              </div>
            </div>
          )
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
