import { motion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { useT } from '../i18n'

export default function HowItWorks() {
  const t = useT()
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
          eyebrow={t.how.eyebrow}
          title={
            <>
              {t.how.titleA}{' '}
              <br className="hidden sm:block" />
              {t.how.titleB}
            </>
          }
          description={t.how.description}
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
            {t.how.steps.map((s, i) => {
              const n = String(i + 1).padStart(2, '0')
              return (
                <motion.li
                  key={s.title}
                  variants={fadeUp}
                  className="relative flex flex-col bg-ink-950 p-7 sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs tracking-widest text-iris-300">
                      {n}
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
              )
            })}
          </motion.ol>
        </div>
      </Container>
    </section>
  )
}
