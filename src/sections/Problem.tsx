import { motion } from 'framer-motion'
import { FileWarning, MessagesSquare, EyeOff } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { useT } from '../i18n'

const icons = [MessagesSquare, FileWarning, EyeOff] as const

export default function Problem() {
  const t = useT()
  return (
    <section id="problem" className="relative py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow={t.problem.eyebrow}
          title={
            <>
              {t.problem.titleA}{' '}
              <br className="hidden sm:block" />
              {t.problem.titleB}
            </>
          }
          description={t.problem.description}
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-3"
        >
          {t.problem.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className="group relative flex flex-col rounded-2xl bg-white p-7 ring-1 ring-ink-200/80 transition-all duration-500 hover:-translate-y-1 hover:ring-ink-300"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-ink-50 transition-transform duration-500 group-hover:rotate-[-4deg]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-medium tracking-tight text-ink-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.body}</p>
              </motion.li>
            )
          })}
        </motion.ul>
      </Container>
    </section>
  )
}
