import React from 'react'
import { Button } from '../../../components/ui/Button'
import { formatCurrency } from '../../../utils/formatCurrency'

export function CartSummary({ itemCount, subtotal, shipping, total, onClear }) {
  return (
    <aside className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6" aria-labelledby="cart-summary-heading">
      <div className="flex items-center justify-between gap-4">
        <h2 id="cart-summary-heading" className="font-heading text-2xl font-extrabold text-ink">Order summary</h2>
        <button type="button" onClick={onClear} className="text-sm font-bold text-muted underline-offset-4 hover:text-brand hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">
          Clear cart
        </button>
      </div>
      <dl className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between gap-4 text-muted">
          <dt>Items ({itemCount})</dt>
          <dd className="font-bold text-ink">{formatCurrency(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4 text-muted">
          <dt>Shipping</dt>
          <dd className={`font-bold ${shipping === 0 ? 'text-success' : 'text-ink'}`}>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</dd>
        </div>
      </dl>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
        <span className="font-bold text-ink">Total</span>
        <span className="text-2xl font-extrabold text-brand">{formatCurrency(total)}</span>
      </div>
      <Button type="button" disabled className="mt-6 w-full">Checkout unavailable</Button>
      <p className="mt-3 text-center text-xs text-muted">Checkout is available in a future module.</p>
    </aside>
  )
}
