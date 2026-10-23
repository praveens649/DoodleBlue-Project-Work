import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { PageContainer } from '../../../components/layout/PageContainer'
import { Button } from '../../../components/ui/Button'
import { Spinner } from '../../../components/ui/Spinner'
import { useAppSelector } from '../../../store/hooks'
import { addToCart, decrementQuantity, incrementQuantity } from '../../cart/cartSlice'
import { selectCartItems } from '../../cart/cartSelectors'
import { useProducts } from '../hooks/useProducts'
import { ProductFilters } from '../components/ProductFilters'
import { ProductGrid } from '../components/ProductGrid'
import { selectVisibleProducts } from '../productsSelectors'

export function ProductsPage() {
  const dispatch = useDispatch()
  const { products, status, error, retry, categories, categoriesStatus, categoriesError } = useProducts()
  const cartItems = useAppSelector(selectCartItems)
  const [searchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sort, setSort] = useState('featured')

  const quantities = useMemo(
    () => Object.fromEntries(cartItems.map((item) => [item.product.id, item.quantity])),
    [cartItems],
  )

  const visibleProducts = useMemo(() => {
    return selectVisibleProducts(products, search, selectedCategory, sort)
  }, [products, search, selectedCategory, sort])

  return (
    <PageContainer>
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-primary px-6 py-8 text-white shadow-xl shadow-slate-950/10 sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 size-64 rounded-full bg-orange-400/10 blur-3xl" />
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-300">The ShopKart collection</p>
          <h1 className="page-title relative mb-3 max-w-2xl text-white">All products</h1>
          <p className="relative max-w-xl text-sm leading-6 text-slate-300 sm:text-base">Thoughtful essentials, useful upgrades, and everyday favorites — all in one place.</p>
        </div>
        {status === 'succeeded' && (
          <div className="relative mt-6 flex items-center gap-3 text-sm sm:absolute sm:bottom-8 sm:right-10 sm:mt-0">
            <span className="flex size-10 items-center justify-center rounded-full bg-white/10 font-extrabold text-orange-300">{products.length}</span>
            <span className="text-slate-300">{products.length === 1 ? 'product' : 'products'} to explore</span>
          </div>
        )}
      </div>
      {status === 'loading' && <Spinner label="Loading products..." />}
      {status === 'failed' && (
        <div className="space-y-4" role="alert">
          <p className="page-intro">{error?.message ?? 'Unable to load products.'}</p>
          <Button type="button" onClick={retry}>Try again</Button>
        </div>
      )}
      {status === 'succeeded' && (
        <div className="space-y-6">
          <ProductFilters
            categories={categoriesStatus === 'succeeded' ? categories : []}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sort={sort}
            onSortChange={setSort}
            categoriesError={categoriesStatus === 'failed' ? (categoriesError?.message ?? 'Categories could not be loaded.') : null}
          />
          {products.length === 0 && <p className="rounded-2xl border border-border bg-white p-8 text-center text-muted">No products are available right now.</p>}
          {products.length > 0 && visibleProducts.length === 0 && <p className="rounded-2xl border border-border bg-white p-8 text-center text-muted">No products match your search and category filters.</p>}
          {visibleProducts.length > 0 && (
            <ProductGrid
              products={visibleProducts}
              quantities={quantities}
              onAdd={(product) => dispatch(addToCart(product))}
              onDecrease={(productId) => dispatch(decrementQuantity(productId))}
              onIncrease={(productId) => dispatch(incrementQuantity(productId))}
            />
          )}
        </div>
      )}
    </PageContainer>
  )
}
