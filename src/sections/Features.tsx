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
import { useT } from '../i18n'

type Accent = 'iris' | 'emerald'

const meta: { icon: typeof Workflow; accent: Accent }[] = [
  { icon: Workflow, accent: 'iris' },
  { icon: Zap, accent: 'emerald' },
  { icon: Users, accent: 'iris' },
  { icon: GitBranchPlus, accent: 'iris' },
  { icon: CalendarClock, accent: 'emerald' },
  { icon: Clock4, accent: 'iris' },
  { icon: ArrowRightCircle, accent: 'emerald' },
  { icon: Globe2, accent: 'iris' },
]

const accentMap: Record<Accent, { bg: string; fg: string }> = {
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
  const t = useT()
  return (
    <section id="features" className="relative bg-white py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow={t.features.eyebrow}
          title={
            <>
              {t.features.titleA}{' '}
              <br className="hidden sm:block" />
              {t.features.titleB}
            </>
          }
          description={t.features.description}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.06)}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-ink-200/70 ring-1 ring-ink-200/80 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.features.items.map((item, i) => {
            const { icon: Icon, accent } = meta[i]
            const a = accentMap[accent]
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group relative flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-ink-50/70"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${a.bg}`}
                >
                  <Icon className={`h-5 w-5 ${a.fg}`} />
                </div>
                <h3 className="mt-6 text-base font-medium tracking-tight text-ink-950">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  {item.body}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
