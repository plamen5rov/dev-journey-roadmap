import { BookOpen, Dna, Share2, Zap, BookMarked, Target, TrendingUp } from 'lucide-react'
import { Header } from '../components/Header'
import { HandleInput } from '../components/HandleInput'

interface InputPageProps {
  onSubmit: (handle: string) => void
  loading: boolean
}

const features = [
  {
    icon: BookMarked,
    title: '7-Day Roadmap',
    desc: 'Your saved articles organized into a focused learning plan',
    color: 'accent-burger',
  },
  {
    icon: Dna,
    title: 'Developer DNA',
    desc: 'Your tech stack, experience, and reputation at a glance',
    color: 'accent-onion',
  },
  {
    icon: Share2,
    title: 'Shareable',
    desc: 'Share your learning journey with a public link',
    color: 'accent-water',
  },
]

export function InputPage({ onSubmit, loading }: InputPageProps) {
  return (
    <div className="min-h-screen bg-bg-default">
      <Header />
      <main className="flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-bun-flat mb-6">
            <BookOpen className="w-8 h-8 text-accent-bun" />
          </div>
          <h1 className="text-text-primary text-4xl font-bold tracking-tight">
            Dev Journey Roadmap
          </h1>
          <p className="mt-3 text-text-secondary text-lg max-w-md mx-auto">
            Turn your daily.dev bookmarks into a personalized 7-day learning roadmap
          </p>
        </div>

        <HandleInput onSubmit={onSubmit} loading={loading} />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 bg-bg-subtle border border-border-subtle rounded-xl text-center hover:bg-surface-hover transition-colors"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${f.color}-flat mb-4`}>
                <f.icon className={`w-6 h-6 text-${f.color}`} />
              </div>
              <h3 className="text-text-primary text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-text-tertiary text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-text-tertiary text-xs flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-accent-cheese" />
          Powered by daily.dev Plus
        </div>
      </main>
    </div>
  )
}
