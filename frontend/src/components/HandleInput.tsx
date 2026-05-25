import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface HandleInputProps {
  onSubmit: (handle: string) => void
  loading?: boolean
}

export function HandleInput({ onSubmit, loading = false }: HandleInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = value.replace(/^@/, '').trim()
    if (clean) onSubmit(clean)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary text-base">@</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="username"
          className="w-full pl-10 pr-4 py-3 bg-bg-subtle border border-border-primary rounded-md text-text-primary text-base placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-blueCheese transition-shadow"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="mt-4 w-full py-3 px-8 bg-accent-bun text-bg-default font-semibold text-base rounded-full hover:bg-accent-bun-bolder transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
