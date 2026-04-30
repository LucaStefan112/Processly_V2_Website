import { motion } from 'framer-motion'
import { ArrowRight, Layers, Repeat2 } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { useT } from '../i18n'

export default function Solution() {
  const t = useT()
  return (
    <section id="solution" className="relative py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow={t.solution.eyebrow}
          title={
            <>
              {t.solution.titleA}{' '}
              <br className="hidden sm:block" />
              {t.solution.titleB}
            </>
          }
          description={t.solution.description}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.12)}
          className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-10"
        >
          {/* Process card */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl bg-ink-950 p-8 text-ink-50 sm:p-10"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0)',
                backgroundSize: '22px 22px',
              }}
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-iris-300">
                <Layers className="h-4 w-4" />
                {t.solution.processLabel}
              </div>
              <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                {t.solution.processTitle}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-300">
                {t.solution.processBody}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {t.solution.processSteps.map((s, i) => (
                  <div
                    key={s}
                    className="rounded-xl border border-ink-700 bg-ink-900/60 px-3 py-2.5 text-xs text-ink-200"
                  >
                    <span className="font-mono text-[10px] text-ink-500">
                      0{i + 1}
                    </span>
                    <p className="mt-1 font-medium tracking-tight">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Project card */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-ink-200 sm:p-10"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-iris-600">
              <Repeat2 className="h-4 w-4" />
              {t.solution.projectLabel}
            </div>
            <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-ink-950 sm:text-3xl">
              {t.solution.projectTitle}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
              {t.solution.projectBody}
            </p>

            <ul className="mt-8 space-y-3">
              {t.solution.callouts.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 text-sm text-ink-700"
                >
                  <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Connecting tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="mt-10 flex items-center justify-center gap-3 text-center font-mono text-xs uppercase tracking-[0.16em] text-ink-500"
        >
          <span>{t.solution.flowProcess}</span>
          <ArrowRight className="h-3.5 w-3.5" />
          <span className="text-ink-950">{t.solution.flowGenerate}</span>
          <ArrowRight className="h-3.5 w-3.5" />
          <span>{t.solution.flowProject}</span>
        </motion.p>
      </Container>
    </section>
  )
}
