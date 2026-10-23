import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Input } from '../ui/Input'

export function AppHeader() {
  return (
    <header className="bg-primary text-white">
      <div className="page-container flex min-h-20 flex-wrap items-center gap-4 py-4">
        <Link to="/" className="mr-auto text-2xl font-extrabold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300">
          Shop<span className="text-orange-400">Kart</span>
        </Link>
        <div className="order-3 w-full md:order-2 md:w-auto md:flex-1 md:max-w-md">
          <Input aria-label="Search products (coming soon)" placeholder="Search products" disabled className="bg-white/10 text-white placeholder:text-slate-300" />
        </div>
        <nav className="order-2 flex items-center gap-3 md:order-3" aria-label="Main navigation">
          <NavLink to="/" className="rounded-lg px-3 py-2 text-sm font-bold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300">Products</NavLink>
          <NavLink to="/cart" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300">
            <ShoppingCart size={20} aria-hidden="true" />
            <span className="badge-accent">0</span>
            <span className="sr-only">Cart, 0 items</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
