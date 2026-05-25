import { BookOpen } from 'lucide-react'

interface HeaderProps {
  title?: string
  showShare?: boolean
  onShare?: () => void
}

export function Header({ title = 'Dev Journey Roadmap', showShare = false, onShare }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-primary bg-bg-subtle/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-accent-bun flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-bg-default" />
        </div>
        <span className="text-base font-semibold text-text-primary">{title}</span>
      </div>
      {showShare && (
        <button
          onClick={onShare}
          className="px-4 py-2 text-sm font-medium text-text-secondary bg-surface-float rounded-full hover:bg-surface-hover transition-colors"
        >
          Share
        </button>
      )}
    </header>
  )
}
