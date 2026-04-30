import { motion } from 'framer-motion'
import { ArrowDownToLine, GitFork, History } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { useT } from '../i18n'

const icons = [ArrowDownToLine, GitFork, History] as const

export default function Architecture() {
  const t = useT()
  return (
    <section
      id="architecture"
      className="relative overflow-hidden border-y border-ink-200/80 bg-ink-50/70 py-24 sm:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-grid-fade opacity-60" aria-hidden />

      <Container size="wide">
        <SectionHeading
          eyebrow={t.architecture.eyebrow}
          title={
            <>
              {t.architecture.titleA}{' '}
              <br className="hidden sm:block" />
              {t.architecture.titleB}
            </>
          }
          description={t.architecture.description}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {t.architecture.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex flex-col rounded-2xl bg-white p-7 ring-1 ring-ink-200/80"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-950 text-ink-50">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-medium tracking-tight text-ink-950">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                  {item.body}
                </p>
                <pre className="mt-6 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-ink-950 px-3.5 py-2.5 font-mono text-[11px] leading-relaxed text-ink-200">
                  <code>{item.code}</code>
                </pre>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
