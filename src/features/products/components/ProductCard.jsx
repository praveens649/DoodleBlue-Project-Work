import React from 'react'
import { Star } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { QuantityStepper } from './QuantityStepper'
import { formatCurrency } from '../../../utils/formatCurrency'

export function ProductCard({ product, quantity, onAdd, onDecrease, onIncrease }) {
  const rating = Number.isFinite(product.rating?.rate) ? product.rating.rate : null
  const reviewCount = Number.isInteger(product.rating?.count) ? product.rating.count : 0
  const category = product.category || 'Uncategorized'

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <a
        href={`/product/${product.id}`}
        to={`/product/${product.id}`}
        className="flex h-56 items-center justify-center bg-slate-50 p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
        aria-label={`View details for ${product.title}`}
      >
        <img
          src={product.image || undefined}
          alt={product.title}
          className="h-full w-full object-contain"
          onError={(event) => { event.currentTarget.style.visibility = 'hidden' }}
        />
      </a>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-3 w-fit rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold capitalize text-brand">{category}</span>
        <a
          href={`/product/${product.id}`}
          to={`/product/${product.id}`}
          className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-ink hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
        >
          {product.title}
        </a>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted">
          <Star size={16} className="fill-amber-400 text-amber-400" aria-hidden="true" />
          <span className="font-bold text-ink">{rating === null ? '—' : rating.toFixed(1)}</span>
          <span>({reviewCount} reviews)</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-xl font-extrabold text-brand">{formatCurrency(product.price)}</span>
          {quantity > 0 ? (
            <QuantityStepper
              quantity={quantity}
              label={product.title}
              onDecrease={() => onDecrease(product.id)}
              onIncrease={() => onIncrease(product.id)}
            />
          ) : (
            <Button type="button" variant="primary" onClick={() => onAdd(product)}>Add to cart</Button>
          )}
        </div>
      </div>
    </article>
  )
}
