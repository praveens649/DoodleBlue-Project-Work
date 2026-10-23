import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AppShell, NotFoundPage } from './AppShell';
import { CartPage } from '../features/cart/pages/CartPage';
import { CheckoutPage } from '../features/cart/pages/CheckoutPage';
import { PurchaseSuccessPage } from '../features/cart/pages/PurchaseSuccessPage';
import { ProductDetailPage } from '../features/products/pages/ProductDetailPage';
import { ProductsPage } from '../features/products/pages/ProductsPage';
export const router = createBrowserRouter([
    {
        element: _jsx(AppShell, { children: _jsx(Outlet, {}) }),
        children: [
            { path: '/', element: _jsx(ProductsPage, {}) },
            { path: '/product/:id', element: _jsx(ProductDetailPage, {}) },
            { path: '/cart', element: _jsx(CartPage, {}) },
            { path: '/checkout', element: _jsx(CheckoutPage, {}) },
            { path: '/purchase-success', element: _jsx(PurchaseSuccessPage, {}) },
            { path: '*', element: _jsx(NotFoundPage, {}) },
        ],
    },
]);
