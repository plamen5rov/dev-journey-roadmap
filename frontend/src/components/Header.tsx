import { useState } from 'react'
import { BookOpen, Share2, Download, Facebook, Linkedin, Twitter } from 'lucide-react'

interface HeaderProps {
  title?: string
  showShare?: boolean
  onShare?: () => void
  onDownloadCard?: () => void
  shareUrl?: string
  shareText?: string
}

export function Header({
  title = 'Dev Journey Roadmap',
  showShare = false,
  onShare,
  onDownloadCard,
  shareUrl,
  shareText,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false)

  const shareToX = () => {
    const url = encodeURIComponent(shareUrl || window.location.href)
    const text = encodeURIComponent(shareText || 'Check out my Dev Journey Roadmap!')
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    setShowMenu(false)
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(shareUrl || window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
    setShowMenu(false)
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(shareUrl || window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
    setShowMenu(false)
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-default bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-accent-secondary flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-bg-default" />
        </div>
        <span className="text-base font-semibold text-text-primary">{title}</span>
      </div>
      {showShare && (
        <div className="flex items-center gap-2 relative">
          <button
            onClick={onDownloadCard}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary bg-surface-float rounded-full hover:bg-surface-hover transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Card
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent-primary bg-accent-primary-flat rounded-full hover:bg-accent-primary/20 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-bg-elevated border border-border-default rounded-xl shadow-lg z-50 overflow-hidden">
                  <button
                    onClick={shareToX}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Share on X
                  </button>
                  <button
                    onClick={shareToLinkedIn}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    Share on LinkedIn
                  </button>
                  <button
                    onClick={shareToFacebook}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    Share on Facebook
                  </button>
                  <div className="border-t border-border-default">
                    <button
                      onClick={() => {
                        if (onShare) onShare()
                        setShowMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-accent-primary hover:bg-surface-hover transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Copy Link
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
