import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

type Tone = 'light' | 'dark'

type Props = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: Tone
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
}: Props) {
  const isDark = tone === 'dark'
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(0.06)}
      className={`${alignment} max-w-2xl`}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className={`mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] ${
            isDark ? 'text-iris-300' : 'text-iris-600'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isDark ? 'bg-iris-300' : 'bg-iris-500'
            }`}
          />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className={`text-balance text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-[44px] ${
          isDark ? 'text-ink-50' : 'text-ink-950'
        }`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${
            isDark ? 'text-ink-300' : 'text-ink-600'
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
