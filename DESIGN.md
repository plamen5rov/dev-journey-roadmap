# Design Plan — Dev Journey Roadmap

Aligned with daily.dev's design system for visual consistency.

## Design Tokens (Tailwind Config)

### Colors — Dark Theme Default (daily.dev palette)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-default` | `#0e1217` | Page background |
| `bg-subtle` | `#1c1f26` | Card/post surfaces |
| `bg-popover` | `#1c1f26` | Dropdowns, modals |
| `text-primary` | `#ffffff` | Headings, primary labels |
| `text-secondary` | `#cfd6e6` | Body text, descriptions |
| `text-tertiary` | `#a8b3cf` | Muted text, timestamps, tags |
| `border-primary` | `#525866` | Card borders, dividers |
| `border-subtle` | `rgba(168,179,207,0.4)` | Subtle separators |

### Brand Accent Colors (food-themed)

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-burger` | `#ad6648` | Roadmap day headers, progress |
| `accent-bun` | `#ff8e3b` | CTAs, highlights |
| `accent-cheese` | `#ffe923` | Warnings, streaks |
| `accent-avocado` | `#39e58c` | Success, completed items |
| `accent-water` | `#427ef7` | Links, info |
| `accent-onion` | `#7147ed` | Developer DNA, stack tags |
| `accent-cabbage` | `#ce3df3` | Premium/Plus indicators |
| `accent-bacon` | `#fc538d` | Upvotes, engagement |
| `accent-ketchup` | `#e04337` | Errors, overdue |
| `accent-blueCheese` | `#2cdce6` | Active states, focus rings |

### Surfaces & States

| Token | Value | Usage |
|-------|-------|-------|
| `surface-hover` | `rgba(168,179,207,0.12)` | Card hover bg |
| `surface-active` | `rgba(168,179,207,0.16)` | Card active/pressed |
| `surface-focus` | `#2cdce6` | Focus ring |
| `surface-float` | `rgba(168,179,207,0.08)` | Floating elements, tooltips |
| `shadow-1` | `0 2px 8px rgba(14,18,23,0.32)` | Card elevation |
| `shadow-2` | `0 6px 6px rgba(0,0,0,0.4)` | Modal elevation |
| `shadow-3` | `0 14px 14px rgba(0,0,0,0.64)` | Float/elevated panels |

### Typography

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `title1` | 24px | 700 | Page titles, day headers |
| `title2` | 20px | 600 | Section headers |
| `title3` | 16px | 600 | Card titles |
| `body` | 14px | 400 | Body text, descriptions |
| `callout` | 12px | 500 | Tags, badges, metadata |
| `micro` | 11px | 500 | Timestamps, counts |

### Spacing (4px base)

`0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64`

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 4px | Tags, badges |
| `md` | 8px | Buttons, inputs |
| `lg` | 12px | Cards, panels |
| `xl` | 16px | Modals, large panels |
| `full` | 9999px | Pills, avatars |

## Layout Structure

### Page: Input (Landing)

```
┌─────────────────────────────────────────────────┐
│  [Logo]  Dev Journey Roadmap                    │
│                                                 │
│         ┌───────────────────────────────┐       │
│         │                               │       │
│         │   Enter your daily.dev handle  │       │
│         │   ┌─────────────────────────┐  │       │
│         │   │  @username              │  │       │
│         │   └─────────────────────────┘  │       │
│         │                               │       │
│         │   [ Generate Roadmap ]         │       │
│         │                               │       │
│         │   Powered by daily.dev Plus    │       │
│         └───────────────────────────────┘       │
│                                                 │
│   Features:                                     │
│   ┌─────┐  ┌─────┐  ┌─────┐                    │
│   │ 7d  │  │ DNA │  │ 🔗  │                    │
│   │Road │  │Summ │  │Share│                    │
│   └─────┘  └─────┘  └─────┘                    │
└─────────────────────────────────────────────────┘
```

- Centered card on dark bg (`#0e1217`)
- Input: `bg-subtle` + `border-primary` + focus ring `accent-blueCheese`
- CTA: `accent-bun` bg, dark text, `rounded-full`
- Feature cards: `bg-subtle` + `border-subtle`, 3-column grid

### Page: Roadmap (7-Day View)

