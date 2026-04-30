import { motion } from 'framer-motion'
import { ArrowDownToLine, GitFork, History } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

const items = [
  {
    icon: ArrowDownToLine,
    title: 'Cascading transitions',
    body: 'Start a project — root steps start. Finish a step — the next ones begin. Hold or cancel propagates downstream automatically.',
    code: 'on(stepCompleted) → startEligibleSuccessors()',
  },
  {
    icon: GitFork,
    title: 'Conditional starts',
    body: 'Mark a step "wait until everything upstream is done" — or "start manually" when human judgment is required before the gate opens.',
    code: 'step.requireUpstreamComplete = true',
  },
  {
    icon: History,
    title: 'Live audit trail',
    body: 'Every status change and every field edit is logged with timestamp and actor. Compliance gets the receipts; the team gets the history.',
    code: 'log: actor · field · before → after',
  },
]

export default function Architecture() {
  return (
    <section
      id="architecture"
      className="relative overflow-hidden border-y border-ink-200/80 bg-ink-50/70 py-24 sm:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-grid-fade opacity-60" aria-hidden />

      <Container size="wide">
        <SectionHeading
          eyebrow="Under the hood"
          title={
            <>
              Status that flows{' '}
              <br className="hidden sm:block" />
              by itself.
            </>
          }
          description="Processly behaves less like a checklist and more like a small runtime. Steps obey rules; the engine moves work along so people don’t have to."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {items.map(({ icon: Icon, title, body, code }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex flex-col rounded-2xl bg-white p-7 ring-1 ring-ink-200/80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-950 text-ink-50">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-lg font-medium tracking-tight text-ink-950">
                {title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                {body}
              </p>
              <pre className="mt-6 overflow-x-auto rounded-lg bg-ink-950 px-3.5 py-2.5 font-mono text-[11px] leading-relaxed text-ink-200">
                <code>{code}</code>
              </pre>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
