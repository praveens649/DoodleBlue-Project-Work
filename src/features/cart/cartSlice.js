import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.product ?? action.payload
      const quantity = Number.isInteger(action.payload.quantity) && action.payload.quantity > 0
        ? action.payload.quantity
        : 1
      const existingItem = state.items.find((item) => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ product, quantity })
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((entry) => entry.product.id === action.payload)
      if (item) item.quantity += 1
    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((entry) => entry.product.id === action.payload)
      if (itemIndex === -1) return
      if (state.items[itemIndex].quantity <= 1) {
        state.items.splice(itemIndex, 1)
      } else {
        state.items[itemIndex].quantity -= 1
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions
export default cartSlice.reducer
