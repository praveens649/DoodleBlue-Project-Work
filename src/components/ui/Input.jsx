import React from 'react'

export function Input({ label, error, id, className = '', ...props }) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="mb-2 block text-sm font-bold text-ink">{label}</label>}
      <input id={inputId} className={`h-11 w-full rounded-[10px] border border-border px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-70 ${className}`} {...props} />
      {error && <p className="mt-1 text-sm text-red-700" role="alert">{error}</p>}
    </div>
  )
}
