import { motion } from 'framer-motion'
import Container from '../components/Container'
import Button from '../components/Button'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <Container size="wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.08)}
          className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-20 text-center text-ink-50 sm:px-10 sm:py-24"
        >
          {/* Liquid blob accent */}
          <div
            className="pointer-events-none absolute -bottom-20 left-1/2 h-[520px] w-[520px] -translate-x-1/2 animate-liquid bg-iris-500/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0)',
              backgroundSize: '24px 24px',
              maskImage:
                'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-3xl">
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium uppercase tracking-[0.18em] text-iris-300"
            >
              Make work repeatable
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-[56px]"
            >
              Spin up your first process.
              <br />
              <span className="font-serif italic font-normal text-iris-300">
                Watch the rest run itself.
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-300"
            >
              Sketch a workflow, generate your first project, and let
              Processly handle deadlines, owners, and status from there.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button as="a" href="#" variant="invert" size="lg" withArrow>
                Get started
              </Button>
              <Button as="a" href="#features" variant="subtle" size="lg">
                Read the docs
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
