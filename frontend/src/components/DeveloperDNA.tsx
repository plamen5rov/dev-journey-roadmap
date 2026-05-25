import type { Profile, StackItem, Experience } from '../types'
import { MapPin, Star, Trophy } from 'lucide-react'

interface DeveloperDNAProps {
  profile: Profile
  stack: StackItem[]
  experiences: Experience[]
}

export function DeveloperDNA({ profile, stack, experiences }: DeveloperDNAProps) {
  const workExp = experiences.find((e) => e.type === 'work')

  return (
    <div className="bg-bg-subtle border border-border-primary rounded-xl p-6">
      <div className="flex items-start gap-4">
        {profile.image && (
          <img
            src={profile.image}
            alt={profile.name || 'Profile'}
            className="w-16 h-16 rounded-full border-2 border-accent-onion"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-text-primary text-2xl font-bold">{profile.name || profile.username}</h2>
            {profile.isPlus && (
              <span className="px-2 py-0.5 bg-accent-cabbage-flat text-accent-cabbage text-xs rounded-full font-medium">
                Plus
              </span>
            )}
          </div>
          {profile.bio && <p className="text-text-secondary text-sm mt-1">{profile.bio}</p>}
          <div className="mt-2 flex items-center gap-4 text-text-tertiary text-sm flex-wrap">
            {profile.reputation > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-accent-cheese" />
                {profile.reputation} rep
              </span>
            )}
            {profile.experienceLevel && (
              <span className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-accent-burger" />
                {profile.experienceLevel}
              </span>
            )}
            {profile.location?.city && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location.city}
                {profile.location.country && `, ${profile.location.country}`}
              </span>
            )}
          </div>
          {workExp && (
            <p className="mt-2 text-text-secondary text-sm">
              {workExp.title}
              {workExp.company && ` at ${workExp.company}`}
              {workExp.startYear && ` · Since ${workExp.startYear}`}
            </p>
          )}
        </div>
      </div>

      {stack.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border-subtle">
          <h3 className="text-text-tertiary text-sm font-medium mb-2">Developer Stack</h3>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item.id}
                className="px-3 py-1 bg-accent-onion-flat text-accent-onion text-sm rounded-full font-medium flex items-center gap-1.5"
              >
                {item.tool.faviconUrl && (
                  <img
                    src={item.tool.faviconUrl}
                    alt=""
                    className="w-4 h-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                )}
                {item.tool.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
