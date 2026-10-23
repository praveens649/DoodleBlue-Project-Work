import React from 'react'
import { Search, ShoppingBag, ShoppingCart, X } from 'lucide-react'
import { Link, NavLink, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { selectCartItemCount } from '../../features/cart/cartSelectors'

export function AppHeader() {
  const cartItemCount = useAppSelector(selectCartItemCount)
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''

  function updateSearch(value) {
    const nextParams = new URLSearchParams(searchParams)
    if (value) nextParams.set('q', value)
    else nextParams.delete('q')
    setSearchParams(nextParams)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-primary text-white shadow-lg shadow-slate-950/10">
      <div className="page-container !py-4">
        <div className="flex min-h-12 items-center gap-4">
          <Link to="/" className="group flex shrink-0 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300">
            <span className="flex size-9 items-center justify-center rounded-lg bg-brand text-white shadow-lg shadow-orange-950/30" aria-hidden="true">
              <ShoppingBag size={19} strokeWidth={2.5} />
            </span>
            <span>
              <span className="block text-xl font-extrabold tracking-tight">Shop<span className="text-orange-400">Kart</span></span>
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:block">Everyday essentials</span>
            </span>
          </Link>
          <div className="relative order-3 w-full md:order-none md:flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" />
            <input
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
              aria-label="Search products"
              placeholder="Search products"
              className="h-10 w-full rounded-lg border border-white/10 bg-slate-700/80 px-10 pr-10 text-sm text-white outline-none placeholder:text-slate-400 transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
            />
            {search && (
              <button type="button" onClick={() => updateSearch('')} aria-label="Clear product search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300">
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          <nav className="flex items-center gap-2" aria-label="Main navigation">
            <NavLink to="/" className="hidden rounded-lg px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300 sm:block">Products</NavLink>
            <NavLink to="/cart" className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold transition hover:border-orange-400/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300">
              <ShoppingCart size={19} aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              <span className="badge-accent">{cartItemCount}</span>
              <span className="sr-only">Cart, {cartItemCount} items</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
