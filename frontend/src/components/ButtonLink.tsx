import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Tone = 'primary' | 'secondary'

interface InternalButtonLinkProps {
  children: ReactNode
  className?: string
  to: string
  tone?: Tone
}

interface ExternalButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  className?: string
  href: string
  tone?: Tone
}

export function ButtonLink({ children, className = '', to, tone = 'primary' }: InternalButtonLinkProps) {
  return <Link className={`button ${tone} ${className}`.trim()} to={to}>{children}</Link>
}

export function ExternalButtonLink({ children, className = '', href, tone = 'primary', ...attributes }: ExternalButtonLinkProps) {
  return <a className={`button ${tone} ${className}`.trim()} href={href} {...attributes}>{children}</a>
}
