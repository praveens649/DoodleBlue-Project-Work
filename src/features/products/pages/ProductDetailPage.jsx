import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, ChevronRight, Minus, Plus, Star } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { PageContainer } from '../../../components/layout/PageContainer'
import { Button } from '../../../components/ui/Button'
import { Spinner } from '../../../components/ui/Spinner'
import { useAppSelector } from '../../../store/hooks'
import { addToCart, decrementQuantity, incrementQuantity } from '../../cart/cartSlice'
import { selectCartItems } from '../../cart/cartSelectors'
import { selectProducts } from '../productsSelectors'
import { useProductById } from '../hooks/useProductById'
import { ProductGrid } from '../components/ProductGrid'
import { formatCurrency } from '../../../utils/formatCurrency'

function parseProductId(value) {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null
}

function ProductNotFound({ message = 'This product could not be found.', children }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-8" role="alert">
      <h1 className="page-title text-3xl">Product not found</h1>
      <p className="page-intro">{message}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {children}
        <Button to="/" variant={children ? 'outline' : 'primary'}>Back to products</Button>
      </div>
    </div>
  )
}

function DetailQuantitySelector({ quantity, onDecrease, onIncrease, title }) {
  return (
    <div>
      <span className="mb-2 block text-sm font-bold text-ink">Quantity</span>
      <div className="inline-flex h-12 items-center rounded-[10px] border border-border bg-white">
        <button type="button" onClick={onDecrease} disabled={quantity <= 1} className="inline-flex h-full w-12 items-center justify-center rounded-l-[10px] text-ink hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Decrease quantity for ${title}`}>
          <Minus size={18} aria-hidden="true" />
        </button>
        <span className="min-w-12 text-center font-bold" aria-live="polite">{quantity}</span>
        <button type="button" onClick={onIncrease} className="inline-flex h-full w-12 items-center justify-center rounded-r-[10px] text-ink hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand" aria-label={`Increase quantity for ${title}`}>
          <Plus size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export function ProductDetailPage() {
  const { id } = useParams()
  const productId = parseProductId(id)
  const dispatch = useDispatch()
  const products = useAppSelector(selectProducts)
  const cartItems = useAppSelector(selectCartItems)
  const { product, status, error, retry } = useProductById(productId)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setQuantity(1)
    setAdded(false)
  }, [productId])

  const relatedProducts = useMemo(() => {
    if (!product) return []
    const sameCategory = products.filter((item) => item.id !== product.id && item.category === product.category)
    const otherProducts = products.filter((item) => item.id !== product.id && item.category !== product.category)
    return [...sameCategory, ...otherProducts].slice(0, 4)
  }, [product, products])
  const quantities = useMemo(
    () => Object.fromEntries(cartItems.map((item) => [item.product.id, item.quantity])),
    [cartItems],
  )

  if (productId === null) {
    return <PageContainer><ProductNotFound message="The product ID in this URL is not valid." /></PageContainer>
  }

  if (status === 'idle' || status === 'loading') {
    return <PageContainer><Spinner label="Loading product..." /></PageContainer>
  }

  if (status === 'failed' || !product) {
    return <PageContainer><ProductNotFound message={error?.message ?? 'This product could not be loaded.'}><Button type="button" onClick={retry}>Try again</Button></ProductNotFound></PageContainer>
  }

  const rating = Number.isFinite(product.rating?.rate) ? product.rating.rate : null
  const reviewCount = Number.isInteger(product.rating?.count) ? product.rating.count : 0
  const category = product.category || 'Uncategorized'

  function handleAddToCart() {
    dispatch(addToCart({ product, quantity }))
    setAdded(true)
  }

  return (
    <PageContainer>
      <nav className="mb-8 flex items-center gap-2 overflow-hidden text-sm text-muted" aria-label="Breadcrumb">
        <Link to="/" className="shrink-0 font-bold hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">Products</Link>
        <ChevronRight size={16} aria-hidden="true" />
        <span className="shrink-0 capitalize">{category}</span>
        <ChevronRight size={16} aria-hidden="true" />
        <span className="truncate" aria-current="page">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex min-h-[22rem] items-center justify-center rounded-2xl border border-border bg-white p-8 sm:min-h-[30rem]">
          {product.image ? (
            <img src={product.image} alt={product.title} className="h-full max-h-[28rem] w-full object-contain" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} />
          ) : (
            <span className="text-sm text-muted">Image unavailable</span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <span className="mb-4 w-fit rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold capitalize text-brand">{category}</span>
          <h1 className="page-title text-3xl sm:text-4xl">{product.title}</h1>
          <div className="mb-5 flex items-center gap-2 text-sm text-muted">
            <Star size={18} className="fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="font-bold text-ink">{rating === null ? 'Rating unavailable' : rating.toFixed(1)}</span>
            <span>({reviewCount} reviews)</span>
          </div>
          <p className="mb-6 text-3xl font-extrabold text-brand">{formatCurrency(product.price)}</p>
          <p className="mb-8 max-w-xl leading-7 text-muted">{product.description || 'No description is available for this product.'}</p>
          <DetailQuantitySelector quantity={quantity} title={product.title} onDecrease={() => setQuantity((current) => Math.max(1, current - 1))} onIncrease={() => setQuantity((current) => current + 1)} />
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button type="button" onClick={handleAddToCart}>Add {quantity} to cart</Button>
            <Button to="/cart" variant="outline">Go to cart</Button>
          </div>
          {added && <p className="mt-4 flex items-center gap-2 text-sm font-bold text-success" role="status"><Check size={18} aria-hidden="true" /> Added to cart successfully.</p>}
          <div className="mt-8 grid gap-3 border-t border-border pt-6 text-sm text-success sm:grid-cols-2">
            <p className="font-bold">Free shipping on every order</p>
            <p className="font-bold">30-day returns, hassle-free</p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-border pt-10" aria-labelledby="related-products-heading">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Keep browsing</p>
              <h2 id="related-products-heading" className="font-heading text-3xl font-extrabold tracking-tight text-ink">You may also like</h2>
            </div>
          </div>
          <ProductGrid
            products={relatedProducts}
            quantities={quantities}
            onAdd={(relatedProduct) => dispatch(addToCart(relatedProduct))}
            onDecrease={(productId) => dispatch(decrementQuantity(productId))}
            onIncrease={(productId) => dispatch(incrementQuantity(productId))}
          />
        </section>
      )}
    </PageContainer>
  )
}
