import { describe, expect, it, vi } from 'vitest';
import { fetchCategories, fetchProductById, fetchProducts } from './productsSlice';
import { makeStore } from '../../store/store';
const product = {
    id: 1,
    title: 'Test product',
    price: 12.5,
    description: 'A test product',
    category: 'test',
    image: 'https://example.com/image.jpg',
    rating: { rate: 4.2, count: 10 },
};
function response(body) {
    return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
describe('products async thunks', () => {
    const getStore = () => makeStore();
    it('loads products, one product, and categories with independent state', async () => {
        const testStore = getStore();
        vi.stubGlobal('fetch', vi.fn()
            .mockResolvedValueOnce(response([product]))
            .mockResolvedValueOnce(response(product))
            .mockResolvedValueOnce(response(['test'])));
        await testStore.dispatch(fetchProducts());
        await testStore.dispatch(fetchProductById(1));
        await testStore.dispatch(fetchCategories());
        const state = testStore.getState().products;
        expect(state.products).toEqual([product]);
        expect(state.selectedProduct).toEqual(product);
        expect(state.categories).toEqual(['test']);
        expect(state.status).toBe('succeeded');
        expect(state.selectedProductStatus).toBe('succeeded');
        expect(state.categoriesStatus).toBe('succeeded');
    });
    it('rejects invalid IDs without requesting the API', async () => {
        const testStore = getStore();
        const fetchMock = vi.fn();
        vi.stubGlobal('fetch', fetchMock);
        const result = await testStore.dispatch(fetchProductById(0));
        expect(result.meta.requestStatus).toBe('rejected');
        expect(testStore.getState().products.selectedProductError?.message).toContain('positive integer');
        expect(fetchMock).not.toHaveBeenCalled();
    });
    it('preserves products when a refresh fails', async () => {
        const testStore = getStore();
        vi.stubGlobal('fetch', vi.fn()
            .mockResolvedValueOnce(response([product]))
            .mockResolvedValueOnce(response({ invalid: true })));
        await testStore.dispatch(fetchProducts());
        await testStore.dispatch(fetchProducts());
        const state = testStore.getState().products;
        expect(state.status).toBe('failed');
        expect(state.products).toEqual([product]);
        expect(state.error?.message).toContain('unexpected product list');
    });
    it('supports a manual retry after a failed request', async () => {
        const testStore = getStore();
        vi.stubGlobal('fetch', vi.fn()
            .mockResolvedValueOnce(new Response('offline', { status: 503 }))
            .mockResolvedValueOnce(response([product])));
        await testStore.dispatch(fetchProducts());
        expect(testStore.getState().products.status).toBe('failed');
        await testStore.dispatch(fetchProducts());
        expect(testStore.getState().products).toMatchObject({ status: 'succeeded', products: [product], error: null });
    });
});
