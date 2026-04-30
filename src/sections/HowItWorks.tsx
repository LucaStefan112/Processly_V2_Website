import { motion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

const steps = [
  {
    n: '01',
    title: 'Design',
    body: 'Sketch your workflow on a visual canvas. Each step is a node; connect them however your team actually works — branches, joins, parallel paths welcome.',
  },
  {
    n: '02',
    title: 'Define',
    body: 'For each step, declare the fields it collects, who is responsible, and roughly how long it takes. The schema becomes your source of truth.',
  },
  {
    n: '03',
    title: 'Generate',
    body: 'When the work needs to happen, generate a project. Once. On demand. Or on a recurring schedule that respects working hours.',
  },
  {
    n: '04',
    title: 'Run',
    body: 'Each project tracks its own state. Steps cascade automatically. Owners get pinged. Field values flow downstream. Everyone sees what is next.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-ink-950 py-24 text-ink-50 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
        aria-hidden
      />

      <Container size="wide">
        <SectionHeading
          tone="dark"
          eyebrow="How it works"
          title={
            <>
              Four steps to make{' '}
              <br className="hidden sm:block" />
              work repeatable.
            </>
          }
          description="It is the same loop every time: design, define, generate, run. Once you have done it once, every future instance is a click."
        />

        <div className="relative mt-16">
          {/* Connecting gradient line on lg+ — aligned with the 01/02/03/04 numbers */}
          <div
            className="pointer-events-none absolute left-8 right-8 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-iris-400/40 to-transparent lg:block"
            aria-hidden
          />

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger(0.1)}
            className="grid gap-px overflow-hidden rounded-2xl bg-ink-800/80 ring-1 ring-ink-800 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((s) => (
              <motion.li
                key={s.n}
                variants={fadeUp}
                className="relative flex flex-col bg-ink-950 p-7 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-widest text-iris-300">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-ink-800" />
                </div>
                <h3 className="mt-6 text-2xl font-medium leading-tight tracking-tight text-ink-50">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {s.body}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  )
}
