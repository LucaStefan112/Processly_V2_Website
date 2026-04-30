import { CheckCircle2, Circle, Clock, User, Users } from 'lucide-react'
import DagDiagram from './DagDiagram'
import { useT } from '../i18n'

/**
 * Editor mockup — stylized depiction of the process / project editor.
 * Pure CSS / SVG. Not connected to any backend.
 */
export function EditorMockup({ className = '' }: { className?: string }) {
  const t = useT()
  const e = t.mockup.editor
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
            {e.projectLabel}
          </p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
            {e.live}
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
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> 2 {e.done}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-iris-500" /> 1 {e.inProgress}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink-300" /> 2 {e.pending}
          </span>
        </div>
        <span className="hidden font-mono text-[11px] text-ink-400 sm:inline">
          5 {e.steps} · {e.est}
        </span>
      </div>
    </div>
  )
}

const dashboardStatuses = ['done', 'done', 'progress', 'pending', 'pending'] as const

export function DashboardMockup({ className = '' }: { className?: string }) {
  const t = useT()
  const d = t.mockup.dashboard
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_80px_-20px_rgba(10,10,9,0.25)] ring-1 ring-ink-200/80 ${className}`}
    >
      <div className="border-b border-ink-200/70 px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
          {d.eyebrow}
        </p>
        <p className="mt-1 text-base font-medium text-ink-950">
          {d.title}
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <div
            className="h-full rounded-full bg-iris-500"
            style={{ width: '40%' }}
          />
        </div>
      </div>
      <ul className="divide-y divide-ink-100">
        {d.steps.map((s, i) => {
          const status = dashboardStatuses[i]
          return (
            <li
              key={s.title}
              className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-ink-50/70"
            >
              {status === 'done' && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
              )}
              {status === 'progress' && (
                <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                  <span className="absolute h-5 w-5 animate-ping rounded-full bg-iris-400/40" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-iris-500" />
                </span>
              )}
              {status === 'pending' && (
                <Circle className="h-5 w-5 shrink-0 text-ink-300" />
              )}
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium ${
                    status === 'done' ? 'text-ink-500 line-through' : 'text-ink-900'
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
          )
        })}
      </ul>
    </div>
  )
}

type CardStatus = 'progress' | 'pending' | 'done'
const projectMeta: { status: CardStatus; steps: number; done: number }[] = [
  { status: 'progress', steps: 5, done: 2 },
  { status: 'progress', steps: 7, done: 4 },
  { status: 'pending', steps: 4, done: 0 },
  { status: 'done', steps: 9, done: 9 },
]

export function ProjectsMockup({ className = '' }: { className?: string }) {
  const t = useT()
  const p = t.mockup.projects

  const badgeFor: Record<CardStatus, { label: string; cls: string }> = {
    progress: {
      label: p.statusInProgress,
      cls: 'bg-iris-50 text-iris-700 ring-iris-100',
    },
    pending: {
      label: p.statusPending,
      cls: 'bg-ink-100 text-ink-600 ring-ink-200',
    },
    done: {
      label: p.statusDone,
      cls: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    },
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_80px_-20px_rgba(10,10,9,0.25)] ring-1 ring-ink-200/80 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-ink-200/70 px-5 py-4">
        <p className="text-base font-medium text-ink-950">{p.title}</p>
        <span className="rounded-full bg-ink-100 px-2.5 py-1 font-mono text-[11px] text-ink-700">
          {p.active}
        </span>
      </div>
      <ul className="divide-y divide-ink-100">
        {p.cards.map((c, i) => {
          const meta = projectMeta[i]
          const pct = Math.round((meta.done / meta.steps) * 100)
          const badge = badgeFor[meta.status]
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
                      {meta.done}/{meta.steps}
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
                    meta.status === 'done'
                      ? 'bg-emerald-500'
                      : meta.status === 'progress'
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
