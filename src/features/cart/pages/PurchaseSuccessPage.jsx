import React from 'react'
import { CheckCircle2, PackageCheck } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { PageContainer } from '../../../components/layout/PageContainer'
import { Button } from '../../../components/ui/Button'
import { formatCurrency } from '../../../utils/formatCurrency'

export function PurchaseSuccessPage() {
  const location = useLocation()
  const order = location.state

  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white px-6 py-12 text-center shadow-sm sm:px-12">
        <span className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-50 text-success">
          <CheckCircle2 size={36} aria-hidden="true" />
        </span>
        <p className="eyebrow">Order confirmed</p>
        <h1 className="page-title text-3xl sm:text-4xl">Thank you for your purchase!</h1>
        <p className="page-intro mx-auto">Your ShopKart order has been successfully placed. We’ll keep you updated about delivery.</p>
        {order?.orderId ? (
          <div className="mx-auto mt-8 max-w-sm rounded-xl bg-slate-50 p-5 text-left text-sm">
            <div className="flex items-center gap-2 font-bold text-ink"><PackageCheck size={18} className="text-success" aria-hidden="true" /> Order details</div>
            <dl className="mt-4 space-y-2 text-muted">
              <div className="flex justify-between gap-4"><dt>Order number</dt><dd className="font-bold text-ink">{order.orderId}</dd></div>
              <div className="flex justify-between gap-4"><dt>Items</dt><dd className="font-bold text-ink">{order.itemCount}</dd></div>
              <div className="flex justify-between gap-4"><dt>Total</dt><dd className="font-bold text-brand">{formatCurrency(order.total)}</dd></div>
              {order.email && <div className="flex justify-between gap-4"><dt>Confirmation sent to</dt><dd className="max-w-[12rem] truncate font-bold text-ink">{order.email}</dd></div>}
            </dl>
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted">Your order confirmation details are no longer available in this browser session.</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Continue shopping</Button>
          <Link to="/cart" className="inline-flex h-11 items-center justify-center rounded-[10px] border border-border bg-white px-5 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">View cart</Link>
        </div>
      </div>
    </PageContainer>
  )
}
