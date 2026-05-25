import { useState } from 'react'
import { Header } from '../components/Header'
import { DeveloperDNA } from '../components/DeveloperDNA'
import { DayCard } from '../components/DayCard'
import { ProgressBar } from '../components/ProgressBar'
import type { RoadmapResponse } from '../types'

interface RoadmapPageProps {
  data: RoadmapResponse
  handle: string
}

export function RoadmapPage({ data, handle }: RoadmapPageProps) {
  const [days, setDays] = useState(data.days)

  const handleToggleComplete = (day: number) => {
    setDays((prev) =>
      prev.map((d) => (d.day === day ? { ...d, completed: !d.completed } : d))
    )
  }

  const handleShare = () => {
    const url = `${window.location.origin}/roadmap/${handle}`
    navigator.clipboard.writeText(url)
  }

  const completedCount = days.filter((d) => d.completed).length

  return (
    <div className="min-h-screen bg-bg-default">
      <Header
        title={`${handle}'s Learning Roadmap`}
        showShare
        onShare={handleShare}
      />
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <DeveloperDNA
          profile={data.profile}
          stack={data.stack}
          experiences={data.experiences}
        />
        <ProgressBar completed={completedCount} total={days.length} />
        <div className="space-y-6">
          {days.map((day) => (
            <DayCard
              key={day.day}
              day={day}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
        <div className="text-center pt-4 pb-8">
          <p className="text-text-tertiary text-sm">
            Create your own roadmap at{' '}
            <a
              href="/"
              className="text-accent-water hover:underline"
            >
              devjourney.roadmap
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
