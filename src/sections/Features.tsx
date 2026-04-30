import { motion } from 'framer-motion'
import {
  Workflow,
  Zap,
  Users,
  GitBranchPlus,
  CalendarClock,
  Clock4,
  ArrowRightCircle,
  Globe2,
} from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

const features = [
  {
    icon: Workflow,
    title: 'Visual DAG editor',
    body: 'Drag, drop, connect. Steps are nodes; dependencies are edges. No flat checklists pretending to be workflows.',
    accent: 'iris',
  },
  {
    icon: Zap,
    title: 'One-click projects',
    body: 'Generate turns any process into a live, state-tracked instance — fields, owners, deadlines, and all.',
    accent: 'emerald',
  },
  {
    icon: Users,
    title: 'RACI involvements',
    body: 'Responsible, Support, Informed. Assign people, teams, or functional roles at every step.',
    accent: 'iris',
  },
  {
    icon: GitBranchPlus,
    title: 'Sub-processes',
    body: 'A step can invoke another process. Nest workflows like functions; complex playbooks compose cleanly.',
    accent: 'iris',
  },
  {
    icon: CalendarClock,
    title: 'Recurring schedules',
    body: 'Daily, weekly, monthly. Processly spins up the next project automatically — the work shows up on its own.',
    accent: 'emerald',
  },
  {
    icon: Clock4,
    title: 'Working-hours deadlines',
    body: 'Deadlines respect your team’s schedule — Mon–Fri, 9–5, your time zone — not 24/7 wall-clock time.',
    accent: 'iris',
  },
  {
    icon: ArrowRightCircle,
    title: 'Field hand-offs',
    body: 'Mark a field as output and it appears upstream on the next step’s page — no re-typing across teams.',
    accent: 'emerald',
  },
  {
    icon: Globe2,
    title: 'Public read-only links',
    body: 'Share a project’s status with a client or partner without giving them access to your tools.',
    accent: 'iris',
  },
]

const accentMap: Record<'iris' | 'emerald', { bg: string; fg: string }> = {
  iris: {
    bg: 'bg-iris-50 ring-iris-100',
    fg: 'text-iris-600',
  },
  emerald: {
    bg: 'bg-emerald-50 ring-emerald-100',
    fg: 'text-emerald-600',
  },
}

export default function Features() {
  return (
    <section id="features" className="relative bg-white py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Eight ideas that change{' '}
              <br className="hidden sm:block" />
              how repeatable work runs.
            </>
          }
          description="Each feature exists because the alternative is a meeting, a spreadsheet, or a Slack message that nobody reads."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.06)}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-ink-200/70 ring-1 ring-ink-200/80 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map(({ icon: Icon, title, body, accent }) => {
            const a = accentMap[accent as 'iris' | 'emerald']
            return (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group relative flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-ink-50/70"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${a.bg}`}
                >
                  <Icon className={`h-5 w-5 ${a.fg}`} />
                </div>
                <h3 className="mt-6 text-base font-medium tracking-tight text-ink-950">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  {body}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
