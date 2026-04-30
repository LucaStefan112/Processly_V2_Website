import Container from '../components/Container'
import Logo from '../components/Logo'
import { useT } from '../i18n'

export default function Footer() {
  const t = useT()
  const year = new Date().getFullYear()

  const groups = [
    {
      title: t.footer.groups.product,
      links: [
        { href: '#features', label: t.footer.links.features },
        { href: '#how-it-works', label: t.footer.links.howItWorks },
        { href: '#use-cases', label: t.footer.links.useCases },
        { href: '#architecture', label: t.footer.links.architecture },
      ],
    },
    {
      title: t.footer.groups.company,
      links: [
        { href: '#cta', label: t.footer.links.getStarted },
        { href: '#', label: t.footer.links.about },
        { href: '#', label: t.footer.links.contact },
      ],
    },
    {
      title: t.footer.groups.resources,
      links: [
        { href: '#', label: t.footer.links.documentation },
        { href: '#', label: t.footer.links.changelog },
        { href: '#', label: t.footer.links.privacy },
      ],
    },
  ]

  return (
    <footer className="relative border-t border-ink-200/80 bg-ink-50">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-600">
              {t.footer.blurb}
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
          <p>{t.footer.copyright(year)}</p>
          <p className="font-mono text-xs tracking-tight text-ink-400">
            {t.footer.tagline}
          </p>
        </div>
      </Container>
    </footer>
  )
}
