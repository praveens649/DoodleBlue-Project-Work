import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { PageContainer } from '../../../components/layout/PageContainer'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { useAppSelector } from '../../../store/hooks'
import { clearCart } from '../cartSlice'
import { selectCartItemCount, selectCartItems, selectCartShipping, selectCartSubtotal, selectCartTotal } from '../cartSelectors'
import { formatCurrency } from '../../../utils/formatCurrency'

function CheckoutSummary({ itemCount, subtotal, shipping, total }) {
  return (
    <aside className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6" aria-labelledby="checkout-summary-heading">
      <h2 id="checkout-summary-heading" className="font-heading text-2xl font-extrabold text-ink">Order summary</h2>
      <dl className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between gap-4 text-muted"><dt>Items ({itemCount})</dt><dd className="font-bold text-ink">{formatCurrency(subtotal)}</dd></div>
        <div className="flex justify-between gap-4 text-muted"><dt>Shipping</dt><dd className={`font-bold ${shipping === 0 ? 'text-success' : 'text-ink'}`}>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</dd></div>
      </dl>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
        <span className="font-bold text-ink">Total</span>
        <span className="text-2xl font-extrabold text-brand">{formatCurrency(total)}</span>
      </div>
      <p className="mt-5 flex items-center gap-2 text-xs text-success"><LockKeyhole size={15} aria-hidden="true" /> Secure checkout for this demo</p>
    </aside>
  )
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useAppSelector(selectCartItems)
  const itemCount = useAppSelector(selectCartItemCount)
  const subtotal = useAppSelector(selectCartSubtotal)
  const shipping = useAppSelector(selectCartShipping)
  const total = useAppSelector(selectCartTotal)
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', postalCode: '' })
  const [submitted, setSubmitted] = useState(false)

  if (items.length === 0 && !submitted) {
    return (
      <PageContainer>
        <div className="rounded-2xl border border-border bg-white p-8 text-center">
          <h1 className="page-title text-3xl">Your cart is empty</h1>
          <p className="page-intro mx-auto">Add products before starting checkout.</p>
          <Button to="/" className="mt-6">Browse products</Button>
        </div>
      </PageContainer>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    const orderId = `SK-${Date.now().toString(36).toUpperCase()}`
    dispatch(clearCart())
    navigate('/purchase-success', { replace: true, state: { orderId, email: form.email, total, itemCount } })
  }

  return (
    <PageContainer>
      <div className="mb-8">
        <p className="eyebrow">Secure checkout</p>
        <h1 className="page-title mb-2">Complete your purchase</h1>
        <p className="page-intro">Enter your delivery details to place this demo order.</p>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-heading text-2xl font-extrabold text-ink">Delivery details</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Input label="Full name" name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
            <Input label="Email address" name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
            <div className="sm:col-span-2"><Input label="Street address" name="address" value={form.address} onChange={handleChange} required autoComplete="street-address" /></div>
            <Input label="City" name="city" value={form.city} onChange={handleChange} required autoComplete="address-level2" />
            <Input label="Postal code" name="postalCode" value={form.postalCode} onChange={handleChange} required autoComplete="postal-code" />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button type="submit">Place order</Button>
            <Link to="/cart" className="text-sm font-bold text-brand hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">Back to cart</Link>
          </div>
          <p className="mt-4 text-xs text-muted">This assessment flow does not collect payment information or process a real transaction.</p>
        </form>
        <CheckoutSummary itemCount={itemCount} subtotal={subtotal} shipping={shipping} total={total} />
      </div>
    </PageContainer>
  )
}
