type Props = {
  className?: string
  variant?: 'dark' | 'light'
}

export default function Logo({ className = '', variant = 'dark' }: Props) {
  const fg = variant === 'dark' ? 'text-ink-950' : 'text-ink-50'
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 32 32"
        aria-hidden
        className="shrink-0"
      >
        <circle cx="9" cy="9" r="3" fill="#5B5BD6" />
        <circle cx="23" cy="9" r="3" fill="currentColor" className={fg} />
        <circle cx="16" cy="22" r="3" fill="#10B981" />
        <path
          d="M9 12 L16 19 M23 12 L16 19"
          stroke="currentColor"
          className={fg}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
      <span className={`text-[17px] font-semibold tracking-tight ${fg}`}>
        Processly
      </span>
    </div>
  )
}
