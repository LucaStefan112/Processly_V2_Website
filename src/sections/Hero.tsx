import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Container from '../components/Container'
import Button from '../components/Button'
import { EditorMockup } from '../components/ProcessMockup'
import { useT } from '../i18n'

export default function Hero() {
  const t = useT()
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 sm:pt-40"
      aria-label="Introduction"
    >
      {/* Soft liquid blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-32 top-10 h-[420px] w-[420px] animate-liquid bg-iris-200/45 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -right-24 top-40 h-[380px] w-[380px] animate-liquid bg-emerald-200/35 blur-3xl"
          aria-hidden
          style={{ animationDelay: '-7s' }}
        />
      </div>

      {/* Subtle background grid behind hero */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-grid-fade" aria-hidden />

      <Container size="wide">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium tracking-tight text-ink-700 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-iris-500" />
            <span>{t.hero.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance text-[clamp(2.6rem,7vw,5.4rem)] font-medium leading-[0.98] tracking-tightest text-ink-950"
          >
            {t.hero.titleA}
            <br />
            <span className="font-serif italic font-normal text-iris-600">
              {t.hero.titleB}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-ink-600 sm:text-lg"
          >
            {t.hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button as="a" href="#how-it-works" variant="primary" size="lg" withArrow>
              {t.hero.ctaPrimary}
            </Button>
            <Button as="a" href="#features" variant="secondary" size="lg">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </div>

        {/* Hero visual — editor mockup with live DAG */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-5xl sm:mt-24"
        >
          <div
            className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-b from-iris-100/60 to-transparent blur-2xl"
            aria-hidden
          />
          <EditorMockup />
        </motion.div>
      </Container>
    </section>
  )
}
