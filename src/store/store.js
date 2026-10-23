import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
export const makeStore = () => configureStore({ reducer: { products: productsReducer } });
export const store = makeStore();
