import React from 'react'
import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'bg-primary text-white hover:bg-slate-800',
  outline: 'border border-border bg-white text-ink hover:border-brand hover:text-brand',
  ghost: 'text-muted hover:bg-slate-100 hover:text-ink',
}

const base = 'inline-flex h-11 items-center justify-center rounded-[10px] px-5 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50'

export function Button(props) {
  if (props.to !== undefined) return <LinkButton {...props} />
  return <NativeButton {...props} />
}

function LinkButton({ variant = 'primary', className = '', to, ...props }) {
  return <Link className={`${base} ${variants[variant]} ${className}`} to={to} {...props} />
}

function NativeButton({ variant = 'primary', className = '', ...props }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
