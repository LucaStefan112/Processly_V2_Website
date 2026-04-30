import { motion } from 'framer-motion'
import { Handshake, UserCheck, CalendarRange, Building2 } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { useT } from '../i18n'

const icons = [Handshake, UserCheck, CalendarRange, Building2] as const

export default function UseCases() {
  const t = useT()
  return (
    <section id="use-cases" className="relative py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow={t.useCases.eyebrow}
          title={
            <>
              {t.useCases.titleA}{' '}
              <br className="hidden sm:block" />
              {t.useCases.titleB}
            </>
          }
          description={t.useCases.description}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.08)}
          className="mt-16 grid gap-5 md:grid-cols-2"
        >
          {t.useCases.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group relative flex flex-col rounded-2xl bg-white p-8 ring-1 ring-ink-200/80 transition-all duration-500 hover:-translate-y-1 hover:ring-ink-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-iris-50 text-iris-600 ring-1 ring-iris-100 transition-transform duration-500 group-hover:rotate-[-6deg]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <span className="rounded-full bg-ink-100 px-2.5 py-1 font-mono text-[11px] text-ink-600">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-medium tracking-tight text-ink-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
