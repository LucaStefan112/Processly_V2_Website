import Container from '../components/Container'
import { useT } from '../i18n'

export default function Trust() {
  const t = useT()
  const tokens = t.trust.tokens
  return (
    <section className="border-y border-ink-200/70 bg-ink-50/60 py-12 sm:py-16">
      <Container size="wide">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-ink-500">
          {t.trust.eyebrow}
        </p>
        <div
          className="relative mt-7 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div className="flex w-max animate-marquee gap-3">
            {[...tokens, ...tokens].map((tok, i) => (
              <span
                key={`${tok}-${i}`}
                className="whitespace-nowrap rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700"
              >
                {tok}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
