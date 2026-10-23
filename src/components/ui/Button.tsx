import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactElement } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; to?: never }
type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & { variant?: ButtonVariant; to: string }

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'bg-primary text-white hover:bg-slate-800',
  outline: 'border border-border bg-white text-ink hover:border-brand hover:text-brand',
  ghost: 'text-muted hover:bg-slate-100 hover:text-ink',
}

const base = 'inline-flex h-11 items-center justify-center rounded-[10px] px-5 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50'

export function Button(props: ButtonProps): ReactElement
export function Button(props: LinkButtonProps): ReactElement
export function Button(props: ButtonProps | LinkButtonProps) {
  if (props.to !== undefined) {
    return <LinkButton {...props} />
  }
  return <NativeButton {...props} />
}

function LinkButton({ variant = 'primary', className = '', to, ...props }: LinkButtonProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} to={to} {...props} />
}

function NativeButton({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
