import { useI18n } from '../i18n'

type Tone = 'light' | 'dark'

export default function LanguageToggle({
  className = '',
  tone = 'light',
}: {
  className?: string
  tone?: Tone
}) {
  const { lang, setLang, t } = useI18n()
  const isDark = tone === 'dark'

  const base =
    'flex items-center rounded-full p-0.5 text-xs font-medium ring-1 transition-colors'
  const wrap = isDark
    ? 'bg-ink-900/60 ring-ink-700'
    : 'bg-white/70 ring-ink-200'

  const activeCls = isDark
    ? 'bg-ink-50 text-ink-950'
    : 'bg-ink-950 text-ink-50'
  const inactiveCls = isDark
    ? 'text-ink-300 hover:text-ink-50'
    : 'text-ink-600 hover:text-ink-950'

  const btn = (active: boolean) =>
    `rounded-full px-2.5 py-1 transition-colors ${active ? activeCls : inactiveCls}`

  return (
    <div
      role="group"
      aria-label={t.common.switchLanguage}
      className={`${base} ${wrap} ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={btn(lang === 'en')}
      >
        {t.common.languageEN}
      </button>
      <button
        type="button"
        onClick={() => setLang('ro')}
        aria-pressed={lang === 'ro'}
        className={btn(lang === 'ro')}
      >
        {t.common.languageRO}
      </button>
    </div>
  )
}
