import { motion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

const stats = [
  {
    value: 'Onboarding',
    label: 'as a working system',
    body: 'New hires inherit institutional knowledge by running the workflow, not by reading a wiki page that was last updated two reorgs ago.',
  },
  {
    value: 'Ownership',
    label: 'baked into every step',
    body: 'Every step has a name on it; every project has a responsible party. Accountability is structural, not aspirational.',
  },
  {
    value: 'Visibility',
    label: 'always on, by default',
    body: 'A live dashboard of everything running, everything late, and everything up next. No more cross-team status meetings.',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="Outcomes"
          title={
            <>
              What changes when{' '}
              <br className="hidden sm:block" />
              the work runs itself.
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-ink-200/70 ring-1 ring-ink-200/80 md:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.div
              key={s.value}
              variants={fadeUp}
              className="bg-white p-8 sm:p-10"
            >
              <p className="font-serif text-4xl italic leading-none text-iris-600 sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-3 text-sm font-medium tracking-tight text-ink-950">
                {s.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