```
┌─────────────────────────────────────────────────┐
│ [Logo]  @username's Learning Roadmap    [Share] │
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌─ Developer DNA ────────────────────────────┐  │
│ │  Avatar  Name  ·  Rep  ·  Level            │  │
│ │  [React] [Node] [Python] [Docker] [AWS]    │  │
│ │  Work: Senior Dev @ Company · 5 yrs exp    │  │
│ └────────────────────────────────────────────┘  │
│                                                 │
│ ┌─ Day 1: React Fundamentals ────────────────┐  │
│ │  ┌──────────────────────────────────────┐  │  │
│ │  │ Article Title                        │  │  │
│ │  │ Source · 5 min read · ⬆ 342 · 💬 28 │  │  │
│ │  │ #react #hooks #frontend              │  │  │
│ │  └──────────────────────────────────────┘  │  │
│ │  ┌──────────────────────────────────────┐  │  │
│ │  │ Article Title                        │  │  │
│ │  │ ...                                  │  │  │
│ │  └──────────────────────────────────────┘  │  │
│ │  [✓ Mark Day Complete]                      │  │
│ └────────────────────────────────────────────┘  │
│                                                 │
│ ┌─ Day 2: State Management ──────────────────┐  │
│ │  ...                                        │  │
│ └────────────────────────────────────────────┘  │
│                                                 │
│  Day 3 · Day 4 · Day 5 · Day 6 · Day 7         │
│                                                 │
│ ┌─ Progress ─────────────────────────────────┐  │
│ │  ████░░░░░░░░  4/7 days complete           │  │
│ └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── PageTitle
│   └── ShareButton
│
├── InputPage
│   ├── HeroCard
│   │   ├── Title
│   │   ├── HandleInput
│   │   └── GenerateButton
│   └── FeatureGrid (3 cards)
│
├── RoadmapPage
│   ├── DeveloperDNA
│   │   ├── ProfileHeader (avatar, name, rep, level)
│   │   ├── StackTags (pill badges)
│   │   └── ExperienceSummary
│   ├── DayCard (×7)
│   │   ├── DayHeader (title, article count)
│   │   ├── ArticleCard (×N)
│   │   │   ├── Title + Source
│   │   │   ├── Meta (readTime, upvotes, comments)
│   │   │   └── TagList
│   │   └── CompleteButton
│   └── ProgressBar
│
└── Footer
    └── PoweredBy daily.dev
```

## Component Specifications

### ArticleCard
- **Bg**: `bg-subtle` (`#1c1f26`)
- **Border**: `border-primary` (`#525866`), 1px
- **Radius**: `lg` (12px)
- **Hover**: `surface-hover` bg shift
- **Padding**: 16px
- **Layout**: Vertical stack, gap 8px

### StackTag (pill badge)
- **Bg**: `accent-onion` flat variant (`rgba(113,71,237,0.16)`)
- **Text**: `accent-onion` default (`#7147ed`)
- **Radius**: `full` (9999px)
- **Padding**: 4px 12px
- **Font**: `callout` (12px, 500)

### DayCard
- **Bg**: `bg-subtle` (`#1c1f26`)
- **Border**: `border-primary`, 1px
- **Radius**: `xl` (16px)
- **Header**: `accent-burger` left border (3px), `title1` font
- **Padding**: 24px
- **Gap**: 16px between articles

### ProgressBar
- **Track**: `bg-subtle` + `border-subtle`
- **Fill**: `accent-avocado` gradient
- **Height**: 8px
- **Radius**: `full`
- **Label**: `callout` below, `text-tertiary`

### HandleInput
- **Bg**: `bg-subtle`
- **Border**: `border-primary`, 1px
- **Focus**: `accent-blueCheese` ring (2px)
- **Radius**: `md` (8px)
- **Padding**: 12px 16px
- **Font**: `body` (14px)
- **Placeholder**: `text-tertiary`

### GenerateButton (Primary CTA)
- **Bg**: `accent-bun` (`#ff8e3b`)
- **Text**: `#0e1217` (dark)
- **Radius**: `full` (9999px)
- **Padding**: 12px 32px
- **Font**: `title3` (16px, 600)
- **Hover**: `accent-bun-bolder` (`#ff7a2b`)

### CompleteButton
- **Bg**: `accent-avocado` flat (`rgba(57,229,140,0.16)`)
- **Text**: `accent-avocado` (`#39e58c`)
- **Border**: `accent-avocado`, 1px
- **Radius**: `full`
- **Padding**: 8px 20px
- **Font**: `callout` (12px, 500)
- **Checked**: Solid `accent-avocado` bg, dark text

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| `mobile` | <640px | Single column, stacked |
| `tablet` | 640-1024px | 2-col feature grid, full roadmap |
| `laptop` | 1024-1280px | Max-width container, centered |
| `desktop` | >1280px | Sidebar nav + main content |

## Animation & Transitions

| Element | Duration | Easing | Effect |
|---------|----------|--------|--------|
| Card hover | 150ms | ease-out | bg shift, slight scale (1.01) |
| Button hover | 150ms | ease-out | bg shift |
| Page transition | 300ms | ease-in-out | fade in |
| Progress fill | 500ms | ease-out | width animation |
| Day complete | 200ms | ease-out | checkmark scale in |

## Shareable Page

Public URL: `/roadmap/:username`

- Same layout as RoadmapPage
- "Share" button copies URL to clipboard
- OG meta tags for social preview
- "Create your own" CTA at bottom
