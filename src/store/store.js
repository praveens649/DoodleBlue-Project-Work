import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice'

const cartPersistConfig = {
    key: 'cart',
    storage,
}

export const makeStore = () => configureStore({
    reducer: { products: productsReducer, cart: persistReducer(cartPersistConfig, cartReducer) },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
export const store = makeStore();
export const persistor = persistStore(store)
