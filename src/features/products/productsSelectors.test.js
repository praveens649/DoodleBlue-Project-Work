import { describe, expect, it } from 'vitest'
import { selectVisibleProducts } from './productsSelectors'

const products = [
  { id: 1, title: 'Red Shirt', category: 'clothing', price: 30 },
  { id: 2, title: 'Blue Mug', category: 'home', price: 10 },
  { id: 3, title: 'Red Shoes', category: 'clothing', price: 50 },
]

describe('selectVisibleProducts', () => {
  it('combines case-insensitive search and category filtering', () => {
    expect(selectVisibleProducts(products, 'RED', 'clothing', 'featured').map((product) => product.id)).toEqual([1, 3])
  })

  it('sorts without mutating the original product order', () => {
    expect(selectVisibleProducts(products, '', 'all', 'price-asc').map((product) => product.id)).toEqual([2, 1, 3])
    expect(selectVisibleProducts(products, '', 'all', 'price-desc').map((product) => product.id)).toEqual([3, 1, 2])
    expect(products.map((product) => product.id)).toEqual([1, 2, 3])
  })
})
