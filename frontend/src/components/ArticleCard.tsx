import type { Bookmark } from '../types'
import { ExternalLink, ArrowUp, MessageCircle, Clock } from 'lucide-react'

interface ArticleCardProps {
  article: Bookmark
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-bg-subtle border border-border-primary rounded-lg hover:bg-surface-hover transition-colors group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-text-primary text-base font-medium group-hover:text-accent-water transition-colors truncate">
            {article.title}
          </h4>
          {article.summary && (
            <p className="mt-1 text-text-secondary text-sm line-clamp-2">{article.summary}</p>
          )}
          <div className="mt-2 flex items-center gap-3 text-text-tertiary text-xs">
            <span className="flex items-center gap-1">
              <img
                src={article.source.image}
                alt={article.source.name}
                className="w-4 h-4 rounded-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              {article.source.name}
            </span>
            {article.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime} min
              </span>
            )}
            <span className="flex items-center gap-1">
              <ArrowUp className="w-3 h-3" />
              {article.numUpvotes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {article.numComments}
            </span>
          </div>
          {article.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {article.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-accent-onion-flat text-accent-onion text-xs rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
              {article.tags.length > 4 && (
                <span className="px-2 py-0.5 text-text-tertiary text-xs">
                  +{article.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
        <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-accent-water transition-colors flex-shrink-0 mt-1" />
      </div>
    </a>
  )
}
