import { useState } from 'react'
import { ArrowRight, KeyRound, Eye, EyeOff } from 'lucide-react'

interface HandleInputProps {
  onSubmit: (handle: string, token: string) => void
  loading?: boolean
}

export function HandleInput({ onSubmit, loading = false }: HandleInputProps) {
  const [handle, setHandle] = useState('')
  const [token, setToken] = useState('')
  const [showToken, setShowToken] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanHandle = handle.replace(/^@/, '').trim()
    if (cleanHandle && token) onSubmit(cleanHandle, token)
  }

  const isValid = handle.trim() && token.trim()

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary text-base">@</span>
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="username"
          className="w-full pl-10 pr-4 py-3 bg-bg-surface border border-border-default rounded-md text-text-primary text-base placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-shadow"
          disabled={loading}
        />
      </div>

      <div className="relative">
        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
        <input
          type={showToken ? 'text' : 'password'}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="dda_... API token"
          className="w-full pl-10 pr-12 py-3 bg-bg-surface border border-border-default rounded-md text-text-primary text-base placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-shadow font-mono text-sm"
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowToken(!showToken)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
          tabIndex={-1}
        >
          {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <p className="text-text-tertiary text-xs">
        Get your token at{' '}
        <a
          href="https://app.daily.dev/settings/api"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-secondary hover:underline"
        >
          daily.dev/settings/api
        </a>
        {' '}(requires Plus subscription)
      </p>

      <button
        type="submit"
        disabled={loading || !isValid}
        className="w-full py-3 px-8 bg-accent-primary text-bg-default font-semibold text-base rounded-full hover:bg-accent-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-bg-default/30 border-t-bg-default rounded-full animate-spin" />
        ) : (
          <>
            Generate Roadmap
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}
