import { jsx as _jsx } from "react/jsx-runtime";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProductsPage } from './ProductsPage';
import { makeStore } from '../../../store/store';
describe('ProductsPage', () => {
    it('renders loading and success verification states with product data', async () => {
        const product = {
            id: 1,
            title: 'Test product',
            price: 12.5,
            description: 'A test product',
            category: 'test',
            image: 'https://example.com/image.jpg',
            rating: { rate: 4.2, count: 10 },
        };
        vi.stubGlobal('fetch', vi.fn()
            .mockResolvedValueOnce(new Response(JSON.stringify([product]), { status: 200 }))
            .mockResolvedValueOnce(new Response(JSON.stringify(['test']), { status: 200 })));
        render(_jsx(MemoryRouter, { children: _jsx(Provider, { store: makeStore(), children: _jsx(ProductsPage, {}) }) }));
        expect(screen.getByText('Loading products...')).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText('product to explore')).toBeInTheDocument())
        expect(screen.getByText('Test product')).toBeInTheDocument();
        expect(screen.getByText('$12.50')).toBeInTheDocument();
    });
});
