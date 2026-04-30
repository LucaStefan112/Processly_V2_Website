import { CheckCircle2, Circle, Clock, User, Users } from 'lucide-react'
import DagDiagram from './DagDiagram'

/**
 * Editor mockup — stylized depiction of the process / project editor.
 * Pure CSS / SVG. Not connected to any backend.
 */
export function EditorMockup({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_80px_-20px_rgba(10,10,9,0.25)] ring-1 ring-ink-200/80 ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-ink-200/70 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          </div>
          <p className="text-xs font-medium tracking-tight text-ink-500">
            processly · customer-onboarding
          </p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
            Live
          </span>
        </div>
      </div>

      {/* Canvas area */}
      <div
        className="relative bg-ink-50/60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(10,10,9,0.10) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="px-5 py-7 sm:px-8 sm:py-10">
          <DagDiagram className="h-auto w-full" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-ink-200/70 px-5 py-3">
        <div className="flex items-center gap-4 text-xs text-ink-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> 2 done
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-iris-500" /> 1 in progress
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink-300" /> 2 pending
          </span>
        </div>
        <span className="hidden font-mono text-[11px] text-ink-400 sm:inline">
          5 steps · est. 2d 4h
        </span>
      </div>
    </div>
  )
}

type StepRow = {
  title: string
  owner: string
  status: 'done' | 'progress' | 'pending'
  due?: string
}

const dashboardSteps: StepRow[] = [
  { title: 'Intake form received', owner: 'Sales', status: 'done', due: 'Mon' },
  { title: 'Vetting & risk check', owner: 'Compliance', status: 'done', due: 'Tue' },
  { title: 'Review proposal', owner: 'Maria · Ops', status: 'progress', due: 'Today' },
  { title: 'Approval — sign-off', owner: 'Director', status: 'pending', due: 'Thu' },
  { title: 'Hand-off to delivery', owner: 'Delivery team', status: 'pending', due: 'Fri' },
]

export function DashboardMockup({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_80px_-20px_rgba(10,10,9,0.25)] ring-1 ring-ink-200/80 ${className}`}
    >
      <div className="border-b border-ink-200/70 px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
          Project · Acme Corp onboarding
        </p>
        <p className="mt-1 text-base font-medium text-ink-950">
          5 steps · 2 of 5 complete
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <div
            className="h-full rounded-full bg-iris-500"
            style={{ width: '40%' }}
          />
        </div>
      </div>
      <ul className="divide-y divide-ink-100">
        {dashboardSteps.map((s) => (
          <li
            key={s.title}
            className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-ink-50/70"
          >
            {s.status === 'done' && (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
            )}
            {s.status === 'progress' && (
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <span className="absolute h-5 w-5 animate-ping rounded-full bg-iris-400/40" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-iris-500" />
              </span>
            )}
            {s.status === 'pending' && (
              <Circle className="h-5 w-5 shrink-0 text-ink-300" />
            )}
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm font-medium ${
                  s.status === 'done' ? 'text-ink-500 line-through' : 'text-ink-900'
                }`}
              >
                {s.title}
              </p>
              <p className="mt-0.5 flex items-center gap-2 text-xs text-ink-500">
                <User className="h-3 w-3" />
                {s.owner}
              </p>
            </div>
            {s.due && (
              <span className="hidden items-center gap-1 rounded-full bg-ink-100 px-2.5 py-1 font-mono text-[11px] text-ink-700 sm:inline-flex">
                <Clock className="h-3 w-3" />
                {s.due}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

type Card = {
  title: string
  status: 'progress' | 'pending' | 'done'
  steps: number
  done: number
  team: string
}

const cards: Card[] = [
  { title: 'Acme Corp onboarding', status: 'progress', steps: 5, done: 2, team: 'Onboarding' },
  { title: 'Q2 hiring — Senior Eng', status: 'progress', steps: 7, done: 4, team: 'People Ops' },
  { title: 'Vendor renewal', status: 'pending', steps: 4, done: 0, team: 'Procurement' },
  { title: 'Monthly close · Apr', status: 'done', steps: 9, done: 9, team: 'Finance' },
]

const statusBadge: Record<Card['status'], { label: string; cls: string }> = {
  progress: {
    label: 'In progress',
    cls: 'bg-iris-50 text-iris-700 ring-iris-100',
  },
  pending: {
    label: 'Not started',
    cls: 'bg-ink-100 text-ink-600 ring-ink-200',
  },
  done: {
    label: 'Completed',
    cls: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  },
}

export function ProjectsMockup({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_80px_-20px_rgba(10,10,9,0.25)] ring-1 ring-ink-200/80 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-ink-200/70 px-5 py-4">
        <p className="text-base font-medium text-ink-950">All projects</p>
        <span className="rounded-full bg-ink-100 px-2.5 py-1 font-mono text-[11px] text-ink-700">
          4 active
        </span>
      </div>
      <ul className="divide-y divide-ink-100">
        {cards.map((c) => {
          const pct = Math.round((c.done / c.steps) * 100)
          const badge = statusBadge[c.status]
          return (
            <li key={c.title} className="px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-900">
                    {c.title}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-ink-500">
                    <Users className="h-3 w-3" />
                    {c.team}
                    <span aria-hidden>·</span>
                    <span className="font-mono">
                      {c.done}/{c.steps}
                    </span>
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${badge.cls}`}
                >
                  {badge.label}
                </span>
              </div>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ink-100">
                <div
                  className={`h-full rounded-full ${
                    c.status === 'done'
                      ? 'bg-emerald-500'
                      : c.status === 'progress'
                        ? 'bg-iris-500'
                        : 'bg-ink-300'
                  }`}
                  style={{ width: `${pct || 4}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
