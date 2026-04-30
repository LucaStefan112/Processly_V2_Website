import Container from '../components/Container'
import Logo from '../components/Logo'

const groups = [
  {
    title: 'Product',
    links: [
      { href: '#features', label: 'Features' },
      { href: '#how-it-works', label: 'How it works' },
      { href: '#use-cases', label: 'Use cases' },
      { href: '#architecture', label: 'Architecture' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '#cta', label: 'Get started' },
      { href: '#', label: 'About' },
      { href: '#', label: 'Contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '#', label: 'Documentation' },
      { href: '#', label: 'Changelog' },
      { href: '#', label: 'Privacy' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-ink-200/80 bg-ink-50">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-600">
              The visual operating system for repeatable work. Design a
              process once, generate projects from it as many times as you
              need — with full ownership, deadlines, and history baked in.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  {g.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-ink-700 transition-colors hover:text-ink-950"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink-200/80 pt-8 text-sm text-ink-500 sm:flex-row sm:items-center">
          <p>© {year} Processly. All rights reserved.</p>
          <p className="font-mono text-xs tracking-tight text-ink-400">
            Designed for teams who orchestrate work like code.
          </p>
        </div>
      </Container>
    </footer>
  )
}
