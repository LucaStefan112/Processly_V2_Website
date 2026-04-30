import { motion } from 'framer-motion'
import { Handshake, UserCheck, CalendarRange, Building2 } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

const cases = [
  {
    icon: Handshake,
    title: 'Customer onboarding',
    body: 'Same twelve steps, every new account. Generate one project per customer; let the team pick up exactly where the last one left off.',
    tags: ['Sales → Onboarding → Success'],
  },
  {
    icon: UserCheck,
    title: 'Hiring & approvals',
    body: 'Every requisition needs the same five sign-offs. Make them happen automatically, in the right order, with the right people.',
    tags: ['Manager · Recruiter · Director'],
  },
  {
    icon: CalendarRange,
    title: 'Recurring operations',
    body: 'End-of-month closes, weekly QA passes, quarterly reviews. Set the recurrence; Processly generates the next project on schedule.',
    tags: ['Daily · Weekly · Monthly'],
  },
  {
    icon: Building2,
    title: 'Cross-team handoffs',
    body: 'When work leaves your team, it shouldn’t leave the system. Each team sees only the steps they own — context is never lost in translation.',
    tags: ['Public read-only sharing'],
  },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="Use cases"
          title={
            <>
              The work this is{' '}
              <br className="hidden sm:block" />
              built to absorb.
            </>
          }
          description="Anywhere the same playbook runs more than twice, Processly earns its keep."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.08)}
          className="mt-16 grid gap-5 md:grid-cols-2"
        >
          {cases.map(({ icon: Icon, title, body, tags }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group relative flex flex-col rounded-2xl bg-white p-8 ring-1 ring-ink-200/80 transition-all duration-500 hover:-translate-y-1 hover:ring-ink-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-iris-50 text-iris-600 ring-1 ring-iris-100 transition-transform duration-500 group-hover:rotate-[-6deg]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-ink-100 px-2.5 py-1 font-mono text-[11px] text-ink-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="mt-6 text-xl font-medium tracking-tight text-ink-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
