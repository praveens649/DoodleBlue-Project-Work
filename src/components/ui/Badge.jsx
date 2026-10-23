import React from 'react'

export function Badge({ variant = 'neutral', className = '', ...props }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${variant === 'accent' ? 'badge-accent' : 'bg-slate-100 text-muted'} ${className}`} {...props} />
}
