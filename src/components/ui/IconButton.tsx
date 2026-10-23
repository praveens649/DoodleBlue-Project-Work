import type { ButtonHTMLAttributes, ComponentType } from 'react'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  label: string
}

export function IconButton({ icon: Icon, label, className = '', ...props }: IconButtonProps) {
  return <button type="button" aria-label={label} className={`rounded-lg p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300 disabled:opacity-50 ${className}`} {...props}><Icon size={20} strokeWidth={2} /></button>
}
