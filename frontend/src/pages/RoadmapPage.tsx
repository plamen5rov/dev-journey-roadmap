import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import { Header } from '../components/Header'
import { DeveloperDNA } from '../components/DeveloperDNA'
import { DayCard } from '../components/DayCard'
import { ProgressBar } from '../components/ProgressBar'
import { ShareCard } from '../components/ShareCard'
import { Toast } from '../components/Toast'
import type { RoadmapResponse } from '../types'

interface RoadmapPageProps {
  data: RoadmapResponse
  handle: string
}

export function RoadmapPage({ data, handle }: RoadmapPageProps) {
  const [days, setDays] = useState(data.days)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [showShareCard, setShowShareCard] = useState(false)
  const shareCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = `${handle}'s Dev Journey Roadmap`
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogTitle) ogTitle.setAttribute('content', `${handle}'s 7-Day Learning Roadmap`)
    if (ogDesc) ogDesc.setAttribute('content', `${data.totalArticles} articles across ${data.days.filter((d) => d.articles.length > 0).length} topics`)
  }, [handle, data])

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setToastVisible(true)
  }

  const handleToggleComplete = (day: number) => {
    setDays((prev) =>
      prev.map((d) => (d.day === day ? { ...d, completed: !d.completed } : d))
    )
  }

  const handleShare = () => {
    const url = `${window.location.origin}/roadmap/${handle}`
    navigator.clipboard.writeText(url)
    showToast('Link copied to clipboard!')
  }

  const handleDownloadCard = async () => {
    setShowShareCard(true)
    await new Promise((r) => setTimeout(r, 100))
    try {
      const canvas = await htmlToCanvas(shareCardRef.current!)
      const link = document.createElement('a')
      link.download = `roadmap-${handle}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      showToast('Card downloaded!')
    } catch {
      showToast('Failed to download card')
    }
    setShowShareCard(false)
  }

  const completedCount = days.filter((d) => d.completed).length

  const shareUrl = `${window.location.origin}/roadmap/${handle}`
  const shareText = `Check out my 7-day Dev Journey Roadmap — ${data.totalArticles} articles organized by topic!`

  return (
    <div className="min-h-screen bg-bg-default">
      <Header
        title={`${handle}'s Learning Roadmap`}
        showShare
        onShare={handleShare}
        onDownloadCard={handleDownloadCard}
        shareUrl={shareUrl}
        shareText={shareText}
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
              className="text-accent-primary hover:underline"
            >
              devjourney.roadmap
            </a>
          </p>
        </div>
      </main>

      {showShareCard && (
        <div className="fixed -left-[9999px] top-0">
          <div ref={shareCardRef}>
            <ShareCard
              handle={handle}
              profile={data.profile}
              days={data.days}
              totalArticles={data.totalArticles}
            />
          </div>
        </div>
      )}

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  )
}

async function htmlToCanvas(el: HTMLElement): Promise<HTMLCanvasElement> {
  return html2canvas(el, {
    backgroundColor: '#0A0A0A',
    scale: 2,
    useCORS: true,
    logging: false,
  })
}
