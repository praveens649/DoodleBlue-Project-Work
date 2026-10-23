import React from 'react'
import { Minus, Plus } from 'lucide-react'

export function QuantityStepper({ quantity, onDecrease, onIncrease, label }) {
  return (
    <div className="inline-flex h-10 items-center rounded-lg border border-border bg-white" aria-label={label}>
      <button
        type="button"
        className="inline-flex h-full w-9 items-center justify-center rounded-l-lg text-ink transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
        onClick={onDecrease}
        aria-label={`Remove one ${label}`}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <span className="min-w-8 text-center text-sm font-bold" aria-live="polite">{quantity}</span>
      <button
        type="button"
        className="inline-flex h-full w-9 items-center justify-center rounded-r-lg text-ink transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
        onClick={onIncrease}
        aria-label={`Add one ${label}`}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
