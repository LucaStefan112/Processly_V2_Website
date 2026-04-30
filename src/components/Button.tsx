import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'invert' | 'subtle'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-ink-950 text-ink-50 hover:bg-ink-800 shadow-[0_8px_30px_-12px_rgba(10,10,9,0.45)] hover:shadow-[0_12px_40px_-12px_rgba(10,10,9,0.55)] hover:-translate-y-0.5',
  secondary:
    'bg-ink-50 text-ink-900 ring-1 ring-ink-200 hover:bg-white hover:ring-ink-300',
  ghost:
    'text-ink-700 hover:text-ink-950 hover:bg-ink-100/70',
  // For use on dark sections — light pill, dark text.
  invert:
    'bg-ink-50 text-ink-950 hover:bg-white shadow-[0_8px_30px_-12px_rgba(255,255,255,0.18)] hover:-translate-y-0.5',
  // Ghost equivalent for dark sections — light text, faint hover bg.
  subtle:
    'text-ink-200 hover:text-ink-50 hover:bg-ink-900/70',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-[15px]',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  withArrow?: boolean
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

export default function Button(props: ButtonProps | AnchorProps) {
  const {
    variant = 'primary',
    size = 'md',
    withArrow = false,
    className = '',
    children,
    ...rest
  } = props as CommonProps & Record<string, unknown> & { className?: string }

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  if ((props as AnchorProps).as === 'a') {
    const { as: _as, ...anchorRest } = rest as Record<string, unknown>
    void _as
    return (
      <a className={cls} {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    )
  }

  const { as: _as, ...buttonRest } = rest as Record<string, unknown>
  void _as
  return (
    <button className={cls} {...(buttonRest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  )
}
