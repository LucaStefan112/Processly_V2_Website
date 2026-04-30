import { motion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { useT } from '../i18n'

export default function Benefits() {
  const t = useT()
  return (
    <section id="benefits" className="relative py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow={t.benefits.eyebrow}
          title={
            <>
              {t.benefits.titleA}{' '}
              <br className="hidden sm:block" />
              {t.benefits.titleB}
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
          {t.benefits.items.map((s) => (
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
