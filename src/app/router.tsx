import { createBrowserRouter, Outlet } from 'react-router-dom'
import { AppShell, NotFoundPage } from './AppShell'
import { CartPage } from '../features/cart/pages/CartPage'
import { ProductDetailPage } from '../features/products/pages/ProductDetailPage'
import { ProductsPage } from '../features/products/pages/ProductsPage'

export const router = createBrowserRouter([
  {
    element: <AppShell><Outlet /></AppShell>,
    children: [
      { path: '/', element: <ProductsPage /> },
      { path: '/product/:id', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
