export const selectCartItems = (state) => state.cart.items
export const selectCartItemCount = (state) => state.cart.items.reduce((total, item) => total + (Number(item.quantity) || 0), 0)
export const selectCartQuantityByProductId = (state, productId) =>
  state.cart.items.find((item) => item.product?.id === productId)?.quantity ?? 0
export const selectCartSubtotal = (state) => {
  const subtotal = state.cart.items.reduce(
    (total, item) => total + (Number(item.product?.price) || 0) * (Number(item.quantity) || 0),
    0,
  )
  return Math.round((subtotal + Number.EPSILON) * 100) / 100
}
export const selectCartShipping = (state) => (selectCartSubtotal(state) >= 100 ? 0 : 5)
export const selectCartTotal = (state) => {
  const total = selectCartSubtotal(state) + selectCartShipping(state)
  return Math.round((total + Number.EPSILON) * 100) / 100
}
