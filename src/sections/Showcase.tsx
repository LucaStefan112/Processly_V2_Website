import { motion } from 'framer-motion'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import {
  DashboardMockup,
  ProjectsMockup,
} from '../components/ProcessMockup'

export default function Showcase() {
  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="Inside Processly"
          title={
            <>
              The same model,{' '}
              <br className="hidden sm:block" />
              wherever you look.
            </>
          }
          description="From the canvas to the dashboard to the read-only public link, Processly keeps a single shape: steps with status, owners, and history."
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
              <span className="font-medium text-ink-900">Project view.</span>{' '}
              The live timeline of a single instance — completed, in
              progress, and pending steps with their owners and deadlines.
            </figcaption>
          </motion.figure>

          <motion.figure variants={fadeUp} className="space-y-5">
            <ProjectsMockup />
            <figcaption className="px-1 text-sm leading-relaxed text-ink-600">
              <span className="font-medium text-ink-900">Projects index.</span>{' '}
              Everything currently running across your organisation, scoped
              to what each member is involved in.
            </figcaption>
          </motion.figure>
        </motion.div>
      </Container>
    </section>
  )
}
