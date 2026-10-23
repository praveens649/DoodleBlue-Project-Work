import React from 'react'

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="page-container !py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg font-extrabold text-ink">Shop<span className="text-brand">Kart</span></p>
            <p className="mt-1 max-w-xs text-sm leading-6 text-muted">A small, thoughtful storefront for the things you use every day.</p>
          </div>
          <div className="text-left text-sm text-muted sm:text-right">
            <p className="font-bold text-ink">Built for simple shopping</p>
            <p className="mt-1">Product data: fakestoreapi.com</p>
          </div>
        </div>
        <div className="mt-6 border-t border-border pt-4 text-xs text-muted">© 2026 ShopKart · Frontend training project</div>
      </div>
    </footer>
  )
}
