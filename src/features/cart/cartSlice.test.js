import { describe, expect, it } from 'vitest'
import reducer, {
  addToCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from './cartSlice'
import { selectCartItemCount, selectCartShipping, selectCartSubtotal, selectCartTotal } from './cartSelectors'

const product = (id, price) => ({
  id,
  title: `Product ${id}`,
  price,
  category: 'test',
  image: '',
  description: '',
  rating: { rate: 4, count: 1 },
})

const state = (items) => ({ cart: { items } })

describe('cart reducer and selectors', () => {
  it('adds a selected quantity and updates it with existing actions', () => {
    let cart = reducer(undefined, addToCart({ product: product(1, 25), quantity: 3 }))
    expect(cart.items[0].quantity).toBe(3)

    cart = reducer(cart, incrementQuantity(1))
    expect(cart.items[0].quantity).toBe(4)

    cart = reducer(cart, decrementQuantity(1))
    expect(cart.items[0].quantity).toBe(3)
  })

  it('removes an item when decrementing its last unit and supports clear', () => {
    let cart = reducer(undefined, addToCart(product(1, 25)))
    cart = reducer(cart, decrementQuantity(1))
    expect(cart.items).toEqual([])

    cart = reducer(cart, addToCart(product(1, 25)))
    cart = reducer(cart, addToCart(product(2, 15)))
    cart = reducer(cart, removeFromCart(1))
    expect(cart.items.map((item) => item.product.id)).toEqual([2])
    expect(reducer(cart, clearCart()).items).toEqual([])
  })

  it('calculates quantity totals and shipping thresholds', () => {
    const items = [
      { product: product(1, 60), quantity: 2 },
      { product: product(2, 15), quantity: 1 },
    ]
    const belowFreeShipping = state([{ product: product(1, 40), quantity: 1 }])
    expect(selectCartItemCount(state(items))).toBe(3)
    expect(selectCartSubtotal(state(items))).toBe(135)
    expect(selectCartShipping(state(items))).toBe(0)
    expect(selectCartTotal(state(items))).toBe(135)
    expect(selectCartShipping(belowFreeShipping)).toBe(5)
    expect(selectCartTotal(belowFreeShipping)).toBe(45)
    const justBelowFreeShipping = state([{ product: product(3, 33.33), quantity: 3 }])
    const exactlyFreeShipping = state([{ product: product(4, 25), quantity: 4 }])
    expect(selectCartSubtotal(justBelowFreeShipping)).toBe(99.99)
    expect(selectCartShipping(justBelowFreeShipping)).toBe(5)
    expect(selectCartTotal(justBelowFreeShipping)).toBe(104.99)
    expect(selectCartSubtotal(exactlyFreeShipping)).toBe(100)
    expect(selectCartShipping(exactlyFreeShipping)).toBe(0)
    expect(selectCartTotal(exactlyFreeShipping)).toBe(100)
  })
})
