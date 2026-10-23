import { PageContainer } from '../../../components/layout/PageContainer'
import { Button } from '../../../components/ui/Button'
import { Spinner } from '../../../components/ui/Spinner'
import { useProducts } from '../hooks/useProducts'

export function ProductsPage() {
  const { products, status, error, retry } = useProducts()

  return (
    <PageContainer>
      <p className="eyebrow">Product data verification</p>
      <h1 className="page-title">Shop smarter with ShopKart</h1>
      {status === 'loading' && <Spinner label="Loading products..." />}
      {status === 'failed' && (
        <div className="space-y-4" role="alert">
          <p className="page-intro">{error?.message ?? 'Unable to load products.'}</p>
          <Button type="button" onClick={retry}>Try again</Button>
        </div>
      )}
      {status === 'succeeded' && (
        <div className="space-y-3">
          <p className="page-intro">Product data loaded successfully. The final catalog UI will be added in a later module.</p>
          <p className="text-sm font-bold text-success">{products.length} product{products.length === 1 ? '' : 's'} received.</p>
          {products.length === 0 && <p className="text-sm text-muted">The service returned an empty product list.</p>}
        </div>
      )}
    </PageContainer>
  )
}
