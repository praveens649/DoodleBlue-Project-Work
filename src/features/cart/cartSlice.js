import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ product: action.payload, quantity: 1 })
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
  },
})

export const { addToCart, incrementQuantity, decrementQuantity } = cartSlice.actions
export default cartSlice.reducer
