import Container from '../components/Container'

const tokens = [
  'Customer onboarding',
  'Hiring & approvals',
  'Compliance reviews',
  'Vendor renewals',
  'QA workflows',
  'Monthly closes',
  'Incident playbooks',
  'Procurement intake',
]

export default function Trust() {
  return (
    <section className="border-y border-ink-200/70 bg-ink-50/60 py-12 sm:py-16">
      <Container size="wide">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-ink-500">
          Built for the work that repeats
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
            {[...tokens, ...tokens].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="whitespace-nowrap rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
