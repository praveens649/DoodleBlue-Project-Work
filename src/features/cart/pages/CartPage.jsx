import React from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { PageContainer } from '../../../components/layout/PageContainer'
import { Button } from '../../../components/ui/Button'
import { useAppSelector } from '../../../store/hooks'
import { decrementQuantity, incrementQuantity, removeFromCart, clearCart } from '../cartSlice'
import { selectCartItemCount, selectCartItems, selectCartShipping, selectCartSubtotal, selectCartTotal } from '../cartSelectors'
import { CartSummary } from '../components/CartSummary'
import { formatCurrency } from '../../../utils/formatCurrency'

function CartQuantityStepper({ item }) {
  const dispatch = useDispatch()
  const productId = item.product?.id
  const title = item.product?.title || 'product'

  return (
    <div className="inline-flex h-10 items-center rounded-lg border border-border bg-white">
      <button type="button" onClick={() => dispatch(decrementQuantity(productId))} className="inline-flex h-full w-9 items-center justify-center rounded-l-lg text-ink hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand" aria-label={`Decrease quantity for ${title}`}>
        <Minus size={16} aria-hidden="true" />
      </button>
      <span className="min-w-8 text-center text-sm font-bold" aria-live="polite">{item.quantity}</span>
      <button type="button" onClick={() => dispatch(incrementQuantity(productId))} className="inline-flex h-full w-9 items-center justify-center rounded-r-lg text-ink hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand" aria-label={`Increase quantity for ${title}`}>
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-border bg-white px-6 py-14 text-center shadow-sm">
      <span className="mb-5 flex size-16 items-center justify-center rounded-full bg-orange-50 text-brand">
        <ShoppingCart size={30} aria-hidden="true" />
      </span>
      <h1 className="page-title text-3xl">Your cart is empty</h1>
      <p className="page-intro">Browse our products and add something you love to your shopping cart.</p>
      <Button to="/" className="mt-7">Browse products</Button>
    </div>
  )
}

export function CartPage() {
  const dispatch = useDispatch()
  const items = useAppSelector(selectCartItems)
  const itemCount = useAppSelector(selectCartItemCount)
  const subtotal = useAppSelector(selectCartSubtotal)
  const shipping = useAppSelector(selectCartShipping)
  const total = useAppSelector(selectCartTotal)

  if (items.length === 0) {
    return <PageContainer><p className="eyebrow">Your shopping bag</p><EmptyCart /></PageContainer>
  }

  return (
    <PageContainer>
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Your shopping bag</p>
          <h1 className="page-title mb-0">Your cart</h1>
        </div>
        <Link to="/" className="text-sm font-bold text-brand hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">Continue shopping</Link>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="space-y-4" aria-label="Cart items">
          {items.map((item) => {
            const product = item.product || {}
            const quantity = Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1
            const price = Number(product.price) || 0
            return (
              <article key={product.id} className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm sm:gap-5 sm:p-5">
                <Link to={`/product/${product.id}`} className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand sm:size-32" aria-label={`View ${product.title || 'product'}`}>
                  {product.image ? <img src={product.image} alt={product.title || 'Product'} className="h-full w-full object-contain" /> : <span className="text-xs text-muted">No image</span>}
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link to={`/product/${product.id}`} className="line-clamp-2 font-bold leading-6 text-ink hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">{product.title || 'Unnamed product'}</Link>
                      <p className="mt-1 text-sm capitalize text-muted">{product.category || 'Uncategorized'}</p>
                    </div>
                    <button type="button" onClick={() => dispatch(removeFromCart(product.id))} className="shrink-0 rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" aria-label={`Remove ${product.title || 'product'} from cart`}>
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted">Unit price</p>
                      <p className="font-bold text-brand">{formatCurrency(price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted">Line total</p>
                      <p className="font-bold text-ink">{formatCurrency(price * quantity)}</p>
                    </div>
                    <CartQuantityStepper item={{ ...item, quantity }} />
                  </div>
                </div>
              </article>
            )
          })}
        </section>
        <CartSummary itemCount={itemCount} subtotal={subtotal} shipping={shipping} total={total} onClear={() => dispatch(clearCart())} />
      </div>
    </PageContainer>
  )
}
