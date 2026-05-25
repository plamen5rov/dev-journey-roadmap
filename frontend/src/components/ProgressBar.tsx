interface ProgressBarProps {
  completed: number
  total: number
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="bg-bg-subtle border border-border-primary rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-text-secondary text-sm font-medium">Progress</span>
        <span className="text-text-tertiary text-sm">
          {completed}/{total} days complete
        </span>
      </div>
      <div className="w-full h-2 bg-bg-default rounded-full overflow-hidden border border-border-subtle">
        <div
          className="h-full bg-gradient-to-r from-accent-avocado to-accent-lettuce rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-text-tertiary text-xs">{percentage}% complete</p>
    </div>
  )
}
