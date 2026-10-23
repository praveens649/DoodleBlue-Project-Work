export const selectProducts = (state) => state.products.products;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectCategories = (state) => state.products.categories;
export const selectCategoriesStatus = (state) => state.products.categoriesStatus;
export const selectCategoriesError = (state) => state.products.categoriesError;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectSelectedProductId = (state) => state.products.selectedProductId;
export const selectSelectedProductStatus = (state) => state.products.selectedProductStatus;
export const selectSelectedProductError = (state) => state.products.selectedProductError;

export function selectVisibleProducts(products, search, category, sort) {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesSearch = !normalizedSearch || product.title.toLowerCase().includes(normalizedSearch);
        return matchesCategory && matchesSearch;
    });
    if (sort === 'price-asc')
        return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc')
        return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
}
