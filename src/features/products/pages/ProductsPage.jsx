import React, { useMemo, useState } from 'react'
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
  const [search, setSearch] = useState('')
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
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Shop the collection</p>
          <h1 className="page-title mb-0">Find something you’ll love</h1>
        </div>
        {status === 'succeeded' && (
          <div className="text-right text-sm font-bold text-muted">
            <p>{products.length} product{products.length === 1 ? '' : 's'} received.</p>
            {categoriesStatus === 'succeeded' && <p className="mt-1 font-normal">Categories available: {categories.join(', ') || 'none'}.</p>}
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
            search={search}
            onSearchChange={setSearch}
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
