import { useEffect } from 'react'
import { fetchProducts } from '../productsSlice'
import { selectProducts, selectProductsError, selectProductsStatus } from '../productsSelectors'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'

export function useProducts() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const status = useAppSelector(selectProductsStatus)
  const error = useAppSelector(selectProductsError)

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchProducts())
  }, [dispatch, status])

  return {
    products,
    status,
    error,
    retry: () => {
      if (status !== 'loading') void dispatch(fetchProducts())
    },
  }
}
