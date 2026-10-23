import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AppShell, NotFoundPage } from './AppShell';
import { CartPage } from '../features/cart/pages/CartPage';
import { ProductDetailPage } from '../features/products/pages/ProductDetailPage';
import { ProductsPage } from '../features/products/pages/ProductsPage';
export const router = createBrowserRouter([
    {
        element: _jsx(AppShell, { children: _jsx(Outlet, {}) }),
        children: [
            { path: '/', element: _jsx(ProductsPage, {}) },
            { path: '/product/:id', element: _jsx(ProductDetailPage, {}) },
            { path: '/cart', element: _jsx(CartPage, {}) },
            { path: '*', element: _jsx(NotFoundPage, {}) },
        ],
    },
]);
