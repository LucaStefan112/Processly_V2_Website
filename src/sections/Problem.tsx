import { motion } from 'framer-motion'
import { FileWarning, MessagesSquare, EyeOff } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

const items = [
  {
    icon: MessagesSquare,
    title: 'Tribal knowledge',
    body: 'Workflows live in someone’s head, not in a system. New hires re-discover them every quarter, and the steps quietly drift over time.',
  },
  {
    icon: FileWarning,
    title: 'Diffuse accountability',
    body: 'When everyone is CC’d, no one is responsible. Steps stall waiting on owners that were never explicitly named.',
  },
  {
    icon: EyeOff,
    title: 'Invisible progress',
    body: 'You can’t see which projects are on track without asking three people across three tools. Status is always one Slack thread away.',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="The problem"
          title={
            <>
              Work that repeats{' '}
              <br className="hidden sm:block" />
              deserves a system.
            </>
          }
          description="Most teams run the same playbook every week, but track it in a patchwork of docs, spreadsheets, and DMs. The system of record is whoever happens to remember."
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-3"
        >
          {items.map(({ icon: Icon, title, body }) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="group relative flex flex-col rounded-2xl bg-white p-7 ring-1 ring-ink-200/80 transition-all duration-500 hover:-translate-y-1 hover:ring-ink-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-ink-50 transition-transform duration-500 group-hover:rotate-[-4deg]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-lg font-medium tracking-tight text-ink-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
