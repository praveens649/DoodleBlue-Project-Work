import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'

export const makeStore = () => configureStore({ reducer: { products: productsReducer } })
export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
