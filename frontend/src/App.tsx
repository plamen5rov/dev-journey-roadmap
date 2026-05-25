import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { InputPage } from './pages/InputPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { fetchRoadmap } from './api/roadmap'
import type { RoadmapResponse } from './types'

interface RoadmapRouteProps {
  roadmap: RoadmapResponse | null
}

function RoadmapRoute({ roadmap }: RoadmapRouteProps) {
  const { handle } = useParams()
  if (!roadmap) {
    return (
      <div className="min-h-screen bg-bg-default flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent-secondary/30 border-t-accent-secondary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading roadmap...</p>
        </div>
      </div>
    )
  }
  return <RoadmapPage data={roadmap} handle={handle!} />
}

function AppRoutes() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (handle: string, token: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchRoadmap(handle, token)
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
        element={<InputPage onSubmit={handleSubmit} loading={loading} error={error} />}
      />
      <Route
        path="/roadmap/:handle"
        element={<RoadmapRoute roadmap={roadmap} />}
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
