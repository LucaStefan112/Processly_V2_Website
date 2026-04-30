import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '../components/Container'
import Logo from '../components/Logo'
import Button from '../components/Button'
import LanguageToggle from '../components/LanguageToggle'
import { useT } from '../i18n'

export default function Nav() {
  const t = useT()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#problem', label: t.nav.problem },
    { href: '#solution', label: t.nav.solution },
    { href: '#features', label: t.nav.features },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#use-cases', label: t.nav.useCases },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ink-200/70 bg-ink-50/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between sm:h-[72px]">
          <a href="#top" className="flex items-center" aria-label={t.nav.home}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm text-ink-600 transition-colors hover:text-ink-950"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <Button as="a" href="#cta" variant="primary" size="sm" withArrow>
              {t.nav.getStarted}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-800 transition hover:bg-ink-100"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-ink-200/70 bg-ink-50/95 backdrop-blur-xl lg:hidden"
          >
            <Container size="wide" className="py-6">
              <nav className="flex flex-col gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base text-ink-800 transition hover:bg-ink-100"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-3">
                  <Button
                    as="a"
                    href="#cta"
                    variant="primary"
                    size="md"
                    withArrow
                    onClick={() => setOpen(false)}
                    className="w-full"
                  >
                    {t.nav.getStarted}
                  </Button>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
