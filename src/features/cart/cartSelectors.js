export const selectCartItems = (state) => state.cart.items
export const selectCartItemCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartQuantityByProductId = (state, productId) =>
  state.cart.items.find((item) => item.product.id === productId)?.quantity ?? 0
