import { getJson } from '../../../services/apiClient'

export function getProducts(): Promise<unknown> {
  return getJson('/products')
}

export function getProductById(id: number): Promise<unknown> {
  return getJson(`/products/${id}`)
}

export function getCategories(): Promise<unknown> {
  return getJson('/products/categories')
}
