import { motion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import {
  DashboardMockup,
  ProjectsMockup,
} from '../components/ProcessMockup'
import { useT } from '../i18n'

export default function Showcase() {
  const t = useT()
  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow={t.showcase.eyebrow}
          title={
            <>
              {t.showcase.titleA}{' '}
              <br className="hidden sm:block" />
              {t.showcase.titleB}
            </>
          }
          description={t.showcase.description}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.14)}
          className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-10"
        >
          <motion.figure variants={fadeUp} className="space-y-5">
            <DashboardMockup />
            <figcaption className="px-1 text-sm leading-relaxed text-ink-600">
              <span className="font-medium text-ink-900">{t.showcase.caption1Lead}</span>{' '}
              {t.showcase.caption1}
            </figcaption>
          </motion.figure>

          <motion.figure variants={fadeUp} className="space-y-5">
            <ProjectsMockup />
            <figcaption className="px-1 text-sm leading-relaxed text-ink-600">
              <span className="font-medium text-ink-900">{t.showcase.caption2Lead}</span>{' '}
              {t.showcase.caption2}
            </figcaption>
          </motion.figure>
        </motion.div>
      </Container>
    </section>
  )
}
